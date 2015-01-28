json.extract! @crumb, :id, :latitude, :longitude, :timestamp, :message, :created_at, :updated_at

json.author do
  json.name @crumb.user.name
end
