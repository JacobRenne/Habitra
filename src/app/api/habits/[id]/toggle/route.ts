import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";

type ContextLike = {
  params?: { id?: string } | Promise<{ id?: string }>;
};

export async function POST(req: NextRequest, context: ContextLike) {
  const maybeParams = context.params;
  const params = maybeParams
    ? await (maybeParams as Promise<{ id?: string }>)
    : undefined;
  const id = params?.id;

  if (!id) {
    return NextResponse.json({ error: "Missing habit id" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const date = body?.date as string | undefined;
  if (!date) {
    return NextResponse.json({ error: "Missing date" }, { status: 400 });
  }

  // Authenticate user
  const userId = await getUserIdFromRequest(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Find habit and ensure it belongs to the user
  const habit = await prisma.habit.findUnique({ where: { id } });
  if (!habit) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (habit.userId !== userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Normalize date string to avoid timezone shifts
  const dateIso = date.includes("T") ? date : `${date}T00:00:00Z`;
  const dateOnly = new Date(dateIso);

  try {
    const existing = await prisma.habitLog.findUnique({
      where: {
        habitId_date: {
          habitId: id,
          date: dateOnly,
        },
      },
    });

    if (existing) {
      await prisma.habitLog.delete({ where: { id: existing.id } });
      return NextResponse.json({ toggled: "removed" });
    } else {
      const created = await prisma.habitLog.create({
        data: {
          habitId: id,
          date: dateOnly,
        },
      });
      return NextResponse.json({ toggled: "added", id: created.id });
    }
  } catch (err) {
    console.error("Toggle error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
