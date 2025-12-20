import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const habits = await prisma.habit.findMany({
    where: { userId },
    include: { logs: true },
    orderBy: { createdAt: "asc" },
  });

  const payload = habits.map((h) => ({
    id: h.id,
    name: h.name,
    description: h.description ?? undefined,

    frequency: h.frequency === "DAILY" ? "daily" : "weekly",
    weekDays: h.weekDays ?? [],

    startDate: h.startDate.toISOString().slice(0, 10),
    createdAt: h.createdAt.toISOString(),

    logs: (h.logs ?? []).map((l) => ({
      id: l.id,
      date: l.date.toISOString().slice(0, 10),
    })),
  }));

  return NextResponse.json(payload);
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    name,
    description,
    frequency = "daily",
    weekDays = [],
    startDate,
  } = body;

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  const dbFrequency = frequency === "weekly" ? "WEEKLY" : "DAILY";

  const created = await prisma.habit.create({
    data: {
      userId,
      name,
      description,
      frequency: dbFrequency,
      weekDays: Array.isArray(weekDays) ? weekDays : [],
      startDate: startDate ? new Date(startDate) : undefined,
    },
  });

  const out = {
    id: created.id,
    name: created.name,
    description: created.description ?? undefined,
    frequency: created.frequency === "DAILY" ? "daily" : "weekly",
    weekDays: created.weekDays ?? [],
    startDate: created.startDate.toISOString().slice(0, 10),
    createdAt: created.createdAt.toISOString(),
  };

  return NextResponse.json(out, { status: 201 });
}
