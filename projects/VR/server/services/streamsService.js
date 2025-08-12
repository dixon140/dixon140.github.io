import fetch from 'node-fetch';

const F1TV_API_STREAMS = process.env.F1TV_STREAMS_URL || 'https://api.formula1.com/f1tv/streams'; // placeholder

export async function fetchAvailableStreams({ accessToken, eventId }) {
  if (process.env.DEV_MODE === 'true') {
    // Return mock feeds using public sample videos (non-DRM) for layout testing
    return [
      { id: 'main', title: 'Main Broadcast (Sample)', type: 'main', hls: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
      { id: 'onboard1', title: 'Onboard 1 (Sample)', type: 'onboard', hls: 'https://test-streams.mux.dev/pts/playlist.m3u8' },
      { id: 'pitlane', title: 'Pit Lane (Sample)', type: 'pitlane', hls: 'https://test-streams.mux.dev/sintel/index.m3u8' },
      { id: 'heli', title: 'Helicopter (Sample)', type: 'alt', hls: 'https://test-streams.mux.dev/tears-of-steel/playlist.m3u8' },
      { id: 'data', title: 'Data Channel (Sample)', type: 'data', hls: 'https://test-streams.mux.dev/bbb-360p-mpeg2/playlist.m3u8' }
    ];
  }
  const url = `${F1TV_API_STREAMS}?eventId=${encodeURIComponent(eventId)}`;

  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'user-agent': 'VR MultiViewer/1.0',
      ...(process.env.F1TV_EXTRA_HEADERS ? JSON.parse(process.env.F1TV_EXTRA_HEADERS) : {})
    }
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Stream discovery failed: ${resp.status} ${text}`);
  }

  const data = await resp.json();

  const feeds = (data.items || data.feeds || []).map((item) => ({
    id: item.id || item.contentId || item.uid,
    title: item.title || item.name,
    type: item.type || item.category,
    hls: item.hls_url || item.hls || null,
    dash: item.dash_url || item.dash || null,
    thumbnail: item.image || item.thumbnail || null
  }));

  return feeds;
}
