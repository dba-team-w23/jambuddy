#!/usr/bin/env bash
# Exceute using `bash rebuild-docker.sh`

check_docker_is_running() {
  sc query "docker" | grep "STATE"
}



rebuild_project_container() {
  docker-compose down --remove-orphans
  docker-compose build
  docker-compose up -d
}

check_docker_is_running
rebuild_project_container