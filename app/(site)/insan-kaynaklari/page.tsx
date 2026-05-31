import type { Metadata } from 'next'
import { ClipboardList, ClipboardCheck, MessagesSquare, Send, Linkedin, ExternalLink } from 'lucide-react'
import { WpPageShell, ProseSection, CtaBlock } from '@/components/sections/WpPageShell'
import { Reveal } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'İnsan Kaynakları',
  description:
    'Yetenekli, sürekli gelişen, mutlu ve eğitimli bir iş gücüyle birlikte çalışmak; pozitif çalışma ortamı ve yenilikçi kültür inşa etmek.',
}

const steps = [
  {
    icon: <ClipboardList size={20} />,
    title: 'Başvuru & İlan',
    body: 'Açık pozisyonlarımız Kariyer.net ve LinkedIn üzerinden yayınlanır; başvurular her iki kanaldan da kabul edilir.',
  },
  {
    icon: <ClipboardCheck size={20} />,
    title: 'Değerlendirme',
    body: 'Yetkinlik testi, yabancı dil değerlendirmesi ve kişilik envanteri ile çok yönlü değerlendirme süreci.',
  },
  {
    icon: <MessagesSquare size={20} />,
    title: 'Görüşme',
    body: 'Yetkinlik bazlı mülakat ve teknik değerlendirme görüşmeleri ile pozisyona uygunluk teyidi.',
  },
  {
    icon: <Send size={20} />,
    title: 'Sonuçlandırma',
    body: 'Tüm aday adaylarımıza pozitif veya negatif geri bildirim sağlanır; süreç şeffaflığa dayanır.',
  },
]

export default function IkPage() {
  return (
    <WpPageShell
      eyebrow="İnsan Kaynakları"
      heading="Yetenekli, sürekli gelişen, mutlu bir iş gücüyle birlikte."
      subheading="Pozitif çalışma ortamı, güçlü şirket kültürü ve yenilikçi organizasyon yapısıyla; değişime açık yetenekleri Duran Doğan ailesine katmayı hedefliyoruz."
      ctas={[
        { label: 'LinkedIn', href: 'https://www.linkedin.com/company/duran-dogan', variant: 'primary' },
        { label: 'CV Gönder', href: '/iletisim?konu=is-basvurusu', variant: 'secondary' },
      ]}
    >
      <ProseSection eyebrow="İK Vizyonumuz" heading="İnsan sermayesini en değerli varlık olarak görmek.">
        <p>
          İK stratejimiz; pozitif bir çalışma ortamı yaratmak, şirket kültürünü
          güçlendirmek ve yenilikçi bir organizasyon yapısı kurmak üzerine
          inşa edilmiştir.
        </p>
        <h3>Politika Hedeflerimiz</h3>
        <ul>
          <li>Değişime açık yetenekleri kazanmak</li>
          <li>Profesyonel becerileri geliştirmek ve kariyer gelişimini desteklemek</li>
          <li>İş yeri güvenliğini ve sosyal sorumluluğu sağlamak</li>
        </ul>
      </ProseSection>

      <section className="container-premium py-24">
        <div className="eyebrow mb-4">İşe Alım Süreci</div>
        <h2 className="max-w-3xl font-display text-display-lg tracking-tightest text-balance">
          Dört aşamada şeffaf bir işe alım yolculuğu.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 0.06}
              className="rounded-2xl border border-titanium-200/60 bg-titanium-50 p-7 dark:border-ink-700 dark:bg-ink-900/40"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                  {s.icon}
                </span>
                <span className="font-mono text-xs uppercase tracking-eyebrow text-titanium-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl tracking-tightest">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-titanium-600 dark:text-titanium-400">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-premium py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-titanium-200/60 bg-titanium-50 p-10 dark:border-ink-700 dark:bg-ink-900/40">
            <div className="eyebrow mb-4">Açık Pozisyonlar</div>
            <h3 className="font-display text-2xl tracking-tightest">
              Üretim, Tasarım, Satış & Pazarlama, Kalite Kontrol ve Genel Başvuru
            </h3>
            <p className="mt-4 text-titanium-600 dark:text-titanium-400">
              Açık pozisyonlarımız Kariyer.net ve LinkedIn üzerinden duyurulur.
              Şu anda açık olmasa bile genel başvurularınızı her zaman
              değerlendiriyoruz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/company/duran-dogan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm text-titanium-50 transition-colors hover:bg-navy-900"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://www.kariyer.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-titanium-300 px-5 text-sm text-ink transition-colors hover:border-gold hover:text-gold dark:border-ink-700 dark:text-titanium-100"
              >
                <ExternalLink size={16} /> Kariyer.net
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-10">
            <div className="eyebrow !text-gold mb-4">CV Gönder</div>
            <h3 className="font-display text-2xl tracking-tightest">
              Geleceğin Duran Doğan'ında çalışmak ister misiniz?
            </h3>
            <p className="mt-4 text-titanium-600 dark:text-titanium-400">
              CV'nizi PDF veya DOC formatında iletişim formumuz üzerinden bizimle
              paylaşın; uygun pozisyon açıldığında size ulaşalım.
            </p>
            <a
              href="/iletisim?konu=is-basvurusu"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-gold px-6 text-sm font-medium text-titanium-50 transition-all hover:bg-gold-700 hover:shadow-gold-glow"
            >
              <Send size={16} /> CV Gönder
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBlock
        eyebrow="İK İletişim"
        heading="Sorularınız için İK ekibimizle iletişime geçin."
        cta={{ label: 'İletişim', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
