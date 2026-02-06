export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    active_thread: "bf799899-9e85-4bd4-a1c2-d3c791f8e0ba",
    round: 1,
    status: "paused",
    draw_at: null
  });
}
