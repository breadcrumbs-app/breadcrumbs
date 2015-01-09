from flask import flash, Flask, redirect, render_template, request, session, url_for
from flask_oauth import OAuth

app = Flask(__name__)
app.config.from_object('breadcrumbs.config')
oauth = OAuth()

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


def logged_in():
    return False


def main():
    app.secret_key = 'very secret'
    app.debug = True
    app.run()

if __name__ == '__main__':
    app.run()
