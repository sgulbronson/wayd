#!/bin/bash
dropdb wayd
createdb wayd
osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' 
osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'
osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' 
osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'
osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' 
osascript -e 'tell application "Terminal" to do script "redis-server" in tab 1 of window 1'
osascript -e 'tell application "Terminal" to do script "nodemon Server/server.js" in tab 2 of window 1'
osascript -e 'tell application "Terminal" to do script "nodemon Server/Workers/jobserver.js" in tab 3 of window 1'
osascript -e 'tell application "Terminal" to do script "node Server/Workers/jobqueue.js" in tab 4 of window 1'
osascript -e 'tell application "Terminal" to do script "open ios/wayd.xcodeproj" in tab 5 of window 1'