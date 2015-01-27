# Server
Instructions for an Ubuntu 14.04 droplet.
All instructions run as a privileged, non-root user

1. sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install git nodejs -y
2. `gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3`
3. `\curl -sSL https://get.rvm.io | bash -s stable`
4. Logout and log back in
5. `rvm install 2.2`
	* Enter your password when it is asked for.
	* Compiling ruby will take 2-3 minutes.
6. `rvm use 2.2 --default`
7. `git clone https://github.com/breadcrumbs-app/breadcrumbs.git && cd breadcrumbs`
8. `bundle install`
	* Installing gems will take 2-3 minutes.
9. `rake db:migrate`
10. Create a file `config/application.yml` with the following contents:
	* ```
SECRET_KEY_BASE: a8f5fd3afa49338e8b64e7573323d10eb81c824c2e966c9fb456338be6741f6ff427e1a3ac0079e8902b582c3298a50bbe307075c1389ffa53cbcb3ab5033b26
FACEBOOK_APP_ID: '1522528834682545'
FACEBOOK_SECRET: '9e9756d8aab59cdec16cde596ba27074'
```
11. Run the server: `rails s -b 0.0.0.0`