import { readData } from "../_utils/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { path } = req.query;

    try {
      const data = await readData(path);
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
