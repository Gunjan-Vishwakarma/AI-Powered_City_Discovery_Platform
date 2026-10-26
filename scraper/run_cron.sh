#!/usr/bin/env bash
# Linux / macOS Cron Runner for Pan-India State-by-State City Scraper
# Add to crontab:
# */30 * * * * cd /path/to/AI-Powered_City_Discovery_Platform/scraper && ./run_cron.sh >> cron.log 2>&1

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "========================================================"
echo "  Starting Scheduled Pan-India City Scraper Batch: $(date)"
echo "========================================================"
python3 cron_scraper.py --batch-size 25 --delay 2.0
echo "  Batch completed: $(date)"
