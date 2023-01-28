FROM  python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

# copy requirements.txt into the image
COPY requirements.txt .

# install dependencies from requirements.txt
RUN pip install -r requirements.txt

RUN pip install django django-cors-headers


# copy from the current directory of the Dockerfile to /api in the image
COPY . .

RUN python manage.py makemigrations
RUN python manage.py migrate


EXPOSE 8000