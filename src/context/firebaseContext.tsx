import React, { useState, createContext } from "react";

import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

/* TYPES */
export type contextData = {
    getFirebaseApp: () => FirebaseApp,
    //getFirebaseAuth: () => Auth,
    //getFirebaseFirestore: () => Firestore
}

const FirebaseContext = createContext<contextData | null >(null);
export default FirebaseContext;


interface Props {
    children: React.ReactNode;
}
export const FirebaseProvider: React.FC<Props> = ({children}) => {

    const [app, setApp] = useState<FirebaseApp | undefined>()
    const [auth, setAuth] = useState<Auth>()
    const [firestore, setFirestore] = useState<Firestore>()


    const getFirebaseApp = (): FirebaseApp => {
        if (app !== undefined) {
            setApp(() => {
                const _app = initializeApp({
                    apiKey: process.env.NEXT_PUBLIC_APIKEY,
                    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
                    projectId: process.env.NEXT_PUBLIC_PROJECTID,
                    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
                    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
                    appId: process.env.NEXT_PUBLIC_APPID,
                    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
                })
                console.log(app, _app);
                return _app;
                }
            );
        }
        console.log(app);
        return app as FirebaseApp;
    }

    const getFirebaseAuth = (): Auth => {
        if(!auth) {
            if(!app) {
                getFirebaseApp();
            }
            setAuth(() => getAuth(app))
        }
        return auth as Auth;
    }

    const getFirebaseFirestore = (): Firestore => {
        if(!firestore) {
            if(!app) {
                getFirebaseApp();
            }
            setFirestore(() => getFirestore(app as FirebaseApp));
        }
        return firestore as Firestore;
    }

    const contextData: contextData = {
        getFirebaseApp,
    }

    return (
        <FirebaseContext.Provider value={contextData}>
            {children}
        </FirebaseContext.Provider>
    );
}
