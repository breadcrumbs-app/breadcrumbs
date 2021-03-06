json.array!(@crumbs) do |crumb|
  json.extract! crumb, :id, :latitude, :longitude, :timestamp, :message

  json.author do
    json.name crumb.user.name
  end

  json.url crumb_url(crumb, format: :json)
end
