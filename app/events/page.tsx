import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@/utils/supabase/server";
import EventCard from "@/components/EventCard";

const tierPriority: Record<string, number> = {
  free: 1,
  silver: 2,
  gold: 3,
  platinum: 4,
};

export default async function EventsPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Please sign in to view events.
      </div>
    );
  }

  const userTier = (user.publicMetadata.tier as string) || "free";
  const supabase = await createClient();

  const { data: allEvents, error } = await supabase.from("events").select("*");

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error loading events. Please try again later.
      </div>
    );
  }

  const accessibleEvents = allEvents?.filter(
    (event) => tierPriority[event.tier] <= tierPriority[userTier]
  );

  const lockedEvents = allEvents?.filter(
    (event) => tierPriority[event.tier] > tierPriority[userTier]
  );

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.firstName}!</h1>
      <p className="text-gray-600 mb-6">
        You are currently in the <strong>{userTier.toUpperCase()}</strong> tier.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Accessible Events:</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {accessibleEvents?.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            description={event.description}
            date={event.event_date}
            image={event.image_url}
            tier={event.tier}
          />
        ))}
      </div>

      {lockedEvents?.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-10 mb-3">Locked Events:</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lockedEvents.map((event) => (
              <div key={event.id} className="opacity-50 relative">
                <EventCard
                  title={event.title}
                  description={event.description}
                  date={event.event_date}
                  image={event.image_url}
                  tier={event.tier}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-medium rounded">
                  Upgrade to {event.tier.toUpperCase()} to access
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
