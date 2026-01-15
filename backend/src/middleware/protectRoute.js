import User from '../models/User.js';
import { requireAuth, getAuth } from '@clerk/express';

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
        return res.status(401).json({ msg: 'Unauthorized' });
      }

      const user = await User.findOne({ clerkId: userId });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      req.user = user; // Attach user to request object
      next();
    } catch (error) {
      console.error('Error in protectRoute middleware:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  },
];
