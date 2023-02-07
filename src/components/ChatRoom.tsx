import { useRef, useState, FormEvent } from "react";
import { collection, query, orderBy, limit, addDoc, Timestamp, getFirestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import RecievedMessage from "./RecievedMessage"
import SentMessage from "./SentMessage";

interface fireApp {
  app: FirebaseApp
}

export default function ChatRoom({app}: fireApp) {

   const firestore = getFirestore(app)

    const col = collection(firestore, 'messages');
    const q = query(col, orderBy('createdAt'), limit(25));

    // Auth
    const auth = getAuth(app);
    const [user, userLoading, userError] = useAuthState(auth);

    const dummy: any = useRef(null);
  
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
      <div className="col-start-1 md:col-start-2">
        <main className="flex flex-col justify-items-stretch">
          { messages && messages.map(msg => {
            if (auth.currentUser?.uid === msg.uid) {
              return (
                <div className="self-end" key={msg.createdAt}>
                  <SentMessage message={msg} />
                </div>
              );
            } else {
              return (
                <div className="self-start" key={msg.createdAt}>
                  <RecievedMessage key={msg.createdAt} message={msg} />
                </div>
              );
            }
          })}
  
          <div ref={dummy}></div>
        </main>
  
        <form onSubmit={(e) => sendMessage(e)}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
          <button type='submit'>Send</button>
        </form>
      </div>
    );
}
  