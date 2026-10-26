@echo off
REM Windows Cron Runner for Pan-India State-by-State City Scraper
REM Runs a batch of 25 unscraped cities starting from Madhya Pradesh and progressing state-by-state.
REM Already scraped cities are automatically skipped.

cd /d "%~dp0"
echo ========================================================
echo   Starting Scheduled Pan-India City Scraper Batch
echo ========================================================
python cron_scraper.py --batch-size 25 --delay 2.0
echo ========================================================
echo   Batch completed at %DATE% %TIME%
echo ========================================================
