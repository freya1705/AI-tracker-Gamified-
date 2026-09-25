' launch-plannerAI.vbs
' Silently runs start-plannerAI.ps1 without showing any command prompt window
Set objShell = CreateObject("WScript.Shell")
strCommand = "powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File ""C:\Users\Admin\.gemini\antigravity\scratch\companion-tracker\start-plannerAI.ps1"""
objShell.Run strCommand, 0, False
