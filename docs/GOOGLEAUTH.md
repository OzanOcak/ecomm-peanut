## Google Authentication with Next Auth

We will need to set up our project before we set up our authentication. We will name the project
ecomm then no to typescript, src folder and experimental but yes to linter. Finally we will set up tailwind CSS on our next.js app. Finally we need to add next auth npm package into our project.

```console
npx create-next-app ecomm .
yarn add next-auth
```

Go to https://next-auth.js.org/ then check the implementation of next-auth. First we will add
Client app in \_app.js file.

\_app.js

```javascript
import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
```

Then forse server side, create [...nextauth].js folder under api/auth folder

```javascript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});
```

We need to create .env file and add GOOGLE_ID and GOOGLE_SECRET in it.

1. Go to https://console.cloud.google.com/welcome?project=ecomm-386103

2. Create a new project, then APIs and services and click on Configure consent screen

3. Give an app name,user suppor e-mail and developer contact eamil address then save and continue.

4. Then Credientials > Create Credientials > Oath Client ID ,choose web application ass app type

5. Then to authorized redirect URIs, paste the url link from next-auth.js.org documentation>providers>google under configuration segment

- For development: http://localhost:3000/api/auth/callback/google

6. Eventually we will be able to see Oath created modal screen where we can get google id and secret.

Finally within index.js we can code the logic of sign in /out as below

```javascript
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="bg-blue-500 h-screen w-screen flex flex-col gap-2 justify-center items-center">
        <span className="text-white">
          Signed in as {session.user.email} <br />
        </span>
        <button
          className="bg-white px-4 py-1 rounded-md hover:bg-gray-100 font-bold text-blue-700"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="bg-blue-500 h-screen w-screen flex justify-center items-center">
      <button
        onClick={() => signIn("google")}
        className="bg-white px-4 py-1 rounded-md hover:bg-gray-100 font-bold text-blue-700"
      >
        Login with Google
      </button>
    </div>
  );
}
```

Now we can sign in with google provider provided by next auth.
