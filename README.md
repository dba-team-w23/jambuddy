# JamBuddy

## Project Dependencies

You must have [NodeJs](https://nodejs.org/en/), [Python](https://www.python.org/downloads/) and [Docker](https://www.docker.com/products/docker-desktop/) installed locally to run this project.

## Running the Project

Get the backend `.env` file from another team member, and place it in the `/backend` directory.

To build (or rebuild) the Docker container, execute `bash rebuild-docker.sh` in the root project directory.

## Initial (Local) Admin Setup

1. Once Docker is running the backend container, open the shell into the backend wep app.
2. run `python manage.py makemigrations`
3. run `python manage.py migrate`
4. run `python manage.py createsuperuser`
5. Follow the prompts, and take note of the `username` and `password` fields you fill out.
6. Navigate to http://localhost:8000/admin, where you should be able to log in with the above credentials.
7.