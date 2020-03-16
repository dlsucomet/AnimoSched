# ArcherOne

## Prerequisites

https://www.python.org/downloads/

https://nodejs.org/en/download/

https://pypi.org/project/pipenv/

https://classic.yarnpkg.com/en/docs/install/

## Installation

`pip install django djangorestframework django-cors-headers django-cors-middleware django-rest-auth django-allauth django-extensions`

Then go to the frontend directory to install react dependencies:

`cd frontend`

`yarn global add create-react-app`

`yarn add bootstrap reactstrap axios`

Additional packages that need to be installed:

`yarn add simple-flexbox react-smooth-dnd react-router @devexpress/dx-react-core @devexpress/dx-react-scheduler @material-ui/core @material-ui/icons @devexpress/dx-react-scheduler-material-ui`

## Usage

You need to run both the React Server and the Django Server.

Start React Server:

`cd frontend`

`yarn start`

Start Django Server:

`cd backend`

`python manage.py runserver`

## REST API

Get all users:

`/api/users/`

Get all courses:

`/api/courses/`

Get all colleges:

`/api/colleges/`

Get a specific user using id:

`/api/users/[id]`
