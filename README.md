# How to Start

1. Run `npm install`
2. Run `npm start`
3. Point browser to `http://localhost:9000`

Alternatively you can start the client/server in dev mode
1. Run 'npm run dev' for client dev mode
2. Run 'npm run dev-server' for server dev mode
3. Point browser to `http://localhost:3000`

* Node version: 8.6.0


#### Challenges
- The main challenge here was properly querying Google's geocode API without going over the query limit. I originally
attempted to do the geocoding from the client and quickly realized it was not going to work properly. I moved the
geocoding to the server and saw immense performance improvements.

- Some of the styling/UX was a bit difficult to figure out in terms of making it look nice and user friendly

- Figuring out the best way to cache the results was another challenge. Currently I have the file saving to a json 
output and also being stored in session storage when it reaches the client. This will limit the amount of requests
to our own server as well as the geocoding API
