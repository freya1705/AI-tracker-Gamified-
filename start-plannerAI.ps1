# start-plannerAI.ps1
# Automates launching Freya's AI Planner & Companion Tracker and opening in Google Chrome

$projectDir = "C:\Users\Admin\.gemini\antigravity\scratch\companion-tracker"
$port = 5173
$targetUrl = "http://localhost:$port"

function Test-PortOpen ($p) {
    try {
        $client = New-Object System.Net.Sockets.TcpClient
        $result = $client.BeginConnect("127.0.0.1", $p, $null, $null)
        $success = $result.AsyncWaitHandle.WaitOne(400, $false)
        if ($success -and $client.Connected) {
            $client.EndConnect($result)
            $client.Close()
            return $true
        }
        $client.Close()
        return $false
    } catch {
        return $false
    }
}

# 1. Check if dev server is already running
$isRunning = Test-PortOpen $port

if (-not $isRunning) {
    # Start dev server silently in background
    Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run dev" -WorkingDirectory $projectDir -WindowStyle Hidden
    
    # Wait until port is active (up to 20 seconds)
    $attempts = 40
    while (-not (Test-PortOpen $port) -and $attempts -gt 0) {
        Start-Sleep -Milliseconds 500
        $attempts--
    }
    # Brief buffer for Vite to prepare index
    Start-Sleep -Milliseconds 600
}

# 2. Locate Google Chrome
$chromePaths = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)

$chromeExe = $null
foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        $chromeExe = $path
        break
    }
}

# 3. Open in Google Chrome
if ($chromeExe) {
    Start-Process -FilePath $chromeExe -ArgumentList $targetUrl
} else {
    Start-Process -FilePath $targetUrl
}
