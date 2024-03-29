import fs from "fs";
import path from "path";

// Adding export so that the functions can be called from other pages too
export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData); //string -> json object
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    data.push(newFeedback); //adding newFeedback
    fs.writeFileSync(filePath, JSON.stringify(data)); // json object -> string and then storing it

    res.status(201).json({
      message: "Success!",
      feedback: newFeedback,
    });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    res.status(200).json({
      feedback: data,
    });
  }
}

export default handler;
