import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
      </head>
      <body className="bg-[#FAF8F6] text-[#1C1A17] min-h-screen antialiased">
        <header className="bg-[#140F0E] border-b border-[#D4AF37]/10 sticky top-0 z-50 px-8 py-5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href='/'>
              <div className="font-['Cormorant_Garamond',serif] text-5xl tracking-widest text-[#D4AF37] font-light">
               CulteRRa
              </div>
            </a>
            <nav className="flex items-center gap-8 text-[11px] tracking-widest uppercase font-medium">
              <Link href="/" className="text-stone-200 hover:text-[#D4AF37] transition-colors border-b border-transparent hover:border-[#D4AF37] pb-1">
                 Выставки
              </Link>
              <Link href="/exhibits" className="text-stone-400 hover:text-[#D4AF37] transition-colors border-b border-transparent hover:border-[#D4AF37] pb-1">
                 Экспонаты
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 py-12">{children}</main>
      </body>
    </html>
  );
}