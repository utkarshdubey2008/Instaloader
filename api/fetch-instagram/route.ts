import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()
    const apiUrl = `https://instadl.pikaapis0.workers.dev/?url=${encodeURIComponent(url)}`

    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch from Instagram API')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Instagram media:', error)
    return NextResponse.json({ error: 'Failed to fetch Instagram media' }, { status: 500 })
  }
}

