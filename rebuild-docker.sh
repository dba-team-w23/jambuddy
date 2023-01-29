#!/usr/bin/env bash
# Exceute using `bash rebuild-docker.sh`

bash build-backend.sh
cd frontend
npm ci
npm start
