import Head from 'next/head'

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import ChatRoom from '../components/ChatRoom';

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
});

export default function Home() {

  const auth = getAuth(app);

  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Firebase Chat app tutorial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='bg-blue-500'>
        <p>{user?.email}</p>
        { user ? <ChatRoom app={app} /> : <SignIn />}
      </section>
    </>
  )
}

function SignIn() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(getAuth(app));

  return (
    <button className="sign-in" onClick={() => signInWithGoogle()}>Sign in with Google</button>
  );
}

function Signout() {
  const auth = getAuth(app);

  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

