// components/EventCard.tsx
import React from "react";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  image: string;
  tier: string;
}

const tierColors: Record<string, string> = {
  free: "bg-green-200 text-green-800",
  silver: "bg-gray-200 text-gray-800",
  gold: "bg-yellow-200 text-yellow-800",
  platinum: "bg-purple-200 text-purple-800",
};

export default function EventCard({
  title,
  description,
  date,
  image,
  tier,
}: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-200 p-4">
      <img
        src={image}
        alt={title}
        className="rounded mb-3 w-full h-40 object-cover"
      />
      <h2 className="text-xl font-bold mb-1">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-gray-400 mb-3">📅 {new Date(date).toLocaleString()}</p>
      <span className={`text-xs font-semibold px-2 py-1 rounded ${tierColors[tier]}`}>
        {tier.toUpperCase()}
      </span>
    </div>
  );
}
