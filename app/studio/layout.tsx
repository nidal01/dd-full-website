export const metadata = {
  title: 'Duran Doğan · Studio',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-white text-black">{children}</div>
}
