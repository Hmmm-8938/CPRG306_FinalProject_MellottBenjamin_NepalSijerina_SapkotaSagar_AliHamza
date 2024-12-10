const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateData = async (quizDetails) => {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `This is the lecture details ${quizDetails.lectureDetails} that I want to get quiz for now you have to Generate a JSON object based on the following instructions:
  1. The JSON should contain an array of questions.
  2. Each question should have a "question" field (string), "options" field (array of strings), "correctAnswer" field (string), and "explanation" field (string).
  3. Do not include any code block markers (e.g., \`\`\`json at the start and \`\`\` at the end).
  4. The structure should look like this:
      [
        {
          "question1": "What is a JSON object?",
          "options": [
            "A sequence of key-value pairs.",
            "A type of computer programming language.",
            "A data structure used for representing information in a structured format.",
            "A method for encrypting data for secure transmission."
          ],
          "correctAnswer": "A data structure used for representing information in a structured format.",
          "explanation": "Explain why it is the correct answer."
        },
        {
        "question2": "What is a JSON object?",
          "options": [
            "A sequence of key-value pairs.",
            "A type of computer programming language.",
            "A data structure used for representing information in a structured format.",
            "A method for encrypting data for secure transmission."
          ],
          "correctAnswer": "Provdie the correct answer here",
          "explanation": "Explain why it is the correct answer."
        }
      ]
     5. Provide as many questions as possible for the given amount of text have at least 5 or more!   
      `;
  console.log(quizDetails);
  const result = await model.generateContent(prompt);
  let responseText = result.response.text();

  console.log(responseText);
  try {
    // Parse the cleaned response text into a JSON object
    const responseJson = JSON.parse(responseText);
    return responseJson; // Return the JSON object
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null; // Return null if there's an error parsing the JSON
  }
};

module.exports = generateData;
