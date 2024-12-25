'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface MediaItem {
  url: string
  type: string
  size: string
  quality: string
  mute: string
}

interface MediaDisplayProps {
  mediaData: {
    title: string
    images: MediaItem[]
    videos: MediaItem[]
  }
}

export default function MediaDisplay({ mediaData }: MediaDisplayProps) {
  const handleDownload = (url: string, filename: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
      .catch((error) => console.error('Error downloading file:', error))
  }

  return (
    <div className="space-y-6">
      {mediaData.videos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mediaData.videos.map((video, index) => (
            <div key={index} className="space-y-2">
              <video
                src={video.url}
                controls
                className="w-full h-auto rounded-lg"
                muted={video.mute === 'yes'}
              >
                Your browser does not support the video tag.
              </video>
              <Button
                onClick={() => handleDownload(video.url, `instagram_video_${index + 1}.${video.type}`)}
                className="w-full"
              >
                Download
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


