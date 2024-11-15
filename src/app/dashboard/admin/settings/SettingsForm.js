'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function SettingsForm({ settingsType, initialSettings }) {
  const [formData, setFormData] = useState(initialSettings);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`${settingsType} settings updated:`, formData);
      setSuccess('Settings updated successfully!');
    } catch (err) {
      setError('Failed to update settings. Please try again.');
    }
  };

  const renderFields = () => {
    return Object.entries(formData).map(([key, value]) => (
      <div key={key}>
        <label htmlFor={key} className="block text-sm font-medium text-gray-700">
          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
        </label>
        <Input
          id={key}
          name={key}
          type={key.toLowerCase().includes('password') ? 'password' : 'text'}
          required
          value={value}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{settingsType.charAt(0).toUpperCase() + settingsType.slice(1)} Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {renderFields()}
          </div>
          <div className="mt-6">
            <Button type="submit" className="w-full">
              Save Settings
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
        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}