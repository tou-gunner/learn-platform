'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Table from '@/components/ui/table';
import Link from 'next/link';

const CertificateStatus = ({ status }) => {
  const statusStyles = {
    'Issued': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Expired': 'bg-red-100 text-red-800'
  };

  return (
    <Badge className={statusStyles[status]}>
      {status}
    </Badge>
  );
};

const StudentCertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    // In a real application, fetch certificates from an API
    const fetchCertificates = async () => {
      // Simulating API call
      const response = await new Promise(resolve => setTimeout(() => resolve([
        { id: 1, course: "React Basics", issueDate: "2023-05-15", expiryDate: "2026-05-15", status: "Issued" },
        { id: 2, course: "Advanced JavaScript", issueDate: "2023-04-20", expiryDate: "2026-04-20", status: "Issued" },
        { id: 3, course: "Python for Data Science", issueDate: null, expiryDate: null, status: "Pending" },
        { id: 4, course: "Web Design Fundamentals", issueDate: "2020-06-10", expiryDate: "2023-06-10", status: "Expired" },
      ]), 1000));
      setCertificates(response);
    };

    fetchCertificates();
  }, []);

  const columns = [
    { header: "Course", accessor: "course" },
    { 
      header: "Issue Date", 
      accessor: "issueDate",
      cell: (certificate) => certificate.issueDate ? new Date(certificate.issueDate).toLocaleDateString() : 'N/A'
    },
    { 
      header: "Expiry Date", 
      accessor: "expiryDate",
      cell: (certificate) => certificate.expiryDate ? new Date(certificate.expiryDate).toLocaleDateString() : 'N/A'
    },
    { 
      header: "Status", 
      accessor: "status",
      cell: (certificate) => <CertificateStatus status={certificate.status} />
    },
  ];

  const actionButtons = (certificate) => (
    <>
      {certificate.status === 'Issued' && (
        <Button variant="outline" size="sm" onClick={() => handleDownload(certificate.id)}>
          Download
        </Button>
      )}
      {certificate.status === 'Issued' && (
        <Button variant="outline" size="sm" className="ml-2" onClick={() => handleShare(certificate.id)}>
          Share
        </Button>
      )}
    </>
  );

  const handleDownload = (certificateId) => {
    // In a real application, this would trigger the certificate download
    console.log(`Downloading certificate ${certificateId}`);
  };

  const handleShare = (certificateId) => {
    // In a real application, this would open a sharing dialog
    console.log(`Sharing certificate ${certificateId}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Certificates</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Earned Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table 
            columns={columns}
            data={certificates}
            onAction={actionButtons}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certificate Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Certificates</p>
              <p className="text-2xl font-bold">{certificates.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Issued</p>
              <p className="text-2xl font-bold">{certificates.filter(c => c.status === 'Issued').length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold">{certificates.filter(c => c.status === 'Pending').length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Link href="/dashboard/student/courses">
          <Button variant="outline">Back to Courses</Button>
        </Link>
      </div>
    </div>
  );
};

export default StudentCertificatesPage;