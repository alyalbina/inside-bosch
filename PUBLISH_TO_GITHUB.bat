@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Please install Node.js 22 or newer, then run this file again.
 pause
 exit /b 1
)
where git >nul 2>nul
if errorlevel 1 (
 echo Please install Git for Windows, then run this file again.
 pause
 exit /b 1
)
node scripts/publish-github.mjs
pause
