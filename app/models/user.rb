class User < ActiveRecord::Base
  has_many :crumbs

  validates_presence_of :provider, :uid, :name, :oauth_token, :oauth_expires_at
  validates_uniqueness_of :uid

  def self.from_omniauth(auth_hash)
    where(auth_hash.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth_hash.provider
      user.uid = auth_hash.uid
      user.name = auth_hash.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end
end
