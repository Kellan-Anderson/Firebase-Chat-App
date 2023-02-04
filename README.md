# Chat app ( Firebase | NextJS | Typescript )

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project is coded following a tutorial posted by [`Fireship.io`](https://www.youtube.com/watch?v=zQyrwxMPm88)

## Getting Started
Clone and `cd` into the repository then run
```bash
npm install OR yarn add
```
to install the required dependancies

## Starting the firebase app
To setup your app with Firebase:
1. Go to [Google Firebase](https://firebase.google.com/) and start a project
2. Enable authentication with Google and Firestore
3. Add a web app to the console
4. Convert the configuration values to enviroment variables

To convert configuration values to enviroment variables create a ```.env.local``` file and paste the values in the following format
```bash
NEXT_PUBLIC_APIKEY=<your API key>
NEXT_PUBLIC_AUTHDOMAIN=<your auth domain>
NEXT_PUBLIC_PROJECTID=<your projected value>
NEXT_PUBLIC_STORAGEBUCKET=<your storage bucket id>
NEXT_PUBLIC_MESSAGINGSENDERID=<your message sender id>
NEXT_PUBLIC_APPID=<your app id>
NEXT_PUBLIC_MEASUREMENTID=<your measurement id>
```

To start the application run
```bash
npm run dev

OR

yarn start dev
```
