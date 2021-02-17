import * as React from "react";
import firebase from "firebase";
import { generateUserDocument } from "../firebase/dbActions";
import { auth } from "../firebase/firebaseutils";

// Followed https://stackoverflow.com/a/58203604/11042215
export const UserContext = React.createContext<firebase.User>(
  {} as firebase.User
);

 let UserProvider: React.FC = props => {
  const [user, setState] = React.useState<firebase.User>({} as firebase.User);
  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged(async userAuth => {
      const user = (await generateUserDocument(userAuth)) as firebase.User;
      setState(user)
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

UserProvider = React.memo(UserProvider)
export {UserProvider}