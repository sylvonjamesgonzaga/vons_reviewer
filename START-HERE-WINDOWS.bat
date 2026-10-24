@echo off
setlocal
cd /d "%~dp0"
where npm >nul 2>&1
if errorlevel 1 (
  echo Node.js and npm are required. Install Node.js LTS from https://nodejs.org first.
  pause
  exit /b 1
)
echo Installing project dependencies...
call npm install
if errorlevel 1 (
  echo Installation failed. Check your internet connection and try again.
  pause
  exit /b 1
)
echo.
echo Starting ReviewLab. Open http://localhost:3000 in your browser.
echo Press Ctrl+C to stop the server.
call npm run dev
pause
