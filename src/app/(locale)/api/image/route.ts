import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs'
import path from 'path'

const filePath = path.resolve('public/group.jpg')
const imageBuffer = fs.readFileSync(filePath)
export async function GET(req: Request, res: Response) {
  //return NextResponse.json({ imgData: imageBuffer.toString('base64') })
  return NextResponse.json({ imgData: imageBuffer})
} 