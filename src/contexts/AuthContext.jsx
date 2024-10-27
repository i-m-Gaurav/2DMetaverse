import { createContext, useContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // now we will directly send the data to the backend from here.

        return fetch('http://localhost:3000/api/users/create',{
          method:'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify({
            uid : user.uid,
            displayName : user.displayName,
            email : user.email,
            photoURL : user.photoURL
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log("User stored in the database;", data);
          return user;
        })
      }  
    );
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

