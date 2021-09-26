## DEV Host
http://ec2-34-216-118-180.us-west-2.compute.amazonaws.com/

**Admin System:** http://ec2-34-216-118-180.us-west-2.compute.amazonaws.com/admin
* login: admin
* password: 1111

## PROD Host
http://ec2-54-202-56-60.us-west-2.compute.amazonaws.com/

**Admin System:** http://ec2-54-202-56-60.us-west-2.compute.amazonaws.com/admin
* login: admin
* password: 1111

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

## AWS server config guidelines
* Create an EC2 instance on AWS 
* SSH to the VM and create the following dir structure
```
- projects (dir)
  - dev (dir)
    - fe (dir)
```
* Navigate to the project home dir on your local machine and copy backend dir to the VM
```
scp -i <FILE WITH SSH KEY> -r backend <USERNAME>@<HOST>:~/projects/dev
```
* Copy requirements.txt from the project home dir on your local machine to the VM
```
scp -i <FILE WITH SSH KEY> requirements.txt <USERNAME>@<HOST>:~/projects/dev
```
* Navigate to the `calculator-app` dir on your local machine, 
create a frontend build and copy the frontend build to the VM
```
cd calculator-app
npm run build
scp -i <FILE WITH SSH KEY> -r build/* <USERNAME>@<HOST>:~/projects/dev/fe
```
* Install nginx on the VM
```
sudo apt update
sudo apt install nginx
```
* Open HTTP port 80 for the VM in AWS 
* Install virtualenv on the VM
```
cd ~/projects/dev
sudo apt install python3-virtualenv
virtualenv -p /usr/bin/python3 env
source env/bin/activate
pip install -r requirements.txt
```
* Configure and start a gunicorn dev env on the VM
```
sudo vi /etc/systemd/system/gunicorn-dev.service (ADD CONFIGURATION FROM config/gunicorn-dev.service)
sudo systemctl daemon-reload
sudo systemctl start gunicorn-dev.service
sudo systemctl status gunicorn-dev.service
```
* Configure nginx to point to gunicorn on the VM
```
sudo vi /etc/nginx/sites-available/django-nginx.conf (ADD CONFIGURATION FROM config/django-nginx.{dev/prod}.conf)
sudo ln -s /etc/nginx/sites-available/django-nginx.conf /etc/nginx/sites-enabled/django-nginx.conf
```
* Test nginx config on the VM
```
sudo nginx -t
```
* Remove nginx default config on the VM
```
sudo rm /etc/nginx/sites-enabled/default
```
* Restart nginx on the VM
```
sudo systemctl restart nginx
```
* Collect static files for django on the VM
```
cd ~/projects/dev/backend/
python manage.py collectstatic
```

