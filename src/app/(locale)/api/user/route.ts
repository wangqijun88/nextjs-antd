import { NextResponse,NextRequest  } from 'next/server';
export async function GET(req:Request) {
  //return res.status(200).json({ foo: 'bar' });
  console.log(">>>req:", req.url)
  const res = await fetch('https://www.cctalk.com/webapi/sns/v1.1/user/18633785/info', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return NextResponse.json(data)
}
