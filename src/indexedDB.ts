
import { openDB } from 'idb';

const dbPromise = openDB('my-database', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('files')) {
      db.createObjectStore('files');
    }
  },
});

export async function setFile(key: string, file: Blob) {
  const db = await dbPromise;
  await db.put('files', file, key);
}

export async function getFile(key: string): Promise<Blob | undefined> {
  const db = await dbPromise;
  return db.get('files', key);
}

export async function deleteFile(key: string) {
  const db = await dbPromise;
  await db.delete('files', key);
}
