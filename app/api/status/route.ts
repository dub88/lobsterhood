import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    round: 1,
    pot: 0,
    winner: null,
    status: 'OPEN'
  });
}
