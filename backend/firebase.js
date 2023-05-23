import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCDFJJp_qo4Q8-gP77AnWyRhQGAuLh6UGw",
    authDomain: "embeddedlab-prj.firebaseapp.com",
    databaseURL:
        "https://embeddedlab-prj-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "embeddedlab-prj",
    storageBucket: "embeddedlab-prj.appspot.com",
    messagingSenderId: "286321233905",
    appId: "1:286321233905:web:066f2d19fbd617756efe50",
    measurementId: "G-7630Y1EETT",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function fetchData() {
    const snapshot = await getDocs(collection(db, "data"));
    const newData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return newData;
}
