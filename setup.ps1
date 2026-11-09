# setup.ps1
#
# Prepares training-typescript for the lesson runner. It can be run from anywhere:
#   0. Checks Git, and clones the repository into C:\Development\training\training-typescript if this script isn't inside it.
#      Then runs the cloned copy of this script, so every later step uses the repository's own files.
#   1. Checks Node.js 24 or later.
#   1b. Checks the C++ Build Tools and Python, which native modules need.
#   2. Installs the npm packages exactly as recorded in package-lock.json (npm ci).
#      If Electron's binary is missing, it is downloaded, with a retry that builds the native modules first.
#   3. Builds the lesson runner, then runs the course's own checks: the tests, and the curriculum check.
#
# With -InstallMissing, the script installs what's missing: Git, Node.js LTS, and the C++ Build Tools with winget.
# Installing needs an elevated (Administrator) PowerShell. Safe to run again: anything already in place is skipped.
#
# Run from anywhere with:
#   powershell -ExecutionPolicy Bypass -File .\setup.ps1
#   powershell -ExecutionPolicy Bypass -File .\setup.ps1 -InstallMissing

param(
    [switch]$InstallMissing,
    [string]$RepoUrl = "https://github.com/databankimx/training-typescript.git",
    [string]$Branch = "dev"
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
Set-Location $root

$defaultRepoPath = "C:\Development\training\training-typescript"
$gitDefault = "C:\Program Files\Git\cmd\git.exe"
$nodeDefaultDir = "C:\Program Files\nodejs"
$requiredNodeMajor = 24
$summary = [ordered]@{}

function Write-Step([string]$title) {
    Write-Host ""
    Write-Host "== $title ==" -ForegroundColor Cyan
}

function Stop-Setup([string]$message) {
    Write-Host ""
    Write-Host "SETUP STOPPED: $message" -ForegroundColor Red
    Write-Host "Fix the problem above, then run this script again. Steps already done are skipped."
    exit 1
}

function Add-Warning([string]$message) {
    Write-Host "   WARNING: $message" -ForegroundColor Yellow
}

function Test-Administrator {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($identity)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Invoke-Winget([string]$id) {
    if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
        Stop-Setup "winget is not available. Install 'App Installer' from the Microsoft Store, or install $id by hand."
    }
    Write-Host "   winget install -e --id $id" -ForegroundColor Gray
    & winget install -e --id $id --silent --accept-package-agreements --accept-source-agreements
    # winget exit code -1978335189 means the package is already installed, which is fine here.
    if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne -1978335189) {
        Stop-Setup "winget could not install $id (exit code $LASTEXITCODE)."
    }
}

function Find-Node {
    # A program installed in this session isn't on PATH until a new window opens, so the default folder is checked too.
    $command = Get-Command node -ErrorAction SilentlyContinue
    if ($command) { return (Split-Path $command.Source -Parent) }
    if (Test-Path (Join-Path $nodeDefaultDir "node.exe")) { return $nodeDefaultDir }
    return $null
}

function Get-VisualStudioInstallPath {
    # vswhere finds Visual Studio installations. Only one with the C++ compiler component counts.
    $vswhere = Join-Path ${env:ProgramFiles(x86)} "Microsoft Visual Studio\Installer\vswhere.exe"
    if (-not (Test-Path $vswhere)) { return $null }
    $path = & $vswhere -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -latest -property installationPath 2>$null
    if ($path) { return ($path | Select-Object -First 1).Trim() }
    return $null
}

function Test-BuildTools {
    return [bool](Get-VisualStudioInstallPath)
}

