import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  return new Promise((resolve) => {
    pool.query(
      'SELECT id, username, email, phone_number, present_address, role, created_at, updated_at FROM users',
      (error, results) => {
        if (error) {
          console.error('Error fetching users:', error);
          resolve(
            NextResponse.json(
              { error: 'Internal server error' },
              { status: 500 }
            )
          );
          return;
        }

        resolve(
          NextResponse.json({
            success: true,
            users: results
          })
        );
      }
    );
  });
} 