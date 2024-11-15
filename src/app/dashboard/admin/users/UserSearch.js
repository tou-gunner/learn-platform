'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

export default function UserSearch() {
  const router = useRouter();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    router.push(`/dashboard/admin/users${searchTerm ? `?search=${searchTerm}` : ''}`);
  };

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search users..."
        onChange={handleSearch}
      />
    </div>
  );
}