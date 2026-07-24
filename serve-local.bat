@echo off
setlocal
pushd "%~dp0"

set "AZRA_PORT=8000"
if not "%~1"=="" set "AZRA_PORT=%~1"

where py >nul 2>nul
if %errorlevel%==0 (
  echo AZRA Systems is available at http://localhost:%AZRA_PORT%/
  echo Press Ctrl+C to stop the local server.
  start "" "http://localhost:%AZRA_PORT%/"
  py -m http.server %AZRA_PORT% --bind 127.0.0.1
  goto :done
)

where python >nul 2>nul
if %errorlevel%==0 (
  echo AZRA Systems is available at http://localhost:%AZRA_PORT%/
  echo Press Ctrl+C to stop the local server.
  start "" "http://localhost:%AZRA_PORT%/"
  python -m http.server %AZRA_PORT% --bind 127.0.0.1
  goto :done
)

echo Python was not found.
echo Install Python from https://www.python.org/downloads/ and try again.
pause

:done
popd
endlocal
