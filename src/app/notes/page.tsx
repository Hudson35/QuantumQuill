import Note from '@/components/Note';
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {/* {
          allNotes.length > 0 ? (<div>{JSON.stringify(allNotes)}</div>) : "No notes found"
        } */}
        
        {
          allNotes.map((note) => {
            return (
              <Note key={note.id} note={note} />
            )
          })
        }
        {
          allNotes.length === 0 && (
            <div className="w-full col-span-full text-center">
              <h1 className="text-2xl font-bold">{"You don't have any notes. Try creating your first note!"}</h1>
            </div>
          )
        }
      </div>
    </>
    
  )
}

