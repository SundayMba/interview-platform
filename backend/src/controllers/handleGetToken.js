import { streamClient } from '../lib/stream.js';

const getStreamToken = (req, res) => {
  try {
    const userId = req.user.clerkId;
    const token = streamClient.createToken(userId);
    res.status(200).json({
      token,
      userName: req.user.name,
      userImage: req.user.image,
    });
  } catch (error) {
    console.error('Error generating Stream token:', error.message);
    res.status(500).json({ msg: 'Failed to generate token' });
  }
};

export default getStreamToken;
