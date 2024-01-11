import type { Metadata } from 'next'
import NavBar from './NavBar';

export const metadata: Metadata = {
  title: 'Quantum Quill',
  description: 'The intelligent note-taking app',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
    <NavBar />
    <main className="p-4 max-w-7xl m-auto">{children}</main>
  </>
}