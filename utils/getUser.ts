import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

export const fetchDoc =async () =>{
    console.log("inside");

    try {
      const q = query(collection(db, "users"), where("email", "==", auth.currentUser?.email));
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
       
        // doc.data() is never undefined for query doc snapshots
        console.log("User saved to Database: ", doc.data())
        return doc.data()
       
      });
     
    } catch (error) {
        console.log("error")
    }
   
  }