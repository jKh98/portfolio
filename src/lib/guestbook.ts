import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION = "guestbook";
const MAX_ENTRIES = 100;

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

interface FirestoreGuestbookDoc {
  name: string;
  message: string;
  createdAt: ReturnType<typeof serverTimestamp>;
}

/**
 * Add a guestbook entry to Firestore.
 */
export async function addGuestbookEntry(
  name: string,
  message: string,
): Promise<void> {
  const data: FirestoreGuestbookDoc = {
    name,
    message,
    createdAt: serverTimestamp(),
  };
  await addDoc(collection(db, COLLECTION), data);
}

/**
 * Subscribe to real-time guestbook entries, newest first.
 * Returns an unsubscribe function.
 */
export function subscribeToGuestbook(
  callback: (entries: GuestbookEntry[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc"),
    limit(MAX_ENTRIES),
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const entries: GuestbookEntry[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name ?? "Anonymous",
          message: data.message ?? "",
          timestamp: data.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
        };
      });
      callback(entries);
    },
    (error) => {
      onError?.(error);
    },
  );
}
