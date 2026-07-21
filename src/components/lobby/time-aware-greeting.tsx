"use client";

import { useSyncExternalStore } from "react";

function greetingForHour(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function TimeAwareGreeting({ name }: { name: string }) {
  const greeting = useSyncExternalStore(
    (onStoreChange) => {
      const interval = window.setInterval(onStoreChange, 60_000);
      return () => window.clearInterval(interval);
    },
    () => greetingForHour(new Date().getHours()),
    () => "Welcome back",
  );

  return <>{greeting}, {name}.</>;
}
