import { f1tvLogin } from '../services/authService.js';

export async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    // Dev mode: accept any creds and stub session
    if (process.env.DEV_MODE === 'true') {
      req.session.tokens = { accessToken: 'dev-token', refreshToken: 'dev-refresh' };
      req.session.user = { id: 'dev', email, name: 'Developer' };
      return res.json({ ok: true, user: req.session.user, dev: true });
    }

    const { accessToken, refreshToken, profile } = await f1tvLogin({ email, password });

    req.session.tokens = { accessToken, refreshToken };
    req.session.user = { id: profile?.id, email: profile?.email, name: profile?.name };

    return res.json({ ok: true, user: req.session.user });
  } catch (err) {
    console.error('Login error', err);
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

export async function logoutHandler(req, res) {
  req.session.destroy(() => res.json({ ok: true }));
}

export async function meHandler(req, res) {
  if (!req.session?.user) return res.status(401).json({ error: 'Not authenticated' });
  return res.json({ user: req.session.user });
}
