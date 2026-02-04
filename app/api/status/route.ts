export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    active_thread: "b021cdea-de86-4460-8c4b-8539842423fe",
    round: 0,
    status: "pending",
    draw_at: null
  });
}
