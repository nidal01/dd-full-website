export default function RootLoading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative grid h-16 w-16 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/30" />
          <span className="h-3 w-3 rounded-full bg-gold" />
        </div>
        <div className="eyebrow">Yükleniyor…</div>
      </div>
    </div>
  )
}
