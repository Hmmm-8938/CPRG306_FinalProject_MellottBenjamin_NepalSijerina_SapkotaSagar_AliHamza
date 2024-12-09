import { ref, set,get } from "firebase/database";
import { db } from "../firebase";

export async function writeData(path, data) {
  try {
    await set(ref(db, path), data);
    console.log("Data written successfully");
  } catch (error) {
    console.error("Error writing to database:", error);
  }
}

export async function readData(path) {
  try {
    const snapshot = await get(ref(db, path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error reading from database:", error);
  }
}
