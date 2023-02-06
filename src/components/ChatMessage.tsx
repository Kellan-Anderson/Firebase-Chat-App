import { DocumentData } from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default function ChatMessage(props: DocumentData) {
  const app = getApp();
  const auth = getAuth(app);

  const { text, uid, photoUrl } = props.message;
  
  const messageClass = uid == auth.currentUser?.uid ? "sent" : "recieved";
  
  return (
    <div className='border border-black flex flex-row h-11 items-center'>
      <img className="rounded-full h-full" src={photoUrl} alt="sup"/>
      <p>{text}</p>
    </div>
  );
 }