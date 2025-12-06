// Authentication helpers for pbnj
// Supports both session-based auth (web) and Bearer token auth (CLI/API)

const SESSION_COOKIE_NAME = 'pbnj_session';
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Parse cookies from a request
 */
export function parseCookies(request: Request): Record<string, string> {
  const cookieHeader = request.headers.get('Cookie') || '';
  const cookies: Record<string, string> = {};

  for (const cookie of cookieHeader.split(';')) {
    const [name, ...rest] = cookie.trim().split('=');
    if (name) {
      cookies[name] = rest.join('=');
    }
  }

  return cookies;
}

/**
 * Check if request is authenticated via Bearer token (CLI/API)
 */
export function checkBearerAuth(request: Request, authKey: string): boolean {
  const authHeader = request.headers.get('Authorization');
  return authHeader === `Bearer ${authKey}`;
}

/**
 * Check if request has a valid session (web)
 */
export async function checkSessionAuth(request: Request, db: any): Promise<boolean> {
  const cookies = parseCookies(request);
  const sessionId = cookies[SESSION_COOKIE_NAME];

  if (!sessionId) {
    return false;
  }

  const now = Date.now();
  const session = await db.prepare(
    'SELECT id FROM sessions WHERE id = ? AND expires > ?'
  ).bind(sessionId, now).first();

  return !!session;
}

/**
 * Check if request is authenticated (either via session or Bearer token)
 */
export async function isAuthenticated(request: Request, db: any, authKey: string): Promise<boolean> {
  // First check Bearer token (for CLI/API)
  if (checkBearerAuth(request, authKey)) {
    return true;
  }

  // Then check session cookie (for web)
  return await checkSessionAuth(request, db);
}

/**
 * Generate a cryptographically secure session ID
 */
export function generateSessionId(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Create a new session and return the session ID
 */
export async function createSession(db: any): Promise<string> {
  const sessionId = generateSessionId();
  const now = Date.now();
  const expires = now + SESSION_DURATION_MS;

  await db.prepare(
    'INSERT INTO sessions (id, created, expires) VALUES (?, ?, ?)'
  ).bind(sessionId, now, expires).run();

  return sessionId;
}

/**
 * Delete a session
 */
export async function deleteSession(db: any, sessionId: string): Promise<void> {
  await db.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();
}

/**
 * Get the Set-Cookie header for creating a session cookie
 */
export function getSessionCookie(sessionId: string): string {
  const maxAge = Math.floor(SESSION_DURATION_MS / 1000);
  return `${SESSION_COOKIE_NAME}=${sessionId}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Strict; Secure`;
}

/**
 * Get the Set-Cookie header for clearing the session cookie
 */
export function getClearSessionCookie(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict; Secure`;
}

/**
 * Clean up expired sessions (call periodically)
 */
export async function cleanupExpiredSessions(db: any): Promise<number> {
  const now = Date.now();
  const result = await db.prepare('DELETE FROM sessions WHERE expires < ?').bind(now).run();
  return result.meta.changes || 0;
}

/**
 * Get session ID from request cookies
 */
export function getSessionId(request: Request): string | null {
  const cookies = parseCookies(request);
  return cookies[SESSION_COOKIE_NAME] || null;
}
