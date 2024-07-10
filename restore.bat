@echo off
setlocal

rem Variables
set DB_HOST=aws-0-ap-southeast-1.pooler.supabase.com
set DB_NAME=postgres
set DB_USER=postgres.gvmdadmniooqncgbnhjr
set DB_PASSWORD=DineshKasar_123

rem Check if backup file is provided
if "%1"=="" (
    echo Please provide the backup file to restore from.
    endlocal
    pause
    exit /b 1
)

rem Restore database
set PGPASSWORD=%DB_PASSWORD%
psql -h %DB_HOST% -U %DB_USER% -d %DB_NAME% -f %1

echo Database restored from %1
endlocal
pause
