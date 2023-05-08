## Mongo DB implementation for user database

We need to keep user database in order to fetch user information, everytime user sign in.

- Go to next-auth documentations and chose mongodb from adapters on the side menu

```console
npm install next-auth @next-auth/mongodb-adapter mongodb
```

- create mongodb.js under lib directory

```javascript
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise; // clientPromise : Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
```

- then go add below code in [...nextauth].js

```javascript
import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/providers/oauth
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  ...
})
```

- go to the mongodb.com and create a new project,create a database,user and password
  and connect database to get uri.

- `npm install mongodb`

finally you can put MONGODB_URI in .env file

you need to place your password in the uri
any special charecter might cause error in the password such as "$"
we dont need to write database name in the uri

-there will be test database creates and there will be accounts,sessions and users collections
