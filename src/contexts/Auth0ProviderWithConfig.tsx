import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Auth0ProviderWithConfigProps {
  children: ReactNode;
}

export const Auth0ProviderWithConfig = ({ children }: Auth0ProviderWithConfigProps) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = window.location.origin;

  const onRedirectCallback = (appState?: any) => {
    navigate(appState?.returnTo || '/dashboard');
  };

  if (!domain || !clientId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-destructive">Configuration Error</h1>
          <p className="text-muted-foreground">
            Auth0 credentials not found. Please add VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID to your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};
