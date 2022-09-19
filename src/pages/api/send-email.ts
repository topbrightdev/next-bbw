import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../utils/sendEmail";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { subject, receiver, message } = req.body;
      await sendEmail({ subject, message, receiver });
      return res.status(200).send("Message sent successfully.");
    } catch (error) {
      console.error(error);
      return res.status(400).send(JSON.stringify(error));
    }
  }

  return res.status(404).json({
    error: {
      code: "not_found",
      message: "The requested endpoint was not found or doesn't support this method.",
    },
  });
};

export default handler;
