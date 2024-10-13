import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchDoc =async () =>{
  const usersCollection = collection(db, "users"); // Reference to the users collection
  const q = query(usersCollection, where("email", "==", auth.currentUser?.email)); // Create a query to find the user by email

  try {
    const querySnapshot = await getDocs(q); // Execute the query

    if (querySnapshot.empty) {
      console.log('No user found with this email:', auth.currentUser?.email);
      return;
    }

    // Assuming emails are unique, get the first document
    const userDoc = querySnapshot.docs[0];

    console.log('User found:', userDoc.data());
    const jsonValue = JSON.stringify(userDoc.data());
    await AsyncStorage.setItem('user', jsonValue);
    return userDoc.data();
    
    
  } catch (error) {
    console.error('Error updating user data:', error);
  }
   
  }