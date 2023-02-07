import React from "react";
import { DocumentData } from "firebase/firestore";

export default function RecievedMessage(props: DocumentData) {
  const { text, photoUrl } = props.message;
    
  return (
    <div 
        className='border border-black 
                   flex flex-row items-center 
                   h-fit w-fit my-1 
                   rounded-[24px]
                   bg-red-300 '
    >
      <img className="rounded-full h-12 m-2" src={photoUrl} alt="sup"/>
      <p className="mr-2">{text}</p>
    </div>
  );
 }