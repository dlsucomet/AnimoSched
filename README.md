# ArcherOne

## Prerequisites

https://www.python.org/downloads/

https://nodejs.org/en/download/

https://pypi.org/project/pipenv/

https://classic.yarnpkg.com/en/docs/install/

## Installation

`pipenv install django djangorestframework django-cors-headers`

If pipenv doesn't work, go ahead and install directly:

`pip install django djangorestframework django-cors-headers`

Then go to the frontend directory to install react dependencies:

`cd frontend`

`npm install -g create-react-app`

`yarn add create-react-app bootstrap reactstrap axios`

## Usage

You need to run both the React Server and the Django Server.

Start React Server:

`cd frontend`

`yarn start`

Start Django Server:

`cd backend`

`pipenv run python manage.py runserver`

or just

`python manage.py runserver`

