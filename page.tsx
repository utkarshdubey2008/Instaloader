import InstagramLoader from './components/InstagramLoader'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Instagram Video Downloader</h2>
          </div>
          <InstagramLoader />
        </div>
      </main>
      <Footer />
    </div>
  )
}

