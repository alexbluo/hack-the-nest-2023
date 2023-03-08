import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface NextApiRequestType extends NextApiRequest {
  body: {
    email: string;
    password?: string;
  };
}

// create a new email/password, id, etc
const handler = async (req: NextApiRequestType, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password,
    },
  });

  res.json(user);
};

export default handler;
