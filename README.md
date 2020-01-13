# blog-fullstack

Please watch this to details.

[FullstackReact Fullstack with express, PostgreSQL and AWS](https://www.youtube.com/watch?v=RoPlkFRHqgE&amp;list=PLMc67XEAt-yzxRboCFHza4SBOxNr7hDD5&amp;index=2&amp;t=1s)

## 1. Basic express setup

### Install express global

```sh
npm install -g express-generator
```

## 2. node vs npm

### Node and NPM

1. Node js
   - is a runtime environment that lets you execute code outside the browser which allow us to make SQL query and other request

2. NPM
   - is the node package manager. Allow us to install, remove, update third party libraries

3. Express
   - the actual server code that is execute by NODE. Express code is executed by Node environment

### Express Helper Libraries

1. cors
   - help communicate between the React App and Express server. We will do this though a proxy in React app. Without this we would receive a Cross Origin Resource error in the browser

2. helmet
   - security library that updates http headers. This lib will make our http requests more secure.

3. pg
   - main library to communicate with Postgrest database. Without this, the communication will not be possible

## 3. setting up a proxy and making API requests

### setting a proxy

1. Add proxy to `client/package.json` like this:

```json
{
  "proxy": "http://localhost:5000"
}
```

## 4. Using axios to fetch data

```sh
yarn add axios
```

1. Create instance axios if using different url

```js
const axiosInstance = axios.create({
   baseURL: 'https://jsonplaceholder.typicode.com'
 })
```

2. Fetch data by using axios with default url (proxy setup)

```js
axios.get('/hello')
  .then(res => this.setState({hello: res.data}))
  .catch(err => console.error(err))
```

## 5. Fetch vs axios

| FETCH                            | AXIOS                        |
| -------------------------------- | ---------------------------- |
| vanilla javascript               | 3rd party                    |
| can be read directly by browsers | has to be compiled           |
| Have to manually transform data  | Automatically transform data |
| more verbose                     | less verbose                 |
| Fetch Hard to work with          | Axios Easy to work with      |

## Using async await with fetch

```js
fetchDataUsingFetch = async () => {
  await fetch('https://jsonplaceholder.typicode.com/posts')
          .then(res => res.json())
          .then(json => console.table(json))
          .catch(err => console.error(err))
}
```

## 6. Axios, Express Router and React Router work together

| AXIOS                                                               | EXPRESS ROUTER                      | REACT ROUTER                      |
| ------------------------------------------------------------------- | ----------------------------------- | --------------------------------- |
| - Used to communicate with server through api call                  | - Used to communicate with database | - Used to navigate within our app |
| - We signed api calls by using `/api` at the beginning of the route | - More secure than axios            | Can't make api calls              |
| - Used to communicate with other backend api                        | - Server side only                  | -                                 |
| - Promise based                                                     | -                                   | -                                 |
