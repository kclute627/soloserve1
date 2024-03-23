
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "@firebase/auth";
import {getFirestore, addDoc, collection} from "firebase/firestore"
import { v4 as uuidv4 } from "uuid";


const firebaseConfig = {
  apiKey: "AIzaSyB7JabUOpZvA2gYSAPPvX9H4VZWWx_vPkQ",
  authDomain: "authdemo-b5947-c269f.firebaseapp.com",
  projectId: "authdemo-b5947",
  storageBucket: "authdemo-b5947.appspot.com",
  messagingSenderId: "1075163749314",
  appId: "1:1075163749314:web:24b04545ca322de58e145b",
  measurementId: "G-2HEP8EW60H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

const signUserUp = async (email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);

    return user
}

const sendVerificationEmail = async (user) => {

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "http://localhost:3000/",
    // This must be true.
    handleCodeInApp: true,
  };

  await sendEmailVerification(user, actionCodeSettings);
}

const createUserInDb = async (user, company, firstName, lastname, address, phone) => {
  const date = new Date();

  const userData = {
    user_uid: user.uid,
    user_email: user.email,
    user_company: company,
    user_phone: phone,
    user_first_name: firstName,
    user_last_name: lastname,
    user_created: date.toISOString(),
    user_updates: date.toISOString(),
    user_type: "account",
    user_website: "",
    user_monthly_jobs: 100,
    user_monthly_jobs_used: 0,
    addresses: [
      {
        type: "address",
        id: uuidv4(),
        ...address,
      },
    ],
    user_plan: "free",
  };

  const docRef = await addDoc(collection(db, "users"), userData);

}

const signInEmail = async (email, password)=> {

  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  return userCredential
}






export {app, auth, db, signUserUp, sendVerificationEmail, createUserInDb, signInEmail}