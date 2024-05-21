import { NextResponse, NextRequest } from 'next/server';
import { cookies  } from 'next/headers'
export async function GET(req: Request) {
  const res = await fetch('https://www.cctalk.com/webapi/seller_manage/v1.1/notify/center/get_banner_msg?bannerNum=3&menuCode=JBZL', {
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies().toString()
    },
  });
  const data = await res.json();
  return NextResponse.json(data)
}