function Install-BuildTools {
    Write-Host "   Installing Visual Studio Build Tools with the C++ workload."
    Write-Host "   This downloads about 4 to 5 GB and may take several minutes."
    $override = "--quiet --wait --norestart --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"
    if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
        Stop-Setup "winget is not available. Install 'App Installer' from the Microsoft Store, or install Visual Studio Build Tools by hand."
    }
    Write-Host "   winget install --id Microsoft.VisualStudio.BuildTools --override ""$override""" -ForegroundColor Gray
    & winget install --id Microsoft.VisualStudio.BuildTools -e --accept-package-agreements --accept-source-agreements --override $override
    # 0 = success, 3010 = success but a restart is needed, -1978335189 = already installed.
    if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne 3010 -and $LASTEXITCODE -ne -1978335189) {
        Stop-Setup "winget could not install Build Tools (exit code $LASTEXITCODE)."
    }
    Start-Sleep -Seconds 5
    return (Test-BuildTools)
}

function Import-BuildToolsEnvironment {
    # Native modules are compiled with the C++ compiler, which needs the Visual Studio environment variables.
    # vcvars64.bat sets them, and this function copies the result into the current PowerShell session.
    $install = Get-VisualStudioInstallPath
    if (-not $install) { return $false }
    $vcvars = Join-Path $install "VC\Auxiliary\Build\vcvars64.bat"
    if (-not (Test-Path $vcvars)) { return $false }
    $environmentLines = cmd /c "`"$vcvars`" >nul 2>&1 && set"
    foreach ($line in $environmentLines) {
        if ($line -match "^([^=]+)=(.*)$") {
            Set-Item -Path "env:$($Matches[1])" -Value $Matches[2]
        }
    }
    return $true
}

function Test-Python {
    # node-gyp needs Python 3. The Build Tools installer does not include it.
    $python = Get-Command python -ErrorAction SilentlyContinue
    if (-not $python) { return $null }
    $version = (& $python.Source --version 2>&1 | Out-String).Trim()
    if ($version -match "Python 3\.") { return $version }
    return $null
}

Write-Host ""
Write-Host "training-typescript setup" -ForegroundColor Yellow

if ($InstallMissing -and -not (Test-Administrator)) {
    Stop-Setup "-InstallMissing needs an elevated PowerShell. Open PowerShell as Administrator, and run the script again."
}

# 0. Git and the repository ------------------------------------------------------------------------------

Write-Step "0. Git and the repository"

$gitExe = $gitDefault
if (-not (Test-Path $gitExe)) {
    $gitCommand = Get-Command git -ErrorAction SilentlyContinue
    if ($gitCommand) { $gitExe = $gitCommand.Source }
}
if (-not (Test-Path $gitExe)) {
    if ($InstallMissing) {
        Write-Host "   Git is missing: installing it"
        Invoke-Winget "Git.Git"
        $gitExe = $gitDefault
    } else {
        Stop-Setup "Git isn't installed. Run this script with -InstallMissing, or install Git from https://git-scm.com."
    }
}
Write-Host "   Git: $gitExe"
$summary["Git"] = "ok"

if (-not (Test-Path (Join-Path $root "package.json"))) {
    # The script is running outside the repository. Clone it, or use the existing clone, then run its copy.
    if (Test-Path (Join-Path $defaultRepoPath "package.json")) {
        Write-Host "   Using the repository at $defaultRepoPath"
        $repoRoot = $defaultRepoPath
    } else {
        Write-Host "   Cloning $RepoUrl ($Branch) into $defaultRepoPath"
        New-Item -ItemType Directory -Force -Path (Split-Path $defaultRepoPath -Parent) | Out-Null
        & $gitExe clone --branch $Branch $RepoUrl $defaultRepoPath
        if ($LASTEXITCODE -ne 0) {
            Stop-Setup "git clone failed (exit code $LASTEXITCODE). Check the address, and your access to the repository."
        }
        $repoRoot = $defaultRepoPath
    }
    Write-Host "   Continuing from the repository at $repoRoot"
    $childScript = Join-Path $repoRoot "setup.ps1"
    if (Test-Path $childScript) {
        # The repository has its own copy of this script, so run that copy.
        $childParams = @{}
        if ($InstallMissing) { $childParams["InstallMissing"] = $true }
        & $childScript @childParams
        exit $LASTEXITCODE
    }
    Write-Host "   The repository has no setup.ps1 yet, so this copy continues the setup." -ForegroundColor Yellow
    $root = $repoRoot
    Set-Location $root
}

if (-not $root.StartsWith("C:\Development\", [StringComparison]::OrdinalIgnoreCase)) {
    # The repository should live under C:\Development. Security software may remove programs built elsewhere.
    Add-Warning "the repository is at $root, not under C:\Development. Move it there, then run this script again."
}
$summary["Repository"] = $root

# 1. Node.js ---------------------------------------------------------------------------------------------

Write-Step "1. Node.js $requiredNodeMajor or later"

$nodeDir = Find-Node
if (-not $nodeDir -and $InstallMissing) {
    Write-Host "   Node.js is missing: installing the LTS release"
    Invoke-Winget "OpenJS.NodeJS.LTS"
    $nodeDir = Find-Node
}
if (-not $nodeDir) {
    Stop-Setup "Node.js isn't installed. Run this script with -InstallMissing, or install Node.js $requiredNodeMajor or later from https://nodejs.org."
}

# The folder goes first on PATH for this script, and for the npm and node commands it starts.
$env:Path = "$nodeDir;$env:Path"

$nodeVersion = (& (Join-Path $nodeDir "node.exe") --version | Select-Object -First 1).Trim()
if ($nodeVersion -match "^v(\d+)\.") {
    $nodeMajor = [int]$Matches[1]
} else {
    Stop-Setup "Couldn't read the Node.js version: $nodeVersion"
}
if ($nodeMajor -lt $requiredNodeMajor) {
    Stop-Setup "Node.js $nodeVersion was found, but the course needs Node.js $requiredNodeMajor or later. Install a current LTS release from https://nodejs.org, then run this script again."
}
Write-Host "   Node.js $nodeVersion in $nodeDir"
$summary["Node.js"] = $nodeVersion

$npmCmd = Join-Path $nodeDir "npm.cmd"
if (-not (Test-Path $npmCmd)) {
    Stop-Setup "npm wasn't found next to Node.js at $npmCmd. Reinstall Node.js, then run this script again."
}

# 1b. C++ Build Tools and Python (for native modules) ---------------------------------------------------

Write-Step "1b. C++ Build Tools and Python (for native modules)"

$hasBuildTools = Test-BuildTools
if (-not $hasBuildTools -and $InstallMissing) {
    Write-Host "   C++ Build Tools not found. They are needed to build native Node.js modules."
    $hasBuildTools = Install-BuildTools
}
if ($hasBuildTools) {
    Write-Host "   C++ Build Tools found"
    $summary["C++ Build Tools"] = "ok"
} else {
    Add-Warning "C++ Build Tools not found. Run this script as Administrator with -InstallMissing to install them, or install them by hand."
    $summary["C++ Build Tools"] = "missing"
}

$python = Test-Python
if ($python) {
    Write-Host "   $python found"
    $summary["Python 3"] = "ok"
} else {
    Add-Warning "Python 3 not found. node-gyp needs it to build native modules. Install Python 3 from https://python.org, or run: winget install -e --id Python.Python.3.12"
    $summary["Python 3"] = "missing"
}

# 2. npm packages ----------------------------------------------------------------------------------------

Write-Step "2. npm packages (from package-lock.json)"
& $npmCmd ci
if ($LASTEXITCODE -ne 0) {
    Stop-Setup "npm ci failed (exit code $LASTEXITCODE). Check the messages above, and your network access to the npm registry."
}
$summary["npm packages"] = "ok"

# 2b. Electron binary -----------------------------------------------------------------------------------

Write-Step "2b. Electron binary"
$electronExe = Join-Path $root "node_modules\electron\dist\electron.exe"
$electronInstall = Join-Path $root "node_modules\electron\install.js"

if (-not (Test-Path $electronExe)) {
    Write-Host "   Electron binary not found. Downloading it."
    if (-not (Test-Path $electronInstall)) {
        Stop-Setup "Electron's install.js is missing. Check the messages from npm ci above."
    }
    & (Join-Path $nodeDir "node.exe") $electronInstall
    $firstAttempt = $LASTEXITCODE

    if ($firstAttempt -ne 0) {
        # A known npm problem (npm bug 4828) can leave the optional native extract-zip package unbuilt.
        # Rebuilding the native modules with the compiler environment loaded usually fixes it.
        Write-Host "   The download failed. Rebuilding native modules with the C++ environment, then trying again."
        if (Import-BuildToolsEnvironment) {
            Write-Host "   C++ environment loaded for this session"
        } else {
            Add-Warning "The C++ environment could not be loaded, so the rebuild may fail."
        }
        & $npmCmd rebuild
        if ($LASTEXITCODE -ne 0) {
            Write-Host "   npm rebuild reported problems, so the retry below decides the outcome." -ForegroundColor Yellow
        }

        & (Join-Path $nodeDir "node.exe") $electronInstall
        if ($LASTEXITCODE -ne 0) {
            Stop-Setup "Electron's binary still won't download (exit code $LASTEXITCODE). Check network access to github.com, and that the C++ Build Tools are installed."
        }
    }
}

if (Test-Path $electronExe) {
    Write-Host "   Electron binary ready"
    $summary["Electron binary"] = "ok"
} else {
    Stop-Setup "Electron's binary is still missing after the download. Run this script again, or check the messages above."
}

# 3. Build the runner and run the checks ----------------------------------------------------------------

Write-Step "3. Build the lesson runner"
& $npmCmd run build:runner
if ($LASTEXITCODE -ne 0) {
    Stop-Setup "The lesson runner failed to build (exit code $LASTEXITCODE). Check the messages above."
}
$summary["Runner build"] = "ok"

Write-Step "4. Course checks"
& $npmCmd test
if ($LASTEXITCODE -ne 0) {
    Stop-Setup "The tests failed. Check the messages above, then run this script again."
}
$summary["Tests"] = "ok"

& $npmCmd run check
if ($LASTEXITCODE -ne 0) {
    Stop-Setup "The course check failed. Check the messages above, then run this script again."
}
$summary["Course check"] = "ok"

# VS Code ------------------------------------------------------------------------------------------------

Write-Step "VS Code"
$codeCommand = Get-Command code -ErrorAction SilentlyContinue
if (-not $codeCommand -and $InstallMissing) {
    Write-Host "   VS Code isn't on PATH, so it will be installed with winget."
    & winget install -e --id Microsoft.VisualStudioCode --accept-package-agreements --accept-source-agreements
    if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne -1978335189) {
        Add-Warning "VS Code couldn't be installed with winget (exit code $LASTEXITCODE). Install it from code.visualstudio.com, then run this script again."
    }
    foreach ($folder in @((Join-Path $env:LOCALAPPDATA "Programs\Microsoft VS Code\bin"), (Join-Path $env:ProgramFiles "Microsoft VS Code\bin"))) {
        if (Test-Path (Join-Path $folder "code.cmd")) { $env:Path = "$folder;$env:Path" }
    }
    $codeCommand = Get-Command code -ErrorAction SilentlyContinue
}
if (-not $codeCommand) {
    Add-Warning "VS Code isn't on PATH. Install VS Code, open a new PowerShell window, and run this script again."
    $summary["VS Code"] = "missing"
} else {
    Write-Host "   Found VS Code at $($codeCommand.Source)."
    $summary["VS Code"] = "ok"
}

Write-Step "Summary"
foreach ($item in $summary.GetEnumerator()) {
    Write-Host ("   {0,-22} {1}" -f $item.Key, $item.Value)
}
Write-Host ""
Write-Host "Setup finished. To start the lesson runner, run:" -ForegroundColor Green
Write-Host "   npm start"
Write-Host ""
