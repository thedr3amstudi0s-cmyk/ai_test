// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDQ4tYhsn9AJH9hLnGmCIx6JM27UE6t0vU",
  authDomain: "ai-test-2d1aa.firebaseapp.com",
  projectId: "ai-test-2d1aa",
  storageBucket: "ai-test-2d1aa.firebasestorage.app",
  messagingSenderId: "871362478836",
  appId: "1:871362478836:web:f1e336fc53c306e6c794a1",
  measurementId: "G-VCLF6KTBH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Store conversation message
export async function storeMessage(role, content){
    await addDoc(collection(db,"conversation"), {role, content, timestamp: Date.now()});
}

// Get conversation history
export async function getConversation(){
    const q = query(collection(db,"conversation"), orderBy("timestamp"));
    const snapshot = await getDocs(q);
    let msgs = [];
    snapshot.forEach(doc => msgs.push(doc.data()));
    return msgs;
}

// Store memory fact
export async function learnFact(fact){
    const keywords = fact.toLowerCase().split(" ");
    await addDoc(collection(db,"memory"), {text: fact, keywords});
}

// Get memory facts
export async function getMemoryFacts(){
    const snapshot = await getDocs(collection(db,"memory"));
    let facts = [];
    snapshot.forEach(doc => facts.push(doc.data()));
    return facts;
}
