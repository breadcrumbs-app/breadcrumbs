json.array!(@crumbs) do |crumb|
  json.extract! crumb, :id, :latitude, :longitude, :user_id, :timestamp, :message
  json.url crumb_url(crumb, format: :json)
end
