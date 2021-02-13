import * as React from 'react';
import firebase from 'firebase'
import { generateUserDocument } from '../firebase/dbActions';
import { auth } from '../firebase/firebaseutils';


export const UserContext = React.createContext<firebase.User | null>(null);


export const UserProvider: React.FC = (props) => {

  const [user, setState] = React.useState<firebase.User | null>(null)

  React.useEffect(() => {
   auth.onAuthStateChanged(async (userAuth) => {
    const user = await generateUserDocument(userAuth) as firebase.User;
        setState(user);
      });
  },[])
  
    return (
      <UserContext.Provider value={user}>
        {props.children}
      </UserContext.Provider>
    );
  
}
