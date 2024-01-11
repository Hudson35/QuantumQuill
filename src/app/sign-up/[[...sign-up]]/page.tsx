import { SignUp } from "@clerk/nextjs";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quantum Quill - Sign Up',
}

export default function SignUpPage() {
  return (
    <div className="flex flex-row h-screen items-center justify-center">
      <SignUp appearance={{ variables: { colorPrimary: "#0F172A" } }} />
    </div>
  )
}