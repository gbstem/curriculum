import { defaultSession, SessionData, sessionOptions } from '@/lib/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  if (!session.isLoggedIn) {
    return NextResponse.json(defaultSession);
  }
  return NextResponse.json(session);
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  try {
    const { username, password } = (await request.json()) as {
      username?: string;
      password?: string;
    };

    if (!username || !password || (username !== 'viewer' && username !== 'editor')) {
      await sleep(200);
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    let correctPassword = '';
    if (username === 'viewer') {
      correctPassword = process.env.NEXT_CURRICULUM_VIEWER_ACCESS_PASSWORD || '';
    } else if (username === 'editor') {
      correctPassword = process.env.NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD || '';
    }

    if (!correctPassword || password !== correctPassword) {
      // Slow down brute force password guessing attempts
      await sleep(200);
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    session.username = username;
    session.role = username;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error in auth API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  session.destroy();
  return NextResponse.json(defaultSession);
}
