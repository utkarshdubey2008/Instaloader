import Link from "next/link"
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> in India
          </div>
          <div className="flex items-center gap-2">
            <span>Created by</span>
            <Link 
              href="https://t.me/Thealphabotz" 
              target="_blank"
              className="font-medium text-foreground hover:underline"
            >
              Team Alpha
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


