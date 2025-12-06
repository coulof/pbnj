import type { APIRoute } from 'astro';
import { createSession, getSessionCookie } from '@/lib/auth';

// POST /api/auth/login - Login and create session
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const runtime = locals.runtime as any;
    const { key } = await request.json();

    // Verify the auth key
    if (key !== runtime.env.AUTH_KEY) {
      return new Response(JSON.stringify({ error: 'Invalid auth key' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create a new session
    const sessionId = await createSession(runtime.env.DB);

    // Return success with Set-Cookie header
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': getSessionCookie(sessionId),
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
