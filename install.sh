#!/usr/bin/env bash

echo -n "1/7 - creating directories" > /var/lib/cloud9/dial-a-device-bb.log
mkdir /var/lib/cloud9/
mkdir /var/lib/cloud9/autorun
cd /var/lib/cloud9

echo -n "2/7 downloading dial-a-device-bb" > /var/lib/cloud9/dial-a-device-bb.log
env GIT_SSL_NO_VERIFY=true git clone https://github.com/Cominch/dial-a-device-bb

echo -n "3/7 installing system components" > /var/lib/cloud9/dial-a-device-bb.log
opkg install python-compiler

echo -n "4/7 updating node.js packages" > /var/lib/cloud9/dial-a-device-bb.log
npm update
echo -n "5/7 installing node.js packages" > /var/lib/cloud9/dial-a-device-bb.log
npm install getmac
npm install dial-a-device-node
npm install forever-monitor

echo -n "6/7 update dial-a-device-bb" > /var/lib/cloud9/dial-a-device-bb.log
cd /var/lib/cloud9/dial-a-device-bb
env GIT_SSL_NO_VERIFY=true git pull
cp forever.js /var/lib/cloud9/autorun/

echo -n "7/7 installation complete" > /var/lib/cloud9/dial-a-device-bb.log
