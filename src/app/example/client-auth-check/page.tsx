'use client';

// This page for checking authentication on client component

import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';

export default function ClientPage() {
  const { data: session } = useSession();
  // required: true,
  // onUnauthenticated() {
  //   redirect('/api/auth/signin?callbackUrl=/client');
  // },

  return <div>Client auth check Session : {JSON.stringify(session)}</div>;
}
