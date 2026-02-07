import { StreamVideoClient } from "@stream-io/video-react-sdk";

export const getStreamApiKey = () =>
  import.meta.env.VITE_STREAM_API_KEY || import.meta.env.VITE_STREAM_KEY || "";

let client = null;

export const initializeStreamClient = async (user, token) => {
  const apiKey = getStreamApiKey();

  // if client exists with same user instead of creating again return it

  if (client && client?.user?.id === user.id) return client;

  if (client) {
    await disconnectStreamClient();
  }

  if (!apiKey) throw new Error("Stream API key is not provided.");

  client = new StreamVideoClient({
    apiKey,
    user,
    token,
  });

  return client;
};

export const disconnectStreamClient = async () => {
  if (client) {
    try {
      await client.disconnectUser();
      client = null;
    } catch (error) {
      console.error("Error disconnecting Stream client:", error);
    }
  }
};
