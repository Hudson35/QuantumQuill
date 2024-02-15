import Image from 'next/image'
import logo from '@/assets/quantumquill-logo-4.jpeg'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function Home() {
  const { userId } = auth();

  // if there's a user, redirect to notes page, else show home page
  if(userId) {
    redirect("/notes");
  }

  return (
    <main className="flex flex-col h-screen items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image 
          src={logo}
          alt="Quantum Quill logo"
          width={250}
          height={250}
        />
      </div>
      <p className="max-w-prose px-8 md:px-0 text-center font-medium">
        An intelligent note-taking app with AI powered search and integration. 
        Built with OpenAI, Pinecone, Next.js, Shadcn UI, Clerk, and more.
      </p>
      <Button asChild size="lg">
        <Link href="/notes">
          Open
        </Link>
      </Button>
    </main>
  )
}
