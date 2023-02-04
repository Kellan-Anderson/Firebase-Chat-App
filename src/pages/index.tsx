import Head from 'next/head'
import { useState, useRef, FormEvent } from 'react';

import { initializeApp } from 'firebase/app';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestore, collection, query, limit, orderBy, doc, setDoc, addDoc, Timestamp, DocumentData } from 'firebase/firestore';
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { getAuth, UserCredential, User } from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
}); 

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

let user: User | null | undefined;

export default function Home() {
  const [_user, loading, error] = useAuthState(auth);
  user = _user;

  return (
    <>
      <Head>
        <title>Firebase Chat app tutorial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='bg-blue-500'>
        <p>{user?.email}</p>
        { user ? <ChatRoom /> : <SignIn />}
      </section>
    </>
  )
}

function SignIn() {
  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth);
  user = _user?.user;

  return (
    <button className="sign-in" onClick={() => signInWithGoogle()}>Sign in with Google</button>
  );
}

function Signout() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom() {
  const dummy: any = useRef(null);
  const col = collection(firestore, 'messages');
  const q = query(col, orderBy('createdAt'), limit(25));

  const [messages, loading, error] = useCollectionData(q);

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    const photoUrl = user?.photoURL;
    const uid = user?.uid;

    await addDoc(collection(firestore, 'messages'), {
      text: formValue,
      createdAt: Timestamp.now(),
      uid,
      photoUrl
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <main>
        { messages && messages.map(msg => {
          console.log(msg);
          return (<ChatMessage key={msg.createdAt} message={msg} />);} )}

        <div ref={dummy}></div>
      </main>

      <form onSubmit={(e) => sendMessage(e)}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type='submit'>Send</button>
      </form>
    </>
  );
}



function ChatMessage(props: DocumentData) {
  const { text, uid, photoUrl } = props.message;

  const messageClass = uid == auth.currentUser?.uid ? "sent" : "recieved";

  return (
      <div className={`message ${messageClass}`}>
        <img src={photoUrl} alt="sup"/>
        <p>{text}</p>
      </div>
    );
}
