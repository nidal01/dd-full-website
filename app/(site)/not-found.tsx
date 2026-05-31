import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container-premium grid min-h-[70vh] place-items-center py-32 text-center">
      <div>
        <div className="font-display text-[10rem] leading-none tracking-tightest text-gold">404</div>
        <h1 className="mt-6 font-display text-display-lg tracking-tightest">
          Aradığınız sayfa bulunamadı.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-titanium-500">
          Bu sayfa kaldırılmış ya da hiç var olmamış olabilir.
        </p>
        <Link
          href="/"
          className="btn-magnetic btn-magnetic--primary mt-10 inline-flex"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </section>
  )
}
