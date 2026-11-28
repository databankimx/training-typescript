# Quick start

This guide gets the lesson runner open. The runner is a desktop window, so the course needs no server, no browser, and no accounts. Once the runner is open, the lessons explain the rest.

## Quick setup with the script

### What gets installed

By default, the setup installs:

* Git
* PowerShell 7
* Node.js 24 or newer
* Microsoft Visual C++ runtime
* VS Code
* Notepad++

The C++ Build Tools aren't installed up front. The script installs them only if Electron's binary can't download.

The setup then runs these steps: npm packages; Build the lesson runner; Course tests; Course check. At the end it opens the repository in VS Code and starts the lesson runner window (Electron).

### Getting started

There are three methods available to set up this tutorial. They are currently Windows-only.

#### Full Automation (if you don't have Git currently set up)

This process will install Git and copy the repository to a subfolder of `C:\Development\training` and install all necessary software and extensions for the tutorial's lesson runner.

1. Obtain the tutorial's GitHub slug name, which is `training-typescript`
2. Open PowerShell using "Run as Administrator"
3. Run the script below

```pwsh
# Obtain the load tutorial script
irm https://raw.githubusercontent.com/databankimx/training-shared-template/main/load-tutorial.ps1 -OutFile "$env:TEMP\load-tutorial.ps1"

# Perform automated setup
powershell -NoProfile -ExecutionPolicy Bypass -File "$env:TEMP\load-tutorial.ps1" -RepoUrl https://github.com/databankimx/training-typescript.git
```

#### Automated Setup from Local Repo (assumes you already have Git installed and set up)

In this process, you pull the existing repository and then run its setup script, which installs all necessary software and extensions for the tutorial's lesson runner.

1. Obtain the tutorial's GitHub slug name, which is `training-typescript`
2. Open PowerShell using "Run as Administrator"
3. If you will use the default base directory `C:\Development\training`, run the following:

```pwsh
# Create the base folder if it doesn't exist yet
New-Item -ItemType Directory -Force -Path C:\Development\training | Out-Null
```

4. Clone the repository. If you're using a different base directory, replace `C:\Development\training` with your path:

```pwsh
# Go there and clone the tutorial
cd C:\Development\training
git clone https://github.com/databankimx/training-typescript.git
cd training-typescript
```

5. If desired, edit the setup configuration, which determines what software is installed automatically (see "Change what gets installed" below)

```pwsh
# Optional: edit setup.json before installations
notepad setup.json
```

6. Save the configuration if you edited it, then run the setup script

##### If using the default base path, run this:

```pwsh
# Run the setup
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1
```

##### If using a different base path, replace `<BASE_DIR>` with your path and run this:

```pwsh
# Run the setup
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1 -BaseDirectory <BASE_DIR>
```

#### Manual Setup from Local Repo

If you want to do everything manually, you can pull the repository and set up software on your own.

1. Obtain the tutorial's GitHub slug name, which is `training-typescript`
2. Run the script below

```pwsh
git clone https://github.com/databankimx/training-typescript.git
```

3. Review README.md and QUICKSTART.md in the repository for instructions for manual setup.

### Switches and notes

* `-SkipInstall` checks what's installed and installs nothing.
* `-NoLaunch` runs the setup but doesn't open VS Code or start the runner.
* `-SkipTests` skips the course tests, which the setup runs by default.
* Installing uses winget. If winget isn't available, install **App Installer** from the Microsoft Store first. Company policy can block installs, in which case the script stops and you'll need IT.
* If an install needs administrator rights, the script stops before installing anything and asks you to run it again from an Administrator PowerShell window.

### Change what gets installed

The settings are in `setup.json`, in the repository folder. Open it in any text editor:

* Set an install's `"install"` to `true` to include it, or `false` to skip it.
* `"pinned"` sets the version. `"extensions"` lists the VS Code extensions to add.
* Save the file, then run `setup.ps1` again. It skips what's already installed.

## Requirements

