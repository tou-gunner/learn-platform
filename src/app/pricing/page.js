'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: 9.99,
      annualPrice: 99.99,
      features: ['Access to 10 courses', 'Basic support', 'No ads'],
    },
    {
      name: 'Pro',
      monthlyPrice: 19.99,
      annualPrice: 199.99,
      features: ['Access to all courses', 'Priority support', 'No ads', 'Downloadable content'],
    },
    {
      name: 'Enterprise',
      monthlyPrice: 49.99,
      annualPrice: 499.99,
      features: ['Access to all courses', '24/7 support', 'No ads', 'Downloadable content', 'Custom learning paths'],
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
      <div className="flex justify-center items-center mb-8">
        <span className="mr-2">Monthly</span>
        <Switch
          checked={isAnnual}
          onChange={setIsAnnual}
        />
        <span className="ml-2">Annual (Save 20%)</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <h2 className="text-2xl font-bold">{plan.name}</h2>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-3xl font-bold mb-4">
                ${isAnnual ? plan.annualPrice.toFixed(2) : plan.monthlyPrice.toFixed(2)}
                <span className="text-sm font-normal">/{isAnnual ? 'year' : 'month'}</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Choose Plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;