#!/usr/bin/env bash


check_backend_env_file(){
    if [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
        if [ -f $PWD/.env ]; then
            echo ".env file found in $(pwd)"
        else
            echo "Error: .env file not found in $(pwd)"
            exit 1
        fi
    else
        if [ -f .env ]; then
            echo ".env file found in /backend"
        else
            echo "Error other: .env file not found in /backend"
            exit 1
        fi
    fi
}

check_variables(){
    for variable in "$@"
    do
        if grep -q "$variable" .env; then
            echo "$variable is defined in .env"
        else
            echo "Error: $variable is not defined in .env"
            exit 1
        fi
    done
}

assert_backend_directory() {
    if [ "$(basename $(pwd))" != "backend" ]; then
        echo "Error: Must be run from the backend directory"
        exit 1
    fi
}

check_backend_env_file
check_variables "POSTGRES_HOST" "POSTGRES_USER" "POSTGRES_PASSWORD" "SECRET_KEY" "DEBUG"
assert_backend_directory
git pull
workon myvirtualenv
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate