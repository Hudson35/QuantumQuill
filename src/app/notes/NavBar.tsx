"use client"

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/quantumquill-logo-4.jpeg"
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddNoteDialog from "@/components/AddNoteDialog";
import { useState } from "react";

export default function NavBar() {

  const [showAddNoteDialog, setShowAddNoteDialog] = useState<boolean>(false);

  return (
    <>
      <div className="px-4 shadow">
        <div className="max-w-7xl flex flex-col sm:flex-row gap-3 items-center justify-between m-auto">
          <Link href="/notes" className="flex items-center gap-1">
            <Image src={logo} width={100} height={100} alt="Quantum Quill logo" />
            {/* <span className="font-bold">QuantumQuill</span> */}
          </Link>
          <div className="flex items-center gap-2">
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: { avatarBox: {width: "2.5rem", height: "2.5rem"} }
              }}
            />
            <Button onClick={() => setShowAddNoteDialog(true)}>
              <Plus size={20} className="mr-2" />
              Add Note
            </Button>
          </div>
        </div>
      </div>
      <AddNoteDialog open={showAddNoteDialog} setOpen={setShowAddNoteDialog}/>
    </>
  )
}