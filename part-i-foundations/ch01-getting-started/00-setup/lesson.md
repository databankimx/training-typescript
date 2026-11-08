# Set up your workstation

Before any code can run, a few things have to be installed and persuaded to cooperate. This step is that part. It's the least glamorous thing in the course, and the only step you can't skip, which is roughly the deal with most software.

Before you can write code, your computer needs two tools:

- **Node.js** runs your programs. It reads a program's instructions and carries them out.
- **The checker** reads your programs and points out mistakes, before you run them. It comes with this course, so you don't install it separately.

## Step 1: Check the tools

If you haven't set up the computer yet, follow [QUICKSTART.md](../../QUICKSTART.md) in the repository root first. The short version is: open PowerShell as Administrator, go to the repository folder, and run:

```pwsh
powershell -ExecutionPolicy Bypass -File .\setup.ps1
```

The script installs anything that's missing. It can take a while the first time.

## Step 2: Open a terminal

A **terminal** is a window where you type commands. Each command is typed at the prompt, and it runs when you press Enter.

The easiest place to open one is VS Code. Press **Ctrl+`** (the key above Tab, with the backtick). Or open **PowerShell** from the Start menu.

## Step 3: Check Node

Type this command and press Enter:

```pwsh
node --version
```

You should see a version number that starts with `v24` or higher. The course needs Node 24, because it runs TypeScript files directly. If you see an older number, install Node 24 before you go on.

## Step 4: Check the project

Make sure the terminal is in the repository folder. The folder name appears at the start of the prompt. Then type:

```pwsh
npm run check
```

When the command finishes, you should see no messages. That means the checker found no mistakes in the course's own examples. If you see an error instead, copy it and send it to the course team.

## Step 5: Open the runner

Type this command and press Enter:

```pwsh
npm start
```

A window opens, with the chapters on the left. When you can see that window, the setup is complete.

---

## Why this step has no code

This step has no code to run, so the Run and Check buttons are disabled, and the Source tab says there's no code here. That's on purpose. Read the steps, check the tools, and then move on to the next step, where you'll write your first program.
