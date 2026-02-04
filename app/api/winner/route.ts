export const dynamic = 'force-dynamic';

export async function GET() {
  // Mock winner logic for hackathon demo
  const data = {
    winner: "0xd0a06ec35112e5d7f48d31e1c7aee163fa9b9c35",
    chain: "base",
    amount: 1,
    signature: "0x..."
  };
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
