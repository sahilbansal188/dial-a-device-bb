#!/usr/bin/env bash

mkdir /var/lib/cloud9/
mkdir /var/lib/cloud9/autorun
cd /var/lib/cloud9
git clone https://github.com/Cominch/dial-a-device-bb
cd /var/lib/cloud9/dial-a-device-bb
cp forever.js /var/lib/cloud9/autorun/
opkg install python-compiler
npm install dial-a-device-node
npm install forever-monitor