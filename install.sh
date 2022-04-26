#!/usr/bin/bash

apt-get update
apt-get upgrade
apt-get install nodejs -y
apt-get install unzip -y
npm install
unzip user-instagram.zip
mv user-instagram node_modules/

echo "[*] All dependencies have been installed, please run the command \"npm start\" to immediately start the script"
