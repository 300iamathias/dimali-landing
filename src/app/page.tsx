'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/* ─── Data ──────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Colección', href: '#products' },
  { label: 'Artesanía', href: '#craftsmanship' },
  { label: 'Nosotros', href: '#why-us' },
  { label: 'Testimonios', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

const PRODUCTS = [
  {
    name: 'Clásico Montecristi',
    description: 'El sombrero más fino del mundo, tejido con hebras ultra delgadas de paja toquilla. Elegancia atemporal.',
    price: 'Desde $85',
    image: '/product-dimali-1.png',
    badge: 'Bestseller',
  },
  {
    name: 'Fedor Brisa Tropical',
    description: 'Estilo fedor moderno con ala media, perfecto para el sol tropical. Ligero y transpirable.',
    price: 'Desde $55',
    image: '/product-dimali-2.png',
    badge: 'Popular',
  },
  {
    name: 'Ala Ancha Riviera',
    description: 'Protección máxima con elegancia. Ala ancha ideal para la playa y días soleados.',
    price: 'Desde $65',
    image: '/products-dimali.png',
    badge: 'Nuevo',
  },
];

const PAIN_POINTS = [
  {
    icon: '😰',
    title: 'Sombreros que se deforman',
    description: 'Los sombreros comunes pierden su forma con el sol y la humedad, arruinando tu look.',
  },
  {
    icon: '😞',
    title: 'Diseños genéricos',
    description: 'Cansado de sombreros sin personalidad que no reflejan tu estilo único y elegante.',
  },
  {
    icon: '😤',
    title: 'Calidad cuestionable',
    description: 'Materiales baratos que no duran, colores que se decoloran y costuras que se abren.',
  },
  {
    icon: '🤔',
    title: 'Sin historia ni tradición',
    description: 'Productos en serie sin alma, sin la artesanía y tradición que mereces lucir.',
  },
];

const CRAFTSMANSHIP_STEPS = [
  {
    step: '01',
    title: 'Cosecha de la Toquilla',
    description: 'Seleccionamos las hojas más tiernas de la palma Carludovica Palmata en los bosques ecuatorianos.',
  },
  {
    step: '02',
    title: 'Preparación Manual',
    description: 'Las hojas se hierven, se secan al sol y se blanquean, siguiendo técnicas ancestrales.',
  },
  {
    step: '03',
    title: 'Tejido Artesanal',
    description: 'Manos mágicas tejen cada sombrero punto por punto, dedicando semanas a cada pieza.',
  },
  {
    step: '04',
    title: 'Acabado Premium',
    description: 'Remate de calidad: bloqueo, cinta, y detalles que hacen de cada sombrero una obra de arte.',
  },
];

const TESTIMONIALS = [
  {
    name: 'María Fernanda L.',
    location: 'Quito, Ecuador',
    text: '¡Mi sombrero Di Mali es espectacular! La calidad se siente desde el primer momento. Lo uso en every outing y siempre recibo cumplidos.',
    rating: 5,
  },
  {
    name: 'Carlos Andrés M.',
    location: 'Guayaquil, Ecuador',
    text: 'Compré un Montecristi para mi boda y fue la mejor decisión. Elegancia pura, artesanía de otro nivel. Di Mali es sinónimo de calidad.',
    rating: 5,
  },
  {
    name: 'Isabella R.',
    location: 'Cuenca, Ecuador',
    text: 'Me encanta saber que cada sombrero tiene una historia. Se nota el amor y la tradición en cada puntada. 100% recomendado.',
    rating: 5,
  },
  {
    name: 'Sofía Valentina P.',
    location: 'Miami, USA',
    text: 'Vivo en Miami y mi sombrero Di Mali es mi accesorio favorito. Protege del sol y se ve increíble. ¡Mis amigas todas quieren uno!',
    rating: 5,
  },
];

const FAQ_DATA = [
  {
    q: '¿Qué es la paja toquilla?',
    a: 'La paja toquilla es una fibra natural proveniente de la palma Carludovica Palmata, nativa de Ecuador. Es el material con el que se elaboran los famosos "Panama Hats", reconocidos mundialmente por su ligereza, flexibilidad y elegancia.',
  },
  {
    q: '¿Por qué se llaman "Panama Hats" si son de Ecuador?',
    a: 'Los sombreros de paja toquilla son 100% ecuatorianos. El nombre "Panama Hat" surgió porque en el siglo XIX se exportaban masivamente a través del canal de Panamá. En Di Mali nos enorgullece reivindicar su verdadero origen ecuatoriano.',
  },
  {
    q: '¿Cuánto tiempo toma hacer un sombrero?',
    a: 'Depende del grado de finura. Un sombrero fino puede tomar de 1 a 3 semanas de tejido manual. Los Montecristi más finos pueden requerir hasta 2 meses de trabajo artesanal dedicado.',
  },
  {
    q: '¿Cómo cuido mi sombrero de paja toquilla?',
    a: 'Evita la lluvia prolongada, guárdalo en un lugar seco y ventilado, y nunca lo coloques boca abajo. Para limpiarlo, usa un paño suave y ligeramente húmedo. Si se deforma, el vapor caliente puede ayudar a recuperar su forma.',
  },
  {
    q: '¿Hacen envíos internacionales?',
    a: '¡Sí! Realizamos envíos a todo Ecuador y al exterior. Cada sombrero se empaca cuidadosamente para que llegue en perfectas condiciones. Contáctanos por WhatsApp para detalles de envío.',
  },
  {
    q: '¿Puedo personalizar mi sombrero?',
    a: '¡Claro! Ofrecemos opciones de personalización incluyendo color de cinta, estilo de ala y talla. Escríbenos por WhatsApp y te ayudamos a crear el sombrero perfecto para ti.',
  },
];

const WHY_US = [
  {
    icon: '🇪🇨',
    title: '100% Ecuatoriano',
    description: 'Cada sombrero es orgullosamente hecho en Ecuador, cuna de la paja toquilla y la mejor artesanal del mundo.',
  },
  {
    icon: '✋',
    title: 'Hecho a Mano',
    description: 'Sin máquinas, sin prisas. Nuestros artesanos tejen cada pieza con dedicación y técnicas ancestrales.',
  },
  {
    icon: '💎',
    title: 'Calidad Premium',
    description: 'Seleccionamos solo la mejor paja toquilla y cada sombrero pasa por rigurosos controles de calidad.',
  },
  {
    icon: '🌿',
    title: 'Sostenible',
    description: 'Materiales naturales y procesos artesanales que respetan el medio ambiente y las comunidades locales.',
  },
  {
    icon: '📦',
    title: 'Envío Seguro',
    description: 'Empaque especializado para que tu sombrero llegue perfecto a cualquier parte del mundo.',
  },
  {
    icon: '💬',
    title: 'Atención Personal',
    description: 'Te asesoramos por WhatsApp para que encuentres el sombrero perfecto para tu estilo y necesidad.',
  },
];

/* ─── Component ─────────────────────────────────────── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ═══ NAVBAR ═══ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative rounded-full overflow-hidden border-2 border-gold/50 group-hover:border-gold transition-colors">
                <Image
                  src="/logo-dimali.png"
                  alt="Di Mali Logo"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold text-navy tracking-wide">
                  Di Mali
                </span>
                <span className="text-[10px] sm:text-xs text-gold tracking-widest uppercase -mt-1">
                  manos mágicas
                </span>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-sans tracking-wide transition-colors duration-300 hover:text-gold ${
                    scrolled ? 'text-navy' : 'text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/593997158532"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-navy text-white px-5 py-2.5 rounded-full text-sm font-sans font-bold tracking-wide transition-all duration-300 hover:shadow-lg"
              >
                Solicitar Catálogo
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    mobileMenuOpen
                      ? 'rotate-45 translate-y-2 bg-navy'
                      : scrolled
                      ? 'bg-navy'
                      : 'bg-white'
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    mobileMenuOpen
                      ? 'opacity-0'
                      : scrolled
                      ? 'bg-navy'
                      : 'bg-white'
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    mobileMenuOpen
                      ? '-rotate-45 -translate-y-2 bg-navy'
                      : scrolled
                      ? 'bg-navy'
                      : 'bg-white'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/98 backdrop-blur-lg border-t border-gold/10 px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 text-navy font-sans text-sm tracking-wide hover:text-gold hover:bg-cream/50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/593997158532"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 bg-gold text-white text-center px-5 py-3 rounded-full text-sm font-sans font-bold tracking-wide"
            >
              Solicitar Catálogo
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-dimali.png"
            alt="Sombrero de paja toquilla Di Mali"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/70 to-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/30" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 border border-gold/20 rounded-full animate-float" />
        <div className="absolute bottom-40 left-10 w-20 h-20 border border-gold/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase mb-4 border border-gold/30 px-4 py-1.5 rounded-full">
              Artesanía Ecuatoriana
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Sombreros que{' '}
            <span className="text-gradient-gold italic">enamoran</span>
          </h1>

          <p className="mt-6 text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-sans font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Cada sombrero Di Mali es una obra de arte tejida por manos mágicas ecuatorianas. 
            Tradición, elegancia y estilo en cada hebra de paja toquilla.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="https://wa.me/593997158532"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-full text-sm sm:text-base font-sans font-bold tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-gold/25 animate-pulse-gold"
            >
              🛒 Solicitar Catálogo
            </a>
            <a
              href="#products"
              className="border-2 border-white/30 hover:border-gold text-white px-8 py-4 rounded-full text-sm sm:text-base font-sans font-bold tracking-wide transition-all duration-300 hover:shadow-lg"
            >
              Ver Colección
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-gold">500+</div>
              <div className="text-xs text-white/60 font-sans tracking-wide">Clientes Felices</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-gold">100%</div>
              <div className="text-xs text-white/60 font-sans tracking-wide">Hecho a Mano</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-gold">🇪🇨</div>
              <div className="text-xs text-white/60 font-sans tracking-wide">Orgullo Ecuatoriano</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* ═══ PAIN POINTS ═══ */}
      <section className="py-16 sm:py-24 bg-cream straw-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
              ¿Te suena familiar?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mt-3">
              Cansado de sombreros sin alma
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PAIN_POINTS.map((pain, i) => (
              <div
                key={i}
                className="animate-on-scroll bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gold/5 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {pain.icon}
                </div>
                <h3 className="font-serif text-lg text-navy mb-2">{pain.title}</h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {pain.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section id="products" className="py-16 sm:py-24 bg-warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
              Nuestra Colección
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mt-3">
              Elegancia que se lleva puesto
            </h2>
            <p className="mt-4 text-muted-foreground font-sans max-w-xl mx-auto">
              Descubre nuestros sombreros de paja toquilla, cada uno una pieza única tejida con amor y tradición ecuatoriana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map((product, i) => (
              <div
                key={i}
                className="animate-on-scroll-scale group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gold/5"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Image */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                  <span className="absolute top-4 right-4 bg-gold text-white text-xs font-sans font-bold px-3 py-1.5 rounded-full tracking-wide">
                    {product.badge}
                  </span>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-navy">{product.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground font-sans leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-gold font-serif text-lg font-bold">
                      {product.price}
                    </span>
                    <a
                      href="https://wa.me/593997158532"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-sans font-bold text-navy hover:text-gold transition-colors flex items-center gap-1"
                    >
                      Consultar
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center animate-on-scroll">
            <a
              href="https://wa.me/593997158532"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-8 py-4 rounded-full text-sm sm:text-base font-sans font-bold tracking-wide transition-all duration-300 hover:shadow-xl"
            >
              📱 Ver Catálogo Completo por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CRAFTSMANSHIP ═══ */}
      <section id="craftsmanship" className="py-16 sm:py-24 bg-navy relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 border border-gold rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-gold rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="animate-on-scroll-left relative">
              <div className="relative h-80 sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/artisan-dimali.png"
                  alt="Artesano tejiendo sombrero de paja toquilla"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-gold text-white rounded-2xl p-4 shadow-xl">
                <div className="text-3xl font-serif font-bold">4</div>
                <div className="text-xs font-sans tracking-wide">Semanas por<br/>sombrero fino</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="animate-on-scroll-right">
                <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
                  Nuestra Artesanía
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mt-3 leading-tight">
                  De la palma a tus{' '}
                  <span className="text-gradient-gold italic">manos mágicas</span>
                </h2>
                <p className="mt-4 text-white/70 font-sans leading-relaxed">
                  Cada sombrero Di Mali recorre un viaje de semanas, desde la cosecha de la paja toquilla 
                  en los bosques ecuatorianos hasta el acabado final. Un proceso que honra siglos de tradición.
                </p>
              </div>

              <div className="mt-8 space-y-6">
                {CRAFTSMANSHIP_STEPS.map((step, i) => (
                  <div
                    key={i}
                    className="animate-on-scroll-right flex gap-4 group"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gold/40 flex items-center justify-center text-gold font-serif font-bold group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white group-hover:text-gold transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/60 font-sans leading-relaxed mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY US ═══ */}
      <section id="why-us" className="py-16 sm:py-24 bg-cream straw-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
              ¿Por qué Di Mali?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mt-3">
              Lo que nos hace{' '}
              <span className="text-gradient-gold italic">diferentes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gold/5 group text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" className="py-16 sm:py-24 bg-warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
              Testimonios
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mt-3">
              Lo que dicen nuestros{' '}
              <span className="text-gradient-gold italic">clientes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="animate-on-scroll bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-500 border border-gold/5 relative"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Quote mark */}
                <div className="absolute top-4 right-6 text-6xl text-gold/10 font-serif leading-none">
                  &ldquo;
                </div>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg
                      key={j}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gold"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground font-sans leading-relaxed text-sm sm:text-base italic relative z-10">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-serif font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-sans text-sm font-bold text-navy">
                      {t.name}
                    </div>
                    <div className="font-sans text-xs text-muted-foreground">
                      {t.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-16 sm:py-24 bg-cream straw-pattern">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
              Preguntas Frecuentes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mt-3">
              ¿Tienes dudas?
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <div
                key={i}
                className={`faq-item animate-on-scroll bg-white rounded-2xl overflow-hidden border border-gold/5 shadow-sm transition-shadow duration-300 ${
                  openFaq === i ? 'shadow-md' : ''
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-serif text-base sm:text-lg text-navy pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`faq-icon flex-shrink-0 w-8 h-8 rounded-full bg-cream flex items-center justify-center text-navy font-bold transition-transform duration-300 ${
                      openFaq === i ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`faq-content ${
                    openFaq === i ? 'open' : ''
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 sm:py-24 bg-navy relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
              ¿Listo para brillar?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mt-4 leading-tight">
              Tu sombrero perfecto{' '}
              <span className="text-gradient-gold italic">te espera</span>
            </h2>
            <p className="mt-6 text-white/70 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Solicita nuestro catálogo por WhatsApp y déjanos ayudarte a encontrar 
              el sombrero de paja toquilla que refleje tu estilo único.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/593997158532"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-gold-light text-white px-10 py-4 rounded-full text-base sm:text-lg font-sans font-bold tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-gold/25 animate-pulse-gold flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Escribir por WhatsApp
              </a>
              <a
                href="https://www.instagram.com/dimalijewelry"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/20 hover:border-gold text-white px-8 py-4 rounded-full text-base font-sans font-bold tracking-wide transition-all duration-300 hover:shadow-lg flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                @dimalijewelry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-navy-light py-12 sm:py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 relative rounded-full overflow-hidden border-2 border-gold/50">
                  <Image
                    src="/logo-dimali.png"
                    alt="Di Mali Logo"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <span className="font-serif text-xl text-white font-bold">Di Mali</span>
                  <span className="block text-[10px] text-gold tracking-widest uppercase -mt-1">
                    manos mágicas
                  </span>
                </div>
              </div>
              <p className="text-white/50 font-sans text-sm leading-relaxed max-w-xs">
                Hermosas artesanías Ecuatorianas en paja toquilla. Brilla con artesanía local.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-serif text-white text-lg mb-4">Navegación</h4>
              <div className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-white/50 hover:text-gold font-sans text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-serif text-white text-lg mb-4">Síguenos</h4>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/dimalijewelry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/50 hover:text-gold font-sans text-sm transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Instagram: @dimalijewelry
                </a>
                <a
                  href="https://www.tiktok.com/@dimalijewelry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/50 hover:text-gold font-sans text-sm transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43 6.34 6.34 0 001.88-4.51V8.74a8.28 8.28 0 004.74 1.49V6.79a4.85 4.85 0 01-1.04-.1z"/>
                  </svg>
                  TikTok: @dimalijewelry
                </a>
                <a
                  href="https://wa.me/593997158532"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/50 hover:text-gold font-sans text-sm transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp: +593 99 715 8532
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 font-sans text-xs">
              © {new Date().getFullYear()} Di Mali — Manos Mágicas. Todos los derechos reservados.
            </p>
            <p className="text-white/30 font-sans text-xs">
              Hecho con 🤍 en Ecuador
            </p>
          </div>
        </div>
      </footer>

      {/* ═══ FLOATING WHATSAPP ═══ */}
      <a
        href="https://wa.me/593997158532"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
