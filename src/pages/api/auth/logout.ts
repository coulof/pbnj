import type { APIRoute } from 'astro';
import { getSessionId, deleteSession, getClearSessionCookie } from '@/lib/auth';

// POST /api/auth/logout - Logout and clear session
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const runtime = locals.runtime as any;

    // Get session ID from cookie
    const sessionId = getSessionId(request);

    // Delete session from database if it exists
    if (sessionId) {
      await deleteSession(runtime.env.DB, sessionId);
    }

    // Return success with Set-Cookie header to clear the cookie
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': getClearSessionCookie(),
      },
    });
  } catch (error) {
    console.error('Error during logout:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
