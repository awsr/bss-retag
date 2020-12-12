@ECHO OFF

setlocal 
set "scriptpath=%~dp0\exporter.js"
set "exportpath=%1"

rem This assumes that NodeJS is added to your path environment variable
node "%scriptpath%" "%exportpath:\=\\%"