FROM node:10.9

WORKDIR /frontend

# copy requirements.txt into the image
# COPY requirements.txt .
COPY package.json package-lock.json ./

# install dependencies from requirements.txt
RUN npm i
RUN npm start

# RUN pip install django django-cors-headers

# copy from the current directory of the Dockerfile to /api in the image
COPY . .

EXPOSE 3000