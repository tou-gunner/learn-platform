
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const AuthCheck = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/auth/login');
    return null;
  }

  return children;
};
  