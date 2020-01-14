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

### Fetch

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

### Using async await with fetch

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

## 7. how CORS works

When our React Frontend communicate with Express server, we're pretending origin locahost:3000 to localhost:5000 using proxy. This process can be called using cors

## 8. why not use ORM like Sequelize

- What is Sequelize

    Sequelize is an Object Relational Mapper (ORM), which simplifies interacting with relational databases by abstracting away the need to use SQL directly.

- Why not use ORM like Sequelize?
  - Preference for directly working with SQL
  - Allows more control than ORM
  - More resource for SQL than an ORM
  - ORM skills are not transferable, SQL skills are very transferable

## 9. Why not use Redux Form

Personally, I could not find a use case, because any Functionally by Redux Form can be accomplished relatively easier without Redux Form

## 10. Fullstack blog overview

- 3 main parts:
  - SQL schema and PSQL database
  - The client side Blog with CRUD Operations
  - The node server with express routes and SQL queries

## 11 Creating the sql schema file

```sql
CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  email_verify BOOLEAN,
  date_created DATE,
  last_login DATE
);

CREATE TABLE posts (
  pid SERIAL PRIMARY KEY,
  title VARCHAR(255),
  body VARCHAR,
  user_id INT REFERENCES users(uid),
  author VARCHAR REFERENCES users(username),
  date_created TIMESTAMP
);

CREATE TABLE comments (
  cid SERIAL PRIMARY KEY,
  comment VARCHAR(255),
  author VARCHAR REFERENCES users(username),
  user_id INT REFERENCES users(uid),
  post_id INT REFERENCES posts(pid),
  date_created TIMESTAMP
);
```

## 12. Setting up the local database

Open PSQL shell then

- Connect to mydb database

  ```pg
  \c mydb
  ```

- List all tables inside mydb

  ```pg
  \dt;
  ```

- Execute some create table queries form period 11

  ```sql
  CREATE TABLE ...
  ```

## 13. Setting up the actions for our app

Create action types inside `client/src/store/actions/action_types.js` like example:

```js
export const SUCCESS = "SUCCESS"
```

Create action functions inside `client/src/store/actions/actions.js`

```js
import * as ACTION_TYPES from './action_types'

export const success = () => {
  return {
  type: ACTION_TYPES.SUCCESS
  }
}
```
