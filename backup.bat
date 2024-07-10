@echo off
setlocal

rem Variables
set DB_HOST=aws-0-ap-southeast-1.pooler.supabase.com
set DB_NAME=postgres
set DB_USER=postgres.gvmdadmniooqncgbnhjr
set DB_PASSWORD=DineshKasar_123
set BACKUP_DIR=backups
set BACKUP_NAME=backup_%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.sql

rem Create backup directory if it does not exist
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

rem Create backup
set PGPASSWORD=%DB_PASSWORD%
pg_dump -h %DB_HOST% -U %DB_USER% %DB_NAME% > "%BACKUP_DIR%\%BACKUP_NAME%"

echo Backup saved to "%BACKUP_DIR%\%BACKUP_NAME%"
endlocal
pause