- Windows 10 or 11
- Node.js 24 or later. The course relies on Node running `.ts` files directly.
- Visual Studio Build Tools with the C++ workload, for native modules
- Python 3, for node-gyp
- VS Code (recommended). The editor reads the same `tsconfig.json` as the checker.

Check the Node.js version in a new terminal after installing it:

```pwsh
node --version
```

If you installed the requirements yourself, instead of using the script, install the dependencies once from the repository root:

```pwsh
npm ci
```

## Launch the runner

```pwsh
cd C:\Development\training\training-typescript
npm start
```

This builds the runner and opens its window with the first lesson loaded. The runner remembers the lesson you were on, and it opens there next time. Close the window normally to stop it.

## Explore a lesson

- Choose a chapter in the Chapters pane. Its steps appear in the Steps pane. Homework is listed under its chapter, as a separate Homework entry.
- Read the lesson in the **Lesson** tab, and predict the output before you run anything.
- Press **Run** to see what the program does. Press **Check** to see what the checker says about the code, without running it.
- Edit the code in the **Source** tab. Reset puts back the text the step started with.
- **Stop**, or Escape, ends a running program. A program that runs for more than 10 seconds is stopped automatically.
- Type into the input line below the output, and press Send, for a program that asks for input.
- Use **Visualize**, where it appears, to open an animation of an algorithm in its own window.
- Homework is solved in your own file first. Then press **Show solution (spoiler)** to see the complete example, which is read-only and can be run.
- Quiz answers are saved. Choose an answer, and press **Check answer**. Retry, or show the answer, when you need to.
- Ctrl and the mouse wheel change the size of the lesson text. Ctrl+R reloads the list of chapters and steps, which is useful after a repository update.
- The copy buttons copy the lesson's Markdown or the code in the editor, and the output's copy button copies the output.
- **Open the lesson in its own window** (the icon beside the Source and Lesson tabs) to read it beside the runner.

## Work outside the runner

A Node step can be run directly, because Node 24 runs `.ts` files without a build step:

```pwsh
node part-i-foundations\ch01-getting-started\<step-folder>\main.ts
```

Replace `<step-folder>` with the folder of the step you want. The checker can be run on the whole course:

```pwsh
npm run check
```

A browser step (one with an `index.html`) opens in its own window when you press Run, and it can't reach Node or your files. Its TypeScript is compiled to JavaScript beside the page.

## Your progress

Progress is saved as you go, in a file outside the repository, so it's never committed:

```
%APPDATA%\training-typescript\progress.json
```

To reset it, press **Ctrl+Alt+Shift+Backspace** in the runner. Quiz answers are cleared, revealed solutions are hidden again, and the next start opens the first chapter. A message confirms the reset.

## Troubleshooting

- **Setup says Node.js is too old.** Install the current LTS release from [nodejs.org](https://nodejs.org), open a new PowerShell window, and run the script again.
- **Setup says the C++ Build Tools are missing.** Run the script from an Administrator PowerShell with `-InstallMissing`, or install the Visual Studio Build Tools with the C++ workload by hand. Then run the script again.
- **Setup says Python 3 is missing.** Install Python 3 as described above. The native build needs it.
- **Setup says `npm ci` failed.** Check your network access to the npm registry, then run the script again. Don't delete `package-lock.json` to get past the error, because it's what makes the install repeatable.
- **Setup says the Electron binary won't download.** Check network access to github.com. Run the script again once the network is back.
- **Setup says the tests or the course check failed.** The message names the failing check. Send the full output, since it means the course's own files need attention.
- **The runner says Node.js wasn't found.** Open the runner from a new terminal, after installing Node.js, so the terminal has the updated PATH.
- **Visualize says the visualizer file isn't found.** Update the repository, then restart the runner. The visualizer pages are part of the repository.
- **Output is cut off or the program stops after 10 seconds.** That's the run time limit. Check the program for a loop with no end, or for input it's waiting for.
- **A lesson's quiz shows an error about the number of right answers.** Report the lesson. It's a fault in the lesson, not in your setup.
- **The runner opens an old view of the lessons.** Press Ctrl+R, or restart the runner.
