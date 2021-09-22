## Local installation guidelines

* Clone the repository
* Install, create and activate `virtualenv` from the project dir
```
$ pip3 install virtualenv
$ virtualenv env -p `which python3`
$ source env/bin/activate
```
* Install project requirements 
```
$ pip3 install -r requirements.txt
```
* From the project dir navigate to `/backend` dir and run migration 
```
$ cd backend
$ python manage.py migrate
```

* Run Django server from `/backend` dir
```
$ python manage.py runserver
```
* From the project dir navigate to `/calculator-app` dir, install dependencies and run React server 
```
$ cd calculator-app
$ npm install
$ npm start
```

