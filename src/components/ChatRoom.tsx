import { useContext, useRef, useState, FormEvent } from "react";
import { collection, query, orderBy, limit, addDoc, Timestamp, getFirestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import FirebaseContext from "@/context/firebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatMessage from "./ChatMessage";
import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";

interface fireApp {
  app: FirebaseApp
}

export default function ChatRoom({app}: fireApp) {
    // Context functions
    //const { getFirebaseFirestore, getFirebaseAuth } = useContext(FirebaseContext);
    // Firestore
    //const firestore = getFirebaseFirestore();

   const firestore = getFirestore(app)

    const col = collection(firestore, 'messages');
    const q = query(col, orderBy('createdAt'), limit(25));

    // Auth
    //const auth = getFirebaseAuth();
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
  