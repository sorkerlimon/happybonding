import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    return new Promise((resolve) => {
      // Query user
      pool.query(
        'SELECT id, username, email, role FROM users WHERE email = ? AND password = ?',
        [email, password],
        (error, results) => {
          if (error) {
            console.error('Login error:', error);
            resolve(
              NextResponse.json(
                { error: 'Internal server error' },
                { status: 500 }
              )
            );
            return;
          }

          // Check if user exists
          if (!results || results.length === 0) {
            resolve(
              NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
              )
            );
            return;
          }

          const user = results[0];

          // Return success response with user data
          resolve(
            NextResponse.json({
              success: true,
              user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
              }
            })
          );
        }
      );
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 