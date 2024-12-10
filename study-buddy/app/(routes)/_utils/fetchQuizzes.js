import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const fetchQuizzes = async () => {
  try {
    const quizCollectionRef = collection(db, "quizes"); // Reference to your 'quizes' collection
    const querySnapshot = await getDocs(quizCollectionRef); // Fetch all documents from the collection

    const quizzes = [];
    querySnapshot.forEach((doc) => {
      quizzes.push({ id: doc.id, ...doc.data() }); // Push document ID along with the data
    });

    console.log("Fetched quizzes: ", quizzes);
    return quizzes;
  } catch (error) {
    console.error("Error fetching quizzes: ", error);
    return [];
  }
};

export default fetchQuizzes;
