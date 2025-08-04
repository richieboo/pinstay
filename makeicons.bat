@echo off
setlocal

set input=PinStay.png

rem Resize and save all in the same folder with zero compression
magick "%input%" -resize 128x128^ -define png:compression-level=0 "icon128.png"
magick "%input%" -resize 48x48^ -define png:compression-level=0 "icon48.png"
magick "%input%" -resize 16x16^ -define png:compression-level=0 "icon16.png"

echo Done!
pause
