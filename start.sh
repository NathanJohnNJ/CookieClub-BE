#!/bin/bash
#com=$(which node)
#$com /home/ubuntu/CookieClub-BE/src/server.js &
com=$(which npm)
cd /home/ubuntu/CookieClub-BE/ && $com start &
