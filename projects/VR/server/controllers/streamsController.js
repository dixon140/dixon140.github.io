import { fetchAvailableStreams } from '../services/streamsService.js';

export async function listStreamsHandler(req, res) {
  try {
    const accessToken = req.session?.tokens?.accessToken;
    if (!accessToken) return res.status(401).json({ error: 'Not authenticated' });

    const eventId = req.query.eventId || 'current';
    const feeds = await fetchAvailableStreams({ accessToken, eventId });
    return res.json({ feeds });
  } catch (err) {
    console.error('Streams error', err);
    return res.status(500).json({ error: 'Failed to fetch streams' });
  }
}
