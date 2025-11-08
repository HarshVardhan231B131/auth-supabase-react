import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Database, ArrowRight, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    loginWithRedirect();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Shield className="h-4 w-4" />
            Enterprise-Grade Security
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Secure Authentication
            <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
              Made Simple
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience seamless authentication powered by Auth0 with automatic user data synchronization to Supabase. 
            Built with React, secured by design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={handleLogin}
              className="shadow-elegant hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleLogin}
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
            >
              <Lock className="mr-2 h-5 w-5" />
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Auth0 Integration</CardTitle>
                <CardDescription className="text-base">
                  Industry-leading authentication with OAuth 2.0, social logins, and MFA support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Supabase Sync</CardTitle>
                <CardDescription className="text-base">
                  Automatic user data synchronization with Row-Level Security for data protection.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Protected Routes</CardTitle>
                <CardDescription className="text-base">
                  Secure route protection with automatic redirects and session management.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-elegant border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl">What You Get</CardTitle>
              <CardDescription>Production-ready authentication in minutes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Secure by Default</h3>
                  <p className="text-muted-foreground">Enterprise-grade security with Auth0's proven infrastructure</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Auto-Sync Users</h3>
                  <p className="text-muted-foreground">User profiles automatically synced to Supabase on login</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Clean Architecture</h3>
                  <p className="text-muted-foreground">Modular, extensible code ready for your customizations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">RLS Protection</h3>
                  <p className="text-muted-foreground">Row-Level Security ensures users only access their own data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
