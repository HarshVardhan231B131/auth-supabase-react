import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Shield, Database, User } from 'lucide-react';
import { useSupabaseSync } from '@/hooks/useSupabaseSync';

const Dashboard = () => {
  const { user, logout } = useAuth0();
  useSupabaseSync();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Dashboard
            </h1>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* User Profile Card */}
          <Card className="shadow-elegant border-border/40">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-primary/20">
                  <AvatarImage src={user?.picture} alt={user?.name || 'User'} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user?.name || 'Welcome'}</CardTitle>
                  <CardDescription className="text-base">{user?.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Auth0 Secured</CardTitle>
                <CardDescription>
                  Your authentication is powered by Auth0's enterprise-grade security.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <Database className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Supabase Sync</CardTitle>
                <CardDescription>
                  User data automatically synced to Supabase with RLS protection.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <User className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Protected Routes</CardTitle>
                <CardDescription>
                  Access control ensures only authenticated users can view this page.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* User Info Card */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Data synced from Auth0</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border/40">
                  <dt className="font-medium text-muted-foreground">User ID</dt>
                  <dd className="font-mono text-sm">{user?.sub}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-border/40">
                  <dt className="font-medium text-muted-foreground">Email</dt>
                  <dd>{user?.email}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-border/40">
                  <dt className="font-medium text-muted-foreground">Email Verified</dt>
                  <dd>{user?.email_verified ? '✓ Yes' : '✗ No'}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="font-medium text-muted-foreground">Last Updated</dt>
                  <dd>{user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
