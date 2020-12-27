require 'open-uri'
require 'httparty'

# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

# activate :autoprefixer do |prefix|
#   prefix.browsers = "last 2 versions"
# end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helper Methods

helpers do
  # Expects dates in 2020-12-23 format
  def format_date date
    return Date.parse( date ).strftime("%B %d, %Y")
  end

  # Get public posts for a given user id
  # Pixelfed's API generally follows Mastodon's, documented at:
  # https://docs.joinmastodon.org/client/public/
  def fetch_pixelfed_posts user_id
    api_path = "/api/pixelfed/v1/accounts"
    endpoint = "statuses"
    host     = "pixelfed.social"
    query    = "min_id=1&only_media=true&limit=24"
    id       =  user_id
    url      = "https://#{host}#{api_path}/#{id}/#{endpoint}?#{query}"
    res      = HTTParty.get( url, format: :plain )

    JSON.parse res, symbolize_names: true
  end
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :build do
  activate :minify_css
  activate :minify_javascript
end
