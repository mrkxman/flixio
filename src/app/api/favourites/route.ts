import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const favourites = await prisma.favorite.findMany();
  return NextResponse.json(favourites);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tmdbId, title, type, posterUrl } = body;

  if (!tmdbId || !title || !type || !posterUrl) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const favourite = await prisma.favorite.create({
      data: { tmdbId, title, type, posterUrl },
    });
    return NextResponse.json(favourite, { status: 201 });
  } catch (error) {
    console.error('Create error:', error);
    return NextResponse.json({ error: 'Failed to create favourite' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  try {
    await prisma.favorite.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete favourite' }, { status: 500 });
  }
}

