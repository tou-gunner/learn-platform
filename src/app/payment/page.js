'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PaymentPage = () => {
  const { data: session } = useSession();
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Here you would integrate with a payment processor like Stripe
      // For this example, we'll just simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to a success page or back to the user's dashboard
      router.push('/dashboard/student');
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) {
        router.push('/auth/login');
        return;
    }
  });

  return (
    <div className="container mx-auto py-12 max-w-md">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Payment Details</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={cardDetails.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Card Number</label>
                <Input
                  id="number"
                  name="number"
                  type="text"
                  required
                  value={cardDetails.number}
                  onChange={handleChange}
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <Input
                    id="expiry"
                    name="expiry"
                    type="text"
                    placeholder="MM/YY"
                    required
                    value={cardDetails.expiry}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                  <Input
                    id="cvc"
                    name="cvc"
                    type="text"
                    required
                    value={cardDetails.cvc}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : 'Pay Now'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentPage;