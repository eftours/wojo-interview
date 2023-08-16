#!/bin/bash

HOSTS="# Mongo Replica Set\n127.0.0.1 mongo"

# Check if entries already exist in /etc/hosts file
if grep -q 'mongo' /etc/hosts; then
    echo "Host entry already exist in /etc/hosts"
else
    # Add new host entries to /etc/hosts file
    echo -e $HOSTS | sudo tee -a /etc/hosts > /dev/null
    echo "Host entry added to /etc/hosts"
fi