import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";




export const authOptions = {
  // Configure one or more authentication providers
  
  pages: {
    signIn: '/'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        return await signInWithEmailAndPassword(auth, credentials.email || '', credentials.password || '')
          .then(userCredential => {
            if (userCredential.user) {
                
              return userCredential.user;
              
            }
            return null;
          })
          .catch(error => (console.log(error)))
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
             console.log(error);
  });
}
    })
  ],
}
export default NextAuth(authOptions)   