import { writeData } from "../_utils/database";

export default async function handler(req, res) {
  if (req.body === "POST") {
    const { path, data } = req.body;
    try {
      await writeData(path, data);
      res
        .status(200)
        .json({ success: true, message: "Data written successfully" });
    } catch (error) {}
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
