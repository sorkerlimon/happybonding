import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  return new Promise((resolve) => {
    pool.query(
      'SELECT id, card_holder_name, bank_name, card_number, expiry_date, card_type, CAST(balance AS DECIMAL(10,2)) as balance, card_status FROM bank_cards',
      (error, results) => {
        if (error) {
          console.error('Error fetching cards:', error);
          resolve(
            NextResponse.json(
              { error: 'Internal server error' },
              { status: 500 }
            )
          );
          return;
        }

        // Format the results
        const formattedResults = results.map((card: any) => ({
          ...card,
          current_balance: parseFloat(card.balance) || 0
        }));

        resolve(
          NextResponse.json({
            success: true,
            cards: formattedResults
          })
        );
      }
    );
  });
} 