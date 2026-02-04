export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    active_thread: "b021cdea-de86-4460-8c4b-8539842423fe",
    round: 1,
    status: "open",
    draw_at: "2026-02-04T00:00:00Z"
  });
}
