import firebase from "firebase";
import { TaskItemInfo } from "../components/TaskItemForm/TaskItemForm";
import { db } from "./firebaseutils";

const getUserDocument = async (uid?: string) => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const generateUserDocument = async (
  user: firebase.User | null,
  additionalData?: any
) => {
  if (!user) return;
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
interface AddTrackedItemsProps {
  userId: string;
  name: string;
  activity: string;
  category: string;
  createdLocalTime: string;
  createdLocalDate: string;
  createdTime: number;
}
export const addTrackedItem = ({
  userId,
  name,
  activity,
  category,
  createdLocalTime,
  createdLocalDate,
  createdTime
}: AddTrackedItemsProps) => {
  db.collection("userItems")
    .doc(userId)
    .collection("activities")
    .doc(`${createdTime}`)
    .set({
      name,
      activity,
      category,
      createdLocalTime,
      createdLocalDate,
      createdTime,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
};

export const getUserActivities = (userId: string) => {
    return db
    .collection('userItems')
    .doc(userId)
    .collection('activities')
    .onSnapshot(querySnapshot => {
        const data: TaskItemInfo[] = [];
        querySnapshot.forEach(doc => {
          data.push({ ...(doc.data() as TaskItemInfo) });
        });
        return data;
    })
       
}
