#!/usr/bin/env bash

mkdir /var/lib/cloud9/
mkdir /var/lib/cloud9/autorun
cd /var/lib/cloud9
env GIT_SSL_NO_VERIFY=true git clone https://github.com/Cominch/dial-a-device-bb
opkg install python-compiler
npm install dial-a-device-node
npm install forever-monitor

cd /var/lib/cloud9/dial-a-device-bb
env GIT_SSL_NO_VERIFY=true git pull
cp forever.js /var/lib/cloud9/autorun/