The code here is to try out the celery flask tutorial by Miguel Grinberg as 
detailed in his blog - https://blog.miguelgrinberg.com/post/using-celery-with-flask.

To set up
==========
virtualenv celflaskenv
source celflaskenv/bin/activate
(celflaskenv) $ pip install -r requirements.txt

To run
======
export MAIL_USERNAME=<your-gmail-username>
export MAIL_PASSWORD=<your-gmail-password>
source celflaskenv/bin/activate
(celflaskenv) $ celery worker -A app.celery --loglevel=info

source celflaskenv/bin/activate
(celflaskenv) $ python app.py
