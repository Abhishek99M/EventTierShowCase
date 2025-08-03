import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
      <div className="max-w-2xl text-center space-y-6 mt-[-10rem]">
        <h1 className="text-5xl font-extrabold leading-tight">
          Welcome to <span className="text-yellow-300">TierEvent</span> Showcase
        </h1>
        <p className="text-lg text-gray-100">
          Discover and access events curated for your membership tier. 
          Log in to explore what’s available for Free, Silver, Gold, or Platinum users.
        </p>
        {/* 🎯 Explore Events Button */}
        <Link href="/events">
          <button className="mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
            Explore Events
          </button>
        </Link>
      </div>
    </main>
  );
}
