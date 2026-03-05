import Link from 'next/link'
import AmcabiLogo from './AmcabiLogo'

const CURRENT_YEAR = new Date().getFullYear()

const destinationLinks = [
  { label: 'Bariloche',         href: '/destinos/bariloche' },
  { label: 'Cataratas del Iguazú', href: '/destinos/cataratas' },
  { label: 'Salta',             href: '/destinos/salta' },
  { label: 'Mar del Plata',     href: '/destinos/mar-del-plata' },
  { label: 'Villa Carlos Paz',  href: '/destinos/villa-carlos-paz' },
]

const pageLinks = [
  { label: 'Quiénes somos',      href: '/quienes-somos' },
  { label: 'Servicios',          href: '/servicios' },
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Consultar reserva',  href: '/consulta-reserva' },
  { label: 'Consultar voucher',  href: '/consulta-voucher' },
  { label: 'Contacto',           href: '/contacto' },
]

export default function Footer() {
  return (
    <footer
      className="relative bg-ink border-t-2 border-pink/15 pt-10 sm:pt-12 pb-6 overflow-hidden"
      role="contentinfo"
      aria-label="Pie de página"
    >
      {/* Decorative glows */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,208,0,0.04) 0%, transparent 60%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.03) 0%, transparent 60%)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <AmcabiLogo scale={0.78} dark />
            </div>
            <p className="font-body text-white/45 text-sm leading-relaxed mb-4 max-w-xs">
              Agencia habilitada por el Ministerio de Turismo de la Nación. Más de 14 años llevando viajeros a descubrir la Argentina.
            </p>
            <span className="inline-flex items-center gap-2 bg-pink/10 border border-pink/20 text-pink font-body text-xs px-3 py-1.5 rounded-full mb-4">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Legajo EVT N° 14703
            </span>

            {/* Social media */}
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com/AmcabiViajesYTurismo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-pink/20 flex items-center justify-center text-white/50 hover:text-pink transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/amcabi.com_oficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-pink/20 flex items-center justify-center text-white/50 hover:text-pink transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Destinos */}
          <div>
            <h3 className="font-body font-bold text-white text-xs uppercase tracking-wider mb-4">
              Destinos
            </h3>
            <nav aria-label="Destinos turísticos">
              <ul className="space-y-2">
                {destinationLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-white/50 hover:text-cyan text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Páginas */}
          <div>
            <h3 className="font-body font-bold text-white text-xs uppercase tracking-wider mb-4">
              Páginas
            </h3>
            <nav aria-label="Páginas del sitio">
              <ul className="space-y-2">
                {pageLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-white/50 hover:text-pink text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 4 — Contacto (compacto con íconos) */}
          <div>
            <h3 className="font-body font-bold text-white text-xs uppercase tracking-wider mb-4">
              Contacto
            </h3>
            <address className="not-italic space-y-2.5">

              {/* WhatsApp */}
              <div className="flex flex-col gap-1">
                <a href="https://wa.me/5491162203682" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 font-body text-white/55 hover:text-pink text-sm transition-colors">
                  <svg className="w-3.5 h-3.5 shrink-0 text-green-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  11 6220-3682
                </a>
                <a href="https://wa.me/5491123836286" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 font-body text-white/55 hover:text-pink text-sm transition-colors pl-5">
                  11 2383-6286
                </a>
              </div>

              {/* Teléfono */}
              <a href="tel:+541152362030"
                 className="inline-flex items-center gap-2 font-body text-white/55 hover:text-pink text-sm transition-colors">
                <svg className="w-3.5 h-3.5 shrink-0 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                11 5236-2030
              </a>

              {/* Email */}
              <a href="mailto:info@amcabiturismo.com.ar"
                 className="inline-flex items-center gap-2 font-body text-white/55 hover:text-pink text-sm transition-colors break-all">
                <svg className="w-3.5 h-3.5 shrink-0 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@amcabiturismo.com.ar
              </a>

              {/* Horario */}
              <div className="inline-flex items-center gap-2">
                <svg className="w-3.5 h-3.5 shrink-0 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-body text-white/55 text-sm">Lun–Vie · 10:00–17:00 hs</p>
              </div>

            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-5">
          <div className="flex flex-col gap-3">
            {/* Company info */}
            <p className="font-body text-white/25 text-xs text-center sm:text-left">
              © {CURRENT_YEAR} Fenix Operadores Turísticos SRL · AMCABI Turismo · Legajo EVT N° 14703 · Ministerio de Turismo y Deportes de la Nación
            </p>

            {/* Legal links */}
            <nav aria-label="Enlaces legales" className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
              <Link
                href="/terminos-condiciones"
                className="font-body text-white/25 hover:text-pink text-xs transition-colors"
              >
                Términos y condiciones
              </Link>
              <span className="text-white/15 hidden sm:inline" aria-hidden="true">·</span>
              <a
                href="https://www.argentina.gob.ar/defensadelconsumidor"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-white/25 hover:text-pink text-xs transition-colors"
              >
                Defensa del Consumidor
              </a>
              <span className="text-white/15 hidden sm:inline" aria-hidden="true">·</span>
              <span className="font-body text-white/20 text-xs">
                Ley 25.326 Protección de Datos
              </span>
              <span className="text-white/15 hidden sm:inline" aria-hidden="true">·</span>
              <Link
                href="/contacto"
                className="font-body text-white/25 hover:text-pink text-xs transition-colors"
              >
                Contacto
              </Link>
              <span className="text-white/15 hidden sm:inline" aria-hidden="true">·</span>
              <Link
                href="/admin"
                className="font-body text-white/15 hover:text-white/40 text-xs transition-colors"
                aria-label="Panel de administración"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>

      </div>
    </footer>
  )
}
