from flask import (flash, Flask, jsonify, redirect, render_template, request,
                   session, url_for)
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext import restful
from flask_oauth import OAuth

from breadcrumbs.models.crumb import Crumb

app = Flask(__name__)
app.config.from_object('breadcrumbs.config')
oauth = OAuth()
db = SQLAlchemy(app)
api = restful.Api(app)

facebook = oauth.remote_app(
    'facebook',
    base_url='https://graph.facebook.com/',
    request_token_url=None,
    access_token_url='/oauth/access_token',
    authorize_url='https://www.facebook.com/dialog/oauth',
    consumer_key=app.config['FACEBOOK_APP_ID'],
    consumer_secret=app.config['FACEBOOK_APP_SECRET'],
    request_token_params={'scope': 'email'}
)


@app.route('/')
def index():
    if get_facebook_oauth_token():
        return render_template('map.html')
    else:
        return render_template('index.html')


@app.route('/login')
def login():
    callback = url_for(
        'facebook_authorized',
        next=request.args.get('next') or request.referrer or None,
        _external=True
    )
    return facebook.authorize(callback=callback)


@app.route('/login/authorized')
@facebook.authorized_handler
def facebook_authorized(resp):
    next_url = request.args.get('next') or url_for('index')

    # Login rejected/failed
    if resp is None:
        flash('Access denied: reason=%s error=%s' % (
            request.args['error_reason'],
            request.args['error_description']
        ))
        return redirect(next_url)

    # Login successful
    session['oauth_token'] = (resp['access_token'], '')
    me = facebook.get('/me')
    flash('Welcome, %s!' % me.data['name'])
    return redirect(next_url)


@facebook.tokengetter
def get_facebook_oauth_token():
    return session.get('oauth_token')


@app.route('/crumbs', methods=['POST'])
def create_crumb():
    crumb_params = {request.form['user_id'],
                    request.form['latitude'],
                    request.form['longitude'],
                    request.form['timestamp']}
    crumb = Crumb(**crumb_params)
    db.session.add(crumb)
    db.session.commit()
    return jsonify(**crumb)

if __name__ == '__main__':
    app.run()
