import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });
}

const db = admin.firestore();

async function checkPuzzles() {
  console.log("Checking daily_puzzles...");
  const snapshot = await db.collection("daily_puzzles").orderBy("created_at", "desc").limit(5).get();
  
  if (snapshot.empty) {
    console.log("No puzzles found.");
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`- [${data.type}] Tag: ${data.tag}, ID: ${doc.id}, Created: ${data.created_at?.toDate()}`);
    if (data.type === "minesweeper") {
      console.log("  Minesweeper map rows:", data.data?.mineMap?.length);
      if (data.data?.mineMap) {
         console.log("  Minesweeper row 0 length:", data.data.mineMap[0]?.length);
      }
    }
  });
}

checkPuzzles();
