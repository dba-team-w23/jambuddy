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



check_backend_env_file(){
    if [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
        if [ -f $PWD/backend/.env ]; then
            echo ".env file found in $(pwd)"
        else
            echo "Error: .env file not found in $(pwd)"
            exit 1
        fi
    else
        if [ -f /backend/.env ]; then
            echo ".env file found in /backend"
        else
            echo "Error: .env file not found in /backend"
            exit 1
        fi
    fi
}

check_variables(){
    for variable in "$@"
    do
        if grep -q "$variable" backend/.env; then
            echo "$variable is defined in .env"
        else
            echo "Error: $variable is not defined in .env"
            exit 1
        fi
    done
}

check_backend_env_file
check_variables "POSTGRES_HOST" "POSTGRES_USER" "POSTGRES_PASSWORD"

check_docker_is_running
rebuild_project_container