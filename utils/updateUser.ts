import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase";



export const updateUser = async (points:any, score:any) => {
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
      const userRef:any = doc(db, "users", userDoc.id); // Get a reference to the user's document

      console.log('User found:', userDoc.data());
      console.log("points: ", points);
      // Update the user document
      await updateDoc(userRef, {
        points: userDoc.data()?.points + points, // Update the points field
        quiz:{
            score: userDoc.data().quiz?.score + score ,
        }
      });
      console.log('User data updated successfully:', userRef.id);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  
 
