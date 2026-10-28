import { MongoClient } from "mongodb";

// Close the client after this long without a connectToDatabase() call, so no
// connections (or server monitors) stay open while the site is idle.
const IDLE_TIMEOUT_MS = 60 * 1000;

interface MongoState {
  client: Promise<MongoClient>,
  idleTimer?: NodeJS.Timeout
}

const globalWithMongo = global as typeof globalThis & { mongo?: MongoState };

function openClient(): MongoState {
  const client = new MongoClient(process.env.MONGODB_URI || "", {
    maxPoolSize: 8,
    minPoolSize: 0,
    maxIdleTimeMS: 30 * 1000
  });

  const state: MongoState = {
    client: client.connect().catch(err => {
      // Don't cache a failed connection; the next call retries.
      if (globalWithMongo.mongo === state) globalWithMongo.mongo = undefined;
      throw err;
    })
  };
  return state;
}

function scheduleClose(state: MongoState) {
  clearTimeout(state.idleTimer);
  state.idleTimer = setTimeout(() => {
    if (globalWithMongo.mongo === state) globalWithMongo.mongo = undefined;
    state.client.then(c => c.close()).catch(() => {});
  }, IDLE_TIMEOUT_MS);
  state.idleTimer.unref?.();
}

export async function connectToDatabase() {
  if (globalWithMongo.mongo === undefined) globalWithMongo.mongo = openClient();
  const state = globalWithMongo.mongo;
  scheduleClose(state);

  const client = await state.client;
  const db = client.db("mainWebsite");
  return { client, db };
}
