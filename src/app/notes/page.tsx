import prisma from '@/lib/db/prisma';
import { auth } from '@clerk/nextjs';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quantum Quill - Notes',
}

export default async function NotesPage() {

  const { userId } = auth();

  // userId should never be null, because we have our middleware that prohibits this from occurring, but just in case, throw an error
  if(!userId) throw Error('userId undefined');

  // if(typeof userId === null) throw Error('invalid username')

  // Get all the notes for the user
  const allNotes = await prisma.note.findMany({
    where: {
      userId
    }
  });

  return (
    <>
      {
        allNotes.length > 0 ? (<div>{JSON.stringify(allNotes)}</div>) : "No notes found"
      }
    
    </>
    
  )
}

