'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'

export default function ClientHeader() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="ml-10 space-x-4">
      {session ? (
        <>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </>
      ) : (
        <>
          <Link href="/auth/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
    </div>
  )
}