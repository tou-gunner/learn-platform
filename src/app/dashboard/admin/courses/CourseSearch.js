'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

export default function CourseSearch() {
  const router = useRouter();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    router.push(`/dashboard/admin/courses${searchTerm ? `?search=${searchTerm}` : ''}`);
  };

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search courses..."
        onChange={handleSearch}
      />
    </div>
  );
}