import { CarScene } from '@parkora-org/3d/src/scenes/CarScene'
import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 right-0 p-2">
          <CarScene className="h-full shadow-lg shadow-black/40 rounded-3xl" />
        </div>

        <div className="absolute top-12 left-12 z-20 flex flex-col items-start space-y-5 max-w-sm p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl text-white animate-fade-in">
          <div className="space-y-2">
            <h1 className="font-extrabold text-5xl tracking-tight leading-tight">
              Need <span className="text-yellow-400">parking?</span>
            </h1>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              Find, reserve, and manage premium parking spots with Parkora.
              Simple, secure, and stress-free.
            </p>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-2 px-6 py-3 text-base font-semibold text-black bg-yellow-400 hover:bg-yellow-500 rounded-xl transition-all shadow-[0_0_15px_rgba(250,204,21,0.4)] hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:scale-102"
          >
            <IconSearch className="w-5 h-5" /> Search now
          </Link>
        </div>
      </div>
    </main>
  )
}
