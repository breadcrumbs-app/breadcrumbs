from pymongo import MongoClient


class Database(object):
    '''Represents the MongoDB database.'''

    def __init__(self):
        client = MongoClient()
        db = client['breadcrumbs']
        self.crumbs = db['crumbs']

    def new_crumb(self, crumb_params):
        crumb_id = self.crumbs.insert(crumb_params)
        return crumb_id

    def find_crumbs(self, criteria):
        return self.crumbs.find(criteria)

    def find_crumbs_for_user(self, user_id):
        criteria = {'user_id': user_id}
        return self.find_crumbs(criteria)

    # $set is necesary in order to update and not replace
    def update_crumb(self, criteria, changeset):
        '''Update the crumb defined by criteria with the given changeset.'''
        self.crumbs.update(criteria, {'$set': changeset}, upsert=False)
