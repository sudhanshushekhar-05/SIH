@echo off
title MINDSET-NER Portal Launcher
echo =========================================================
echo Starting MINDSET-NER Portal Server (Port 8000)...
echo =========================================================
where py >nul 2>nul
if %errorlevel% == 0 (
    py run.py
) else (
    python run.py
)
pause
