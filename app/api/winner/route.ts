import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    winner: null,
    chain: null,
    signature: null
  });
}
