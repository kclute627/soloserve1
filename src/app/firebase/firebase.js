import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "@firebase/auth";

import {
  getFirestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  where,
  query,
  limit
} from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable} from "firebase/storage"

import { v4 as uuidv4 } from "uuid";
import { setSelectedClientInfo } from "../Redux/actions";

const firebaseConfig = {
  apiKey: "AIzaSyB7JabUOpZvA2gYSAPPvX9H4VZWWx_vPkQ",
  authDomain: "authdemo-b5947-c269f.firebaseapp.com",
  projectId: "authdemo-b5947",
  storageBucket: "authdemo-b5947.appspot.com",
  messagingSenderId: "1075163749314",
  appId: "1:1075163749314:web:24b04545ca322de58e145b",
  measurementId: "G-2HEP8EW60H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

const storage = getStorage()


const date = new Date();



const signUserUp = async (email, password) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);

  return user;
};

const sendVerificationEmail = async (user) => {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "http://localhost:3000/",
    // This must be true.
    handleCodeInApp: true,
  };

  await sendEmailVerification(user, actionCodeSettings);
};

const createUserInDb = async (
  user,
  company,
  firstName,
  lastname,
  address,
  phone
) => {
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

  const docRef = await setDoc(doc(db, "users", user.uid), userData);
};

const createNewClientinDb = async (user, companyName, userInfo, phone, email, firstName, lastname, website) => {
  const address = {
    type: "address",
    id: uuidv4(),
    label: "client",
    address1: userInfo.street,
    address2: userInfo.suite,
    city: userInfo.city,
    state: userInfo.state,
    zip: userInfo.zip,
    lat: userInfo.lat,
    lng: userInfo.lng,
    created_at: date.toISOString(),
    updated_at: date.toISOString(),
    primary: true,
  };
  const contact = {
    id: uuidv4(),
    firstName,
    lastname,
    email, 
    primary: true,
    created_at: date.toISOString(),
    updated_at: date.toISOString(),


  }
  const clientId = uuidv4()

  const newClient = {
    generatedBy: user.user_uid,
    type: "client",
    id: `${clientId}`,
    name: companyName,
    searchName: companyName.toLowerCase(),
    website,
    created_at: date.toISOString(),
    updated_at: date.toISOString(),
    addresses: [address],
    phone,
    contacts: [contact]
  };
try {
  const docRef = await addDoc(collection(db, "clients"), newClient);
  console.log(docRef.id, "docRef.id" )
  return docRef.id
 
} catch (error) {
  console.log(error, "error")
  return null; 
  
  
}

};

const getClientFromDB = async (id) => {
  try {
    const docRef = doc(db, "clients", id)
    const clientDoc = await getDoc(docRef)

    if(clientDoc.exists()){

      // setSelectedClientInfo(clientDoc.data());
      return clientDoc.data()

    }else {
      console.log("Client document does not exist");
      return null;
    }
    
  } catch (error) {
    console.error("Error fetching client document:", error);
    return null;
  }

}

const getMatchingClientsFromDb = async(searchText, user) => {

  // Fetch clients from Firestore that match the search text
  

    const clientsQuery = query(
      collection(db, 'clients'),
      where('generatedBy', '==', user.user_uid),
      where('name', '>=', searchText),
      where('name', '<=', searchText + '\uf8ff'),
      limit(8) // '\uf8ff' is a placeholder for the last Unicode character
    ); // '\uf8ff' is a placeholder for the last Unicode character



  try {
    const querySnapshot = await getDocs(clientsQuery);
    if (querySnapshot) {
      const matchingClientsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return matchingClientsData

    }else{
      return []
    }
    
  } catch (error) {
    console.log(error, "line 183")
  }
}

const getUserFromDb = async (authUid) => {
  try {
    const docRef = doc(db, "users", authUid.uid);
    const userDoc = await getDoc(docRef);



    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("User document does not exist");
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
  }
};

const signInEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential;
};


const metadata = {
  contentType: 'application/pdf'
};



const setFileinStorage = (name, file, setDocumentUploadProgress) => {
  
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `files/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Upload progress
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setDocumentUploadProgress(progress)
      },
      (error) => {
        // Handle errors
        console.error('Upload error:', error);
        reject(error);
      },
      () => {
        // Upload completed successfully, get download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
          
            resolve(downloadURL);
          })
          .catch((error) => {
       
            reject(error);
          });
      }
    );
  });
};

export {
  app,
  auth,
  db,
  signUserUp,
  sendVerificationEmail,
  createUserInDb,
  signInEmail,
  getUserFromDb,
  createNewClientinDb,
  getClientFromDB,
  getMatchingClientsFromDb,
  setFileinStorage
};
