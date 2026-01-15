import { Inngest } from 'inngest';
import { connectDB } from './db.js';
import User from '../models/User.js';

// Initialize Inngest with a unique identifier for the application
export const inngest = new Inngest({ id: 'Interview-Platform' });

const syncUserProfile = inngest.createFunction(
  { id: 'sync-user-profile' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ''} ${last_name || ''}`,
      profileImage: image_url || '',
    };

    await User.create(newUser);
  }
);

const deleteUserProfile = inngest.createFunction(
  { id: 'delete-user-profile' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.findOneAndDelete({ clerkId: id });
  }
);

export const functions = [syncUserProfile, deleteUserProfile]; // Placeholder for future Inngest functions export
