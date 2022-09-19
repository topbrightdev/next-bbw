import { NextApiRequest, NextApiResponse } from "next";

function asyncWrapper(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res);
    } catch (err: any) {
      if (err === "NOT_FOUND") {
        return res.status(404).json({
          error: {
            code: "not_found",
            message: "The requested endpoint was not found or doesn't support this method.",
          },
        });
      } else if (err === "UNAUTHORIZED") {
        return res.status(403).json({
          error: {
            code: "unauthorized",
            message: "You are not authorized to perform this action.",
          },
        });
      } else {
        return res.status(500).send(JSON.stringify(err, Object.getOwnPropertyNames(err), 4));
      }
    }
  };
}

export default asyncWrapper;
