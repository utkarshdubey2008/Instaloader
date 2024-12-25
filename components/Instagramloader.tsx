'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import MediaDisplay from './MediaDisplay'

interface MediaData {
  title: string
  images: MediaItem[]
  videos: MediaItem[]
}

interface MediaItem {
  url: string
  type: string
  size: string
  quality: string
  mute: string
}

export default function InstagramLoader() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mediaData, setMediaData] = useState<MediaData | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    
    setLoading(true)
    setError('')
    setMediaData(null)

    try {
      const response = await fetch('/api/fetch-instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch media')
      }

      const data = await response.json()
      setMediaData(data)
    } catch (err) {
      setError('Error fetching media. Please check the URL and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Paste Instagram URL here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !url.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-center">
          {error}
        </div>
      )}

      {mediaData && <MediaDisplay mediaData={mediaData} />}
    </div>
  )
}

