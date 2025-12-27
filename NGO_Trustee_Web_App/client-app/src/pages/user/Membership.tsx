import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { membershipTypes } from '@/data/mockData';
import { Check, CreditCard } from 'lucide-react';

const UserMembership = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Membership</h1>
      <Card variant="premium" className="overflow-hidden">
        <div className="p-6 gradient-hero text-primary-foreground">
          <Badge variant="glass" className="bg-primary-foreground/20 border-0 mb-2">Current Plan</Badge>
          <h2 className="text-2xl font-bold">Premium Membership</h2>
          <p className="opacity-80">Valid until December 31, 2024</p>
        </div>
      </Card>
      <h2 className="text-xl font-semibold">Upgrade Plans</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {membershipTypes.map((m) => (
          <Card key={m.id} variant="glass">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{m.name}</h3>
              <p className="text-3xl font-bold mb-1">₹{m.price.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mb-4">{m.duration}</p>
              <ul className="space-y-2 mb-6">
                {m.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-success" />{b}</li>
                ))}
              </ul>
              <Button variant={m.name === 'Premium' ? 'premium' : 'outline'} className="w-full">
                {m.name === 'Premium' ? 'Current Plan' : 'Choose Plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </DashboardLayout>
);
export default UserMembership;
