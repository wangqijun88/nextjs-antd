import { NextResponse,NextRequest  } from 'next/server';
export async function GET(req:Request) {
  //return res.status(200).json({ foo: 'bar' });
  console.log(">>>req:", req.url)
  const res = await fetch('https://qawww.cctalk.com/webapi/sns/v1.1/user/4332319/info', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return NextResponse.json(data)
}
