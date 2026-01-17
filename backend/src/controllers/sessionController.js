import { videoClient, chatClient } from '../lib/stream.js';
import Session from '../models/Session.js';
import crypto from 'crypto';

export const createSession = async (req, res) => {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    // verify the problem and difficulty are provided
    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: 'Problem and difficulty are required' });
    }

    const callId = `session_${crypto.randomUUID()}`;

    // create a new session in the database
    const newSession = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    try {
      // create a stream video call here (placeholder)
      await videoClient.video.call('default', callId).getOrCreate({
        data: {
          created_by_id: clerkId,
          custom: {
            session: newSession._id.toString(),
            problem,
            difficulty,
          },
        },
      });

      // create a message channel for the session (placeholder)
      const channel = chatClient.channel('messaging', callId, {
        name: `${problem} Session`,
        members: [clerkId],
        created_by_id: clerkId,
      });
      await channel.create();
    } catch (streamError) {
      console.error('Error setting up Stream video/chat:', streamError);

      // Optionally, you might want to rollback the session creation here
      await Session.findByIdAndDelete(newSession._id);

      return res
        .status(500)
        .json({ message: 'Failed to set up video/chat for the session' });
    }
    res.status(201).json({ session: newSession });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId).populate(
      'host participant',
      'name profileImage clerkId'
    );

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ session });
  } catch (error) {
    console.error('Error fetching session by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const updateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const updates = req.body;

    const session = await Session.findByIdAndUpdate(sessionId, updates, {
      new: true,
    });
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ session });
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findByIdAndDelete(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getActiveSessions = async (_, res) => {
  try {
    const sessions = await Session.find({ status: 'active' })
      .populate('host', 'name profileImage clerkId')
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ sessions });
  } catch (error) {
    console.error('Error fetching active sessions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getRecentSessions = async (req, res) => {
  const userId = req.user._id;
  try {
    // Fetch sessions where the user is either host or participant and status is completed and sort by most recent and limit to 20 and populate host and participant details
    const sessions = await Session.find({
      status: 'completed',
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('host participant', 'name profileImage clerkId');

    res.status(200).json({ sessions });
  } catch (error) {
    console.error('Error fetching recent sessions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const joinSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.participant) {
      return res
        .status(400)
        .json({ message: 'Session already has a participant' });
    }

    session.participant = userId;
    await session.save();

    // Add participant to the Stream video call (placeholder)

    // const call = await videoClient.video.call('default', session.callId).get();
    // await call.addParticipant(clerkId, {
    //   data: {
    //     joined_at: new Date().toISOString(),
    //   },
    // });

    // Add participant to the chat channel (placeholder)
    const channel = chatClient.channel('messaging', session.callId);
    await channel.addMembers([clerkId]);

    res.status(200).json({ session });
  } catch (error) {
    console.error('Error joining session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const endSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    // only the host can end the session
    if (!session.host.equals(userId)) {
      return res.status(403).json({ message: 'Forbidden: Not the host' });
    }

    if (session.status === 'completed') {
      return res.status(400).json({ message: 'Session already completed' });
    }

    // Optionally, you can also remove all participants from the video call and chat channel here

    // delete video call
    const call = await videoClient.video.call('default', session.callId).get();
    await call.delete({ hard: true });

    // delete chat channel
    const channel = chatClient.channel('messaging', session.callId);
    await channel.delete();

    session.status = 'completed';
    await session.save();

    res.status(200).json({ message: 'Session ended successfully', session });
  } catch (error) {
    console.error('Error ending session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
