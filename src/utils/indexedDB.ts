import { openDB } from "idb";

const DB_NAME = "quizAppDB";
const STORE_NAME = "quizHistory";

// Initialize IndexedDB
async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

// Save quiz history
export async function saveQuizHistory(entry: { date: string; score: number }) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.add(entry);
  await tx.done;
}

// Get all quiz history
export async function getQuizHistory() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}
