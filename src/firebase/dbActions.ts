import firebase from "firebase";
import { TaskItemInfo } from "../components/AddItemForm/AddItemForm";
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

export const addTrackedItem = (props: TaskItemInfo & { userId: string }) => {
  db.collection("userItems")
    .doc(props.userId)
    .collection("activities")
    .doc(`${props.createdTime}`)
    .set({
      ...props,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
};

export const getUserActivities = (userId: string) => {
  return db
    .collection("userItems")
    .doc(userId)
    .collection("activities")
    .orderBy("timestamp", "asc")
    .onSnapshot(querySnapshot => {
      const data: TaskItemInfo[] = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data() as TaskItemInfo);
      });
      return data;
    })
    .toString();
};
export interface ResumeActivityProps {
  userId: string;
  createdTime: number;
  resumedTime: number;
  activityDuration: number;
  totalPausedTime?: number;
}

export const resumeActivityDb = ({
  userId,
  createdTime,
  resumedTime,
  activityDuration,
  totalPausedTime
}: ResumeActivityProps) => {
  return db
    .collection("userItems")
    .doc(userId)
    .collection("activities")
    .doc(`${createdTime}`)
    .update({
      isResumed: true,
      isPaused: false,
      resumedTime: resumedTime,
      activityDuration,
      totalPausedTime
    });
};

export interface PauseActivityProps {
  userId: string;
  createdTime: number;
  pausedTime: number;
  activityDuration: number;
}

export const pauseActivityDb = ({
  userId,
  createdTime,
  pausedTime,
  activityDuration,
}: PauseActivityProps) => {
  return db
    .collection("userItems")
    .doc(userId)
    .collection("activities")
    .doc(`${createdTime}`)
    .update({
      isPaused: true,
      isResumed: false,
      pausedTime: pausedTime,
      activityDuration,
    });
};


interface toggleDoneActivityProps {
  userId: string;
  createdTime: number;
  isDone: boolean;
}
export const setDoneActivityDb = ({
  userId,
  createdTime,
  isDone
}: toggleDoneActivityProps) => {
  return db
    .collection("userItems")
    .doc(userId)
    .collection("activities")
    .doc(`${createdTime}`)
    .update({
      isDone: !isDone
    });
};

interface UpdateActivityFieldProps {
  userId: string;
  createdTime: number;
  field: keyof TaskItemInfo;
  text: string;
}

export const updateActivityField = ({
  userId,
  createdTime,
  field,
  text
}: UpdateActivityFieldProps) => {
  return db
    .collection("userItems")
    .doc(userId)
    .collection("activities")
    .doc(`${createdTime}`)
    .update({ [field]: text });
};

export const completeActivity = ({
  userId,
  createdTime
}: PauseActivityProps) => {
  return db
    .collection("userItems")
    .doc(userId)
    .collection("activities")
    .doc(`${createdTime}`)
    .set({
      isCompleted: true
    });
};
export interface RemoveActivityProps {
  userId: string;
  createdTime: number;
}
export const removeActivity = ({
  userId,
  createdTime
}: RemoveActivityProps) => {
  return db
    .collection("userItems")
    .doc(userId)
    .collection("activities")
    .doc(`${createdTime}`)
    .delete()
    .then(() => ({ isDeleted: true }))
    .catch(e => {
      console.error("error in removing", e);
      return { isDeleted: false };
    });
};
