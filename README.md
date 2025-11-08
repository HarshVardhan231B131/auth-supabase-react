# Auth0 + Supabase Integration

A production-ready React application demonstrating secure authentication with Auth0 and automatic user data synchronization to Supabase.

## 🚀 Features

- **Auth0 Authentication**: Enterprise-grade security with OAuth 2.0
- **Supabase Sync**: Automatic user data synchronization with Row-Level Security
- **Protected Routes**: Secure route protection with automatic redirects
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## 🏗️ Tech Stack

- **Frontend**: React 18 + Vite
- **Authentication**: Auth0
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + shadcn/ui
- **Type Safety**: TypeScript
- **State Management**: TanStack Query

## 📋 Prerequisites

1. **Auth0 Account**: Sign up at [auth0.com](https://auth0.com)
2. **Lovable Cloud**: Enabled automatically in this project (Supabase backend)

## ⚙️ Setup Guide

### 1. Auth0 Configuration

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a new Application (Single Page Application)
3. Configure the following settings:
   - **Allowed Callback URLs**: `http://localhost:8080, https://your-app-url.com`
   - **Allowed Logout URLs**: `http://localhost:8080, https://your-app-url.com`
   - **Allowed Web Origins**: `http://localhost:8080, https://your-app-url.com`

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

**Note**: Supabase credentials are auto-configured via Lovable Cloud.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:8080` to see your app!

## 🔐 How It Works

### Authentication Flow

1. User clicks "Sign In" → Redirected to Auth0
2. After successful Auth0 login → Redirected back to app
3. User data automatically synced to Supabase `users` table
4. Protected routes only accessible when authenticated

### User Data Sync

The `useSupabaseSync` hook automatically:
- Upserts user data to Supabase on login
- Updates profile information (name, email, picture)
- Maintains Auth0 user ID for correlation

### Database Schema

```sql
CREATE TABLE public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth0_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  picture TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Row-Level Security (RLS)

RLS policies ensure:
- Users can only view their own data
- Users can only update their own data
- Auto-insert allowed for new users

## 📁 Project Structure

```
src/
├── components/
│   ├── ProtectedRoute.tsx    # Route protection wrapper
│   └── ui/                    # shadcn/ui components
├── contexts/
│   └── Auth0ProviderWithConfig.tsx  # Auth0 provider setup
├── hooks/
│   └── useSupabaseSync.ts     # Auto-sync Auth0 → Supabase
├── pages/
│   ├── Index.tsx              # Landing page
│   ├── Dashboard.tsx          # Protected dashboard
│   └── NotFound.tsx           # 404 page
└── integrations/
    └── supabase/              # Auto-generated Supabase client
```

## 🔑 Key Components

### Auth0ProviderWithConfig
Wraps the app with Auth0 context, handles redirects after login.

### ProtectedRoute
Higher-order component that protects routes from unauthenticated access.

### useSupabaseSync
Custom hook that automatically syncs Auth0 user data to Supabase on login.

## 🎨 Customization

### Design System
All colors and styles are defined in:
- `src/index.css` - CSS custom properties
- `tailwind.config.ts` - Tailwind theme configuration

### Adding New Protected Routes

```tsx
<Route 
  path="/your-route" 
  element={
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  } 
/>
```

## 🚢 Deployment

This app is ready to deploy to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting service

**Important**: Update Auth0 callback URLs with your production domain.

## 📚 Documentation

- [Auth0 React SDK](https://auth0.com/docs/quickstart/spa/react)
- [Supabase Documentation](https://supabase.com/docs)
- [Lovable Cloud Features](https://docs.lovable.dev/features/cloud)

## 🔒 Security Best Practices

✅ Row-Level Security enabled on all tables  
✅ Auth0 tokens validated on every request  
✅ Secure environment variable handling  
✅ Protected routes with automatic redirects  
✅ HTTPS enforced in production  

## 🐛 Troubleshooting

### "Configuration Error" message
- Ensure `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` are set in `.env`

### Login redirects to wrong URL
- Update callback URLs in Auth0 Dashboard settings

### User not syncing to Supabase
- Check browser console for errors
- Verify RLS policies in Supabase

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using [Lovable](https://lovable.dev)
