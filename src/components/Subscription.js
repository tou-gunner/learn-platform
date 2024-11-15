import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Subscription = ({ currentPlan, onUpgrade }) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Your Subscription</h2>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Current Plan: <strong>{currentPlan}</strong></p>
        {currentPlan !== 'Enterprise' && (
          <p className="text-sm text-gray-600">
            Upgrade your plan to access more features and courses!
          </p>
        )}
      </CardContent>
      <CardFooter>
        {currentPlan !== 'Enterprise' && (
          <Button onClick={onUpgrade}>Upgrade Plan</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Subscription;