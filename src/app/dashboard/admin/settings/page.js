'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SettingsForm from './SettingsForm';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminSettingsPage() {
  // In a real application, you would fetch the current settings from your API
  const currentSettings = {
    general: {
      siteName: 'My E-Learning Platform',
      siteDescription: 'A platform for online learning',
      contactEmail: 'contact@example.com',
    },
    email: {
      smtpServer: 'smtp.example.com',
      smtpPort: '587',
      smtpUsername: 'user@example.com',
      smtpPassword: '********',
    },
    payment: {
      paymentGateway: 'stripe',
      stripePublicKey: 'pk_test_...',
      stripeSecretKey: 'sk_test_...',
    },
    appearance: {
      primaryColor: '#007bff',
      secondaryColor: '#6c757d',
      logo: '/path/to/logo.png',
    },
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Admin Settings</h1>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardContent>
              <SettingsForm 
                settingsType="general"
                initialSettings={currentSettings.general}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardContent>
              <SettingsForm 
                settingsType="email"
                initialSettings={currentSettings.email}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardContent>
              <SettingsForm 
                settingsType="payment"
                initialSettings={currentSettings.payment}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardContent>
              <SettingsForm 
                settingsType="appearance"
                initialSettings={currentSettings.appearance}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}