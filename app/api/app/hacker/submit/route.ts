import { HackerApp } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ServerClient } from "postmark";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { prisma } from "db";

interface NextApiRequestType extends NextApiRequest {
  body: { data: HackerApp };
}

export const POST = async (req: NextApiRequestType) => {
  const session = await getServerSession(authOptions);
  const { email } = session!.user;

  // TODO: change status
  const app = await prisma.hackerApp.upsert({
    where: {
      userEmail: email,
    },
    update: {
      ...req.body.data,
      userEmail: email,
    },
    create: {
      ...req.body.data,
      userEmail: email,
    },
  });

  const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

  client.sendEmailWithTemplate({
    From: "hello@hackthenest.org",
    To: email,
    TemplateAlias: "hackerConfirmation",
    TemplateModel: {
      name: app.firstName,
      email: app.userEmail,
    },
    MessageStream: "outbound",
    TrackOpens: true,
  });

  return NextResponse.json(app);
};
