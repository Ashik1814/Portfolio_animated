"use client";

import { useEffect, useState } from "react";

// Singleton: one MutationObserver shared across all subscribers
let listenerCount = 0;
let observer: MutationObserver | null = null;
const subscribers = new Set<(isDark: boolean) => void>();

function getIsDark() {
  return document.documentElement.classList.contains("dark");
}

function notifyAll() {
  const dark = getIsDark();
  subscribers.forEach((fn) => fn(dark));
}

function addSubscriber(fn: (isDark: boolean) => void) {
  subscribers.add(fn);
  listenerCount++;
  if (!observer) {
    observer = new MutationObserver(notifyAll);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
}

function removeSubscriber(fn: (isDark: boolean) => void) {
  subscribers.delete(fn);
  listenerCount--;
  if (listenerCount === 0 && observer) {
    observer.disconnect();
    observer = null;
  }
}

/**
 * Shared dark-mode detector.
 * Uses a single MutationObserver across all consumers instead of one per component.
 */
export function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    addSubscriber(setIsDark);
    // Notify this subscriber immediately with current value
    setIsDark(getIsDark()); // eslint-disable-line react-hooks/set-state-in-effect
    return () => removeSubscriber(setIsDark);
  }, []);

  return isDark;
}
