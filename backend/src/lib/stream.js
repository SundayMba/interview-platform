import { StreamChat } from 'stream-chat';
import { StreamClient } from '@stream-io/node-sdk';
import ENV from './env.js';

const streamAPI = ENV.STREAM_API_KEY;
const streamSecret = ENV.STREAM_API_SECRET;

if (!streamAPI || !streamSecret) {
  throw new Error('Stream API key and secret must be provided');
}

export const chatClient = StreamChat.getInstance(streamAPI, streamSecret); // Initialize Stream Chat client
export const videoClient = new StreamClient(streamAPI, streamSecret); // Initialize Stream Video client

export const createUpdateUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log('Stream user created/updated:', userData.id);
  } catch (error) {
    console.error('Error creating/updating Stream user:', error);
  }
};

export const deleteUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId, { mark_messages_deleted: true });
    console.log('Stream user deleted:', userId);
  } catch (error) {
    console.error('Error deleting Stream user:', error);
  }
};

// TODO: Add more Stream-related utility functions as needed like token generation, channel management, etc.
