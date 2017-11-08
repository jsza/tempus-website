# Tempus Website
This is the client application for https://tempus.xyz/

# Running
* First, grab and install Node from https://nodejs.org/en/
* Once you have that, navigate to `tempus-website` and run `npm install` followed by `npm run watch`.
* Open up http://localhost:3001/ and behold the website! All API requests are proxied to https://tempus.xyz/api/
* Note that the official Tempus API only allows cross-origin GET requests. The actual backend will be made available at some point in the near future.
* Hot reloading is enabled, courtesy of `webpack-dev-server` and `react-hot-loader`.
