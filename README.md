# blog-fullstack
Please watch this to details
https://www.youtube.com/watch?v=RoPlkFRHqgE&amp;list=PLMc67XEAt-yzxRboCFHza4SBOxNr7hDD5&amp;index=2&amp;t=1s

# 1 basic express setup
## Install express global
```sh
$ npm install -g express-generator
```
# 2 node vs npm
## Node and NPM
- Node js
is a runtime environment that lets you execute code outside the browser which allow us to make SQL query and other request

- NPM
is the node package manager. Allow us to install, remove, update third party libraries

- Express
the actual server code that is execute by NODE. Express code is executed by Node environment

## Express Helper Libraries
- cors: help communicate between the React App and Express server. We will do this though a proxy in React app. Without this we would receive a Cross Origin Resource error in the browser

- helmet: security library that updates http headers. This lib will make our http requests more secure.

- pg: main library to communicate with postgrest database. Without this, the communication will not be possible

# 3 setting up a proxy and making API requests
## setting a proxy
Add proxy to `client/package.json` like this:

    {
      "proxy": "http://localhost:5000"
    }
