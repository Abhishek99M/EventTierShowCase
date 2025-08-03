# Tier-Based Event Showcase

A full-stack web application that displays events to logged-in users based on their membership tier (Free, Silver, Gold, Platinum).

---

## ✨ Tech Stack

* **Frontend**: Next.js 14 (App Router)
* **Authentication**: Clerk.dev
* **Database**: Supabase (PostgreSQL)
* **Styling**: Tailwind CSS

---

## 🚀 Features

* User authentication with Clerk (Sign in, Sign up, User profile)
* Role-based access to events (based on tier)
* Events displayed in responsive card layout
* Tier-level logic (Gold users see Free+Silver+Gold, etc.)
* Dynamic data fetched from Supabase
* Admin can upgrade tiers via Clerk metadata

---

## 💼 Project Structure

```
/app
  /api
    /set-tier      -> API route to update user tier
  /events          -> Protected page for event listing
  layout.tsx       -> App layout with navbar
  page.tsx         -> Public landing page (Home)
/components
  navbar.tsx       -> Header with SignIn/SignOut
  EventCard.tsx
/utils
  /supabase
    client.ts      -> Supabase browser client
    server.ts      -> Supabase server client

.env.local         -> Environment variables
middleware.ts      -> Route protection using Clerk
```

---

## 📊 Supabase Setup

1. **Create a table `events`**:

```sql
CREATE TYPE tier_level AS ENUM ('free', 'silver', 'gold', 'platinum');

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  description TEXT,
  event_date TIMESTAMP,
  image_url TEXT,
  tier tier_level
);
```

2. **Seed sample data**:

```sql
INSERT INTO events (id, title, description, event_date, image_url, tier)
VALUES
  (uuid_generate_v4(), 'Free Yoga Class', 'Join us for yoga', '2025-08-10 09:00:00', 'supabase_url/yoga.png', 'free'),
  (uuid_generate_v4(), 'Coding Bootcamp', 'Learn JS basics', '2025-08-12 18:00:00', 'supabase_url/coding.png', 'silver'),
  (uuid_generate_v4(), 'Tech Trends', 'Tech 2025 insights', '2025-08-20 14:00:00', 'supabase_url/tech.png', 'silver'),
  (uuid_generate_v4(), 'Hackathon', 'Compete & win', '2025-08-25 11:00:00', 'supabase_url/hackathon.png', 'gold'),
  (uuid_generate_v4(), 'Gala Dinner', 'Meet industry leaders', '2025-08-30 20:00:00', 'supabase_url/gala.png', 'platinum');
```

---

## 🚪 Authentication & Access

* Authentication handled via Clerk.dev
* User tier stored in `publicMetadata` like:

```json
{
  "tier": "silver"
}
```

* Middleware protects routes under `/events`

---

## 🔗 Environment Variables

Add these to `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

---

## 🌎 Deployment (Vercel)

* Ensure `.env.local` values are added to Vercel dashboard
* Add `@clerk/clerk-sdk-node` for server-side tier updates

---

## ⚡ Bonus Features

* Display upgrade message for restricted events
* Button to simulate tier upgrade (using `/api/set-tier`)
* Supabase Storage used for event images

---

## 🎓 Learnings

* Clerk metadata manipulation
* Supabase integration (RLS optional)
* Server + client rendering hybrid

---

## ✅ Author

Abhishek Kumar
Built with passion for Psypher AI Task

---

## 👉 Want to Contribute?

Pull requests welcome!

---
