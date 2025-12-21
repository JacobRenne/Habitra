import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const userId = await getUserIdFromRequest(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // verify ownership
  const habit = await prisma.habit.findUnique({ where: { id } });
  if (habit?.userId !== userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.habit.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
