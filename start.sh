#!/bin/bash
cd frontend && yarn start & 
cd ..
pipenv shell "cd backend && python3 manage.py runserver" 
