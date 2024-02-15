import prisma from "@/lib/db/prisma";
import { createNoteSchema } from "@/lib/validation/note";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = createNoteSchema.safeParse(body);

    // if the validation failed, if parserResult is not successful
    if(!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, {status: 400}); // status code 400 means bad request
    }

    const {title, content} = parseResult.data;

    const { userId } = auth();

    // if the user is not logged in, userId will be unauthenticated
    if(!userId) {
      return Response.json({ error: "Unauthorized" }, {status: 401});
    }

    // we now know we have a valid title, content and user (aka userId). Everything we need to create a new note
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    }); 

    return Response.json({note}, {status: 201}); // status code 201 means created

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, {status: 500}); // status code 500 means internal server error
  }
}