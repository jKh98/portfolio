import { logEvent, setUserProperties } from "firebase/analytics";
import { analyticsPromise } from "./firebase";

/**
 * Log a custom event to Firebase Analytics.
 * Silently no-ops if analytics is unavailable.
 */
export async function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
): Promise<void> {
  try {
    const analytics = await analyticsPromise;
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  } catch {
    // Analytics blocked or unavailable -- silently ignore
  }
}

/**
 * Set user properties for segmentation in Firebase Analytics.
 */
export async function setUserProps(
  props: Record<string, string | number | boolean>,
): Promise<void> {
  try {
    const analytics = await analyticsPromise;
    if (analytics) {
      setUserProperties(analytics, props);
    }
  } catch {
    // Silently ignore
  }
}
