import { DocumentData } from "firebase/firestore";
import FirebaseContext, { contextData } from "@/context/firebaseContext"
import { useContext } from "react";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default function ChatMessage(props: DocumentData) {
  const app = getApp();
  //const { getFirebaseAuth } = useContext(FirebaseContext) as contextData;
  //const auth = getFirebaseAuth();

  const auth = getAuth(app);

  const { text, uid, photoUrl } = props.message;
  
  const messageClass = uid == auth.currentUser?.uid ? "sent" : "recieved";
  
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoUrl} alt="sup"/>
        <p>{text}</p>
    </div>
  );
 }