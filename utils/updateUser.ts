import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import { fetchDoc } from "./getUser";
import { auth, db } from "../firebase";


export const updateUser = async (points:any, score:any ) => { 
    
   const user:any = await fetchDoc();
   console.log("fetche: ", user)

   if(!user) return;
    
    const q:any = query(collection(db, "users"), where("email", "==", auth.currentUser?.email));
    const userRef = doc(db, "users", q);
    if(!userRef) return;
    await updateDoc(userRef, {
        points: user?.quiz.points  + points,
        score: user?.quiz.score + score,
    });
    console.log("User updated in Database: ", user)

}