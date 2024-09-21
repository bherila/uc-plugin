import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import svrLoadShopifyProducts, {
  MID,
} from '@/server_lib/svrLoadShopifyProducts'
import z from 'zod'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return NextResponse.json(null, { status: 403 })
  }
  const type = req.nextUrl.searchParams.get('type') ?? ''
  try {
    return NextResponse.json(
      await svrLoadShopifyProducts(
        z
          .string()
          .regex(/manifest-item|deal/)
          .parse(type.toLowerCase()) as MID,
      ),
    )
  } catch (err: any) {
    return NextResponse.json({ error: err.toString() }, { status: 400 })
  }
}
