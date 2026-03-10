// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase config
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

// Firestore instance
const db = getFirestore(app);

// Function to teach the AI a new fact
export async function learnFact(fact) {
    const keywords = fact.toLowerCase().split(" ");
    await addDoc(collection(db, "knowledge"), { text: fact, keywords: keywords });
}

// Function to get the AI's answer based on stored knowledge
export async function getAnswer(message) {
    const words = message.toLowerCase().split(" ");
    let answer = "I don't know yet.";

    const snapshot = await getDocs(collection(db, "knowledge"));

    snapshot.forEach(doc => {
        const data = doc.data();
        for (const k of data.keywords) {
            if (words.includes(k)) {
                answer = data.text;
            }
        }
    });

    return answer;
}
