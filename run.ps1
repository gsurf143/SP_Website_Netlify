# Sujendra Construction Website Runner
Write-Host "Opening Sujendra Construction Website..." -ForegroundColor Green

# Get the directory where this script is located
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$indexPath = Join-Path $scriptDir "index.html"

# Check if index.html exists
if (Test-Path $indexPath) {
    Write-Host "Opening website in default browser..." -ForegroundColor Yellow
    Start-Process $indexPath
    Write-Host "Website opened successfully!" -ForegroundColor Green
} else {
    Write-Host "Error: index.html not found!" -ForegroundColor Red
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
