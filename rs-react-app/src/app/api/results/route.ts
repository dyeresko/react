import type { Response } from '@/types/interfaces';
import { NextRequest, NextResponse } from 'next/server';

const wait = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const name = searchParams.get('name') || '';
  await wait();
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${name}`
  );
  const data: Response = await res.json();
  return NextResponse.json(data);
}
