"use client";

import { useSyncExternalStore } from "react";
import { EXPEDITION_SESSION_KEY, INITIAL_EXPEDITION_PROGRESS } from "@/lib/expeditions/progress";
import type { ExpeditionDefinition, ExpeditionProgress } from "@/lib/expeditions/types";

const PROGRESS_EVENT = "rowform-expedition-progress";
let cachedRaw: string | null = null;
let cachedProgress = INITIAL_EXPEDITION_PROGRESS;

function subscribe(callback: () => void) {
  window.addEventListener(PROGRESS_EVENT, callback);
  return () => window.removeEventListener(PROGRESS_EVENT, callback);
}

function getSnapshot() {
  const raw = window.sessionStorage.getItem(EXPEDITION_SESSION_KEY);
  if (raw === cachedRaw) return cachedProgress;
  cachedRaw = raw;
  if (!raw) return (cachedProgress = INITIAL_EXPEDITION_PROGRESS);
  try { return (cachedProgress = JSON.parse(raw) as ExpeditionProgress); } catch { return (cachedProgress = INITIAL_EXPEDITION_PROGRESS); }
}

export function useExpeditionProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, () => INITIAL_EXPEDITION_PROGRESS);

  function update(next: ExpeditionProgress) {
    window.sessionStorage.setItem(EXPEDITION_SESSION_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  }

  function startExpedition(expedition: ExpeditionDefinition) {
    if (progress.activeSlug && progress.activeSlug !== expedition.slug) {
      const confirmed = window.confirm(`Switch from ${progress.activeSlug} to ${expedition.name}? New workouts will contribute only to the new active Expedition. Existing progress will be kept.`);
      if (!confirmed) return false;
    }
    update({ ...progress, activeSlug: expedition.slug, distanceBySlug: { ...progress.distanceBySlug, [expedition.slug]: progress.distanceBySlug[expedition.slug] ?? 0 } });
    return true;
  }

  return { progress, startExpedition };
}
