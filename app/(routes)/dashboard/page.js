'use client'
import React, { useEffect } from 'react'
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { app } from './confing/FirebaseConfing';
function Dashboard() {
  
  const db = getFirestore(app);
  const {user} = useKindeBrowserClient();

  useEffect(()=>{
    MeetingRegistered()
  },[user])
  const MeetingRegistered =async () => {
    

    const docRef = doc(db, "Meeting", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard