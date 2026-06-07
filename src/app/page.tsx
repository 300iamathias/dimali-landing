'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

/* ─── Navigation Links (Hierarchical with Submenus) ───── */
type SubLink = { label: string; href: string; icon?: string; desc?: string };
type NavLink = {
  label: string;
  href?: string;
  children?: SubLink[];
};

const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#hero' },
  {
    label: 'Sombreros',
    children: [
      { label: 'Colección', href: '#products', icon: '🎩', desc: 'Colonial, Seda de Palma, Clásicos y Premium' },
      { label: 'Edición Limitada', href: '#edicion-limitada', icon: '✨', desc: 'Piezas exclusivas de colección' },
    ],
  },
  {
    label: 'Accesorios',
    children: [
      { label: 'Carteras', href: '#carteras', icon: '👜', desc: 'Mimbre y paja toquilla artesanal' },
      { label: 'Sets', href: '#sets', icon: '🎁', desc: 'Set Herencia Artesanal' },
    ],
  },
  {
    label: 'Nuestra Historia',
    children: [
      { label: 'Artesanía', href: '#craftsmanship', icon: '🤲', desc: 'Proceso artesanal ancestral' },
      { label: 'Nosotros', href: '#why-us', icon: '🇪🇨', desc: '100% Ecuatoriano' },
      { label: 'Comunidad', href: '#comunidad', icon: '👥', desc: 'Nuestra gente, nuestra fuerza' },
    ],
  },
  { label: 'Legado', href: '#legado' },
  { label: 'Testimonios', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

/* ─── Product Category Data ──────────────────────────── */
type Product = {
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
};

type Category = {
  id: string;
  label: string;
  products: Product[];
};

const CATEGORIES: Category[] = [
  {
    id: 'colonial',
    label: 'Colonial',
    products: [
      {
        name: 'Colonial',
        description: 'Tejido pacientemente a mano, sus relieves rinden homenaje a los paisajes ondulados de nuestra costa.',
        price: '$80',
        image: '/hat-colonial.png',
      },
      {
        name: 'Pacífico',
        description: 'Un tributo a la calma del mar; sus fibras capturan la fluidez y ligereza de las olas.',
        price: '$80',
        image: '/hat-colonial.png',
      },
      {
        name: 'Atardecer',
        description: 'Nace de la calidez de un ocaso vibrante, esculpido en un audaz naranja para portar con seguridad.',
        price: '$80',
        image: '/hat-atardecer.png',
      },
      {
        name: 'Cuenca',
        description: 'Fuerza, carácter y herencia viva en una obra de arte robusta pensada para distinguirse cada día.',
        price: '$80',
        image: '/hat-colonial.png',
      },
    ],
  },
  {
    id: 'seda-palma',
    label: 'Seda de Palma',
    products: [
      {
        name: 'Seda de Palma',
        description: 'La máxima expresión de suavidad táctil; una pieza ligera y etérea que acaricia los sentidos.',
        price: '$80',
        image: '/hat-seda-palma.png',
      },
      {
        name: 'Malecón',
        description: 'Espíritu contemporáneo y urbano para llevar el arte ancestral a tus momentos más relajados y sofisticados.',
        price: '$80',
        image: '/hat-seda-palma.png',
      },
      {
        name: 'Colina',
        description: 'Líneas sutiles que emulan los relieves del campo en una estructura de frescura y ligereza excepcional.',
        price: '$80',
        image: '/hat-seda-palma.png',
      },
      {
        name: 'Mirador',
        description: 'Hecho para apreciar la vida desde una perspectiva alta, encerrando la maestría de toda una comunidad.',
        price: '$80',
        image: '/hat-seda-palma.png',
      },
      {
        name: 'Brisa Marina',
        description: 'Fresco como un respiro frente al océano, crea una sombra impecable que conecta con el descanso.',
        price: '$80',
        image: '/hat-seda-palma.png',
      },
      {
        name: 'Montañita',
        description: 'Carácter libre y bohemio que fusiona el lujo de la paja toquilla con un alma llena de energía.',
        price: '$80',
        image: '/hat-seda-palma.png',
      },
    ],
  },
  {
    id: 'clasicos',
    label: 'Clásicos',
    products: [
      {
        name: 'Unión',
        description: 'Unión perfecta de tonalidades donde el arte del tejido entrelaza contrastes con absoluta armonía y calidez.',
        price: '$80',
        image: '/product-dimali-1.png',
      },
      {
        name: 'Nacer',
        description: 'Inspirado en la luz del nuevo día; un diseño de degradados helicoidales que evocan un nuevo comienzo.',
        price: '$80',
        image: '/product-dimali-2.png',
      },
      {
        name: 'Coco Toquilla',
        description: 'Textura y frescura orgánica en un tramado que abraza la esencia más pura y relajada de nuestra costa.',
        price: '$80',
        image: '/hat-atardecer.png',
      },
      {
        name: 'Verde Oro',
        description: 'Distinción y elegancia en un matiz único que rinde tributo a la riqueza natural de nuestra tierra ecuatoriana.',
        price: '$80',
        image: '/hat-verde-oro.png',
      },
      {
        name: 'Niño',
        description: 'La magia de nuestra herencia cultural adaptada con ligereza y comodidad para proteger los pasos de los más pequeños.',
        price: '$80',
        image: '/products-dimali.png',
      },
      {
        name: 'Fuego',
        description: 'Pasión, movimiento y carácter en un juego visual vibrante para quienes portan el arte con total audacia.',
        price: '$80',
        image: '/hat-atardecer.png',
      },
      {
        name: 'Encuentro',
        description: 'Más que un diseño, es tiempo y dedicación. Una obra de arte pensada para quien valora la belleza de lo hecho con el corazón.',
        price: '$80',
        image: '/product-dimali-1.png',
      },
    ],
  },
  {
    id: 'premium',
    label: 'Premium',
    products: [
      {
        name: 'Estrella',
        description: 'Líneas de alta sombrerería que irradian luz propia, diseñadas para destacar con sofisticación en cualquier escenario.',
        price: '$80',
        image: '/product-dimali-1.png',
      },
      {
        name: 'Naturaleza',
        description: 'La esencia de la paja toquilla en su estado más puro, conectando tu estilo directamente con el origen sustentable.',
        price: '$80',
        image: '/hat-colonial.png',
      },
      {
        name: 'Sendero',
        description: 'Un tributo al espíritu viajero y la libertad del bosque; su paño premium abraza el camino con elegancia orgánica y carácter inquebrantable.',
        price: '$80',
        image: '/hat-seda-palma.png',
      },
      {
        name: 'Pino',
        description: 'Un homenaje a la frescura de los bosques eternos; su paño premium abraza tu estilo con elegancia orgánica y un carácter audaz.',
        price: '$80',
        image: '/product-dimali-2.png',
      },
      {
        name: 'Cielo',
        description: 'Livianidad absoluta que desafía la gravedad, diseñada para quienes tocan el firmamento con su propio estilo.',
        price: '$120',
        image: '/hat-colonial.png',
        badge: 'Premium',
      },
      {
        name: 'Mirador Premium',
        description: 'Un tributo a la simetría perfecta; líneas limpias y maestría artesanal para quienes portan el arte con total audacia.',
        price: '$120',
        image: '/hat-seda-palma.png',
        badge: 'Premium',
      },
    ],
  },
  {
    id: 'edicion-limitada',
    label: 'Edición Limitada',
    products: [
      {
        name: 'Isla Bonita',
        description: 'Sinfonía de hebras extrafinas tejidas durante semanas, esculpiendo un lujo ligero que evoca la brisa del paraíso.',
        price: '$120',
        image: '/hat-edicion-limitada.png',
        badge: 'Limitado',
      },
      {
        name: 'Capital',
        description: 'Líneas de impecable simetría y sofisticación urbana que proyectan la majestuosidad de nuestra herencia cultural.',
        price: '$130',
        image: '/hat-edicion-limitada.png',
        badge: 'Limitado',
      },
      {
        name: 'Fortaleza',
        description: 'Un homenaje a la frescura de los bosques eternos; su paño premium abraza tu estilo con elegancia orgánica y un carácter audaz.',
        price: '$135',
        image: '/hat-edicion-limitada.png',
        badge: 'Limitado',
      },
      {
        name: 'Esmeralda',
        description: 'Una joya artesanal de textura sedosa, donde la paciencia del tejedor se transforma en pura distinción y elegancia.',
        price: '$140',
        image: '/hat-edicion-limitada.png',
        badge: 'Limitado',
      },
      {
        name: 'Vegana',
        description: 'La audacia del color chocolate en un tejido extrafino que irradia distinción y carácter inquebrantable.',
        price: '$125',
        image: '/hat-vegana.png',
        badge: 'Limitado',
      },
      {
        name: 'Prisma',
        description: 'Rompe con la tradición. Una estructura geométrica audaz, diseñada para quienes marcan su propio camino. Elegancia moderna esculpida a mano.',
        price: '$145',
        image: '/hat-edicion-limitada.png',
        badge: 'Limitado',
      },
      {
        name: 'Manabí',
        description: 'Un homenaje directo a la cuna del tejido; cada fibra entrelazada respira historia, orgullo y tradición costera.',
        price: '$130',
        image: '/hat-edicion-limitada.png',
        badge: 'Limitado',
      },
      {
        name: 'Arena',
        description: 'Su color orgánico y flexibilidad superior rescatan la delicadeza de las playas infinitas moldeadas por el tiempo.',
        price: '$125',
        image: '/hat-vegana.png',
        badge: 'Limitado',
      },
      {
        name: 'Sombra Fina',
        description: 'La cúspide del lujo silencioso: un tejido tan denso y etéreo que regala una caricia fresca en cada puesta.',
        price: '$160',
        image: '/hat-edicion-limitada.png',
        badge: 'Limitado',
      },
      {
        name: 'El Heredero',
        description: 'Una obra de arte concebida para trascender generaciones, custodiando el saber hacer de los maestros tejedores.',
        price: '$180',
        image: '/hat-edicion-limitada.png',
        badge: 'Limitado',
      },
      {
        name: 'Quito',
        description: 'Elegancia de altura con un diseño clásico y alma de vanguardia, ideal para dejar una huella imborrable donde vayas.',
        price: '$150',
        image: '/hat-edicion-limitada.png',
        badge: 'Limitado',
      },
    ],
  },
  {
    id: 'carteras',
    label: 'Carteras',
    products: [
      {
        name: 'Mariposa',
        description: 'Tejido artesanal y texturas vibrantes se fusionan en un diseño ligero; un toque lúdico y femenino que evoca la libertad y la belleza natural.',
        price: '$40',
        image: '/cartera-mimbre.png',
      },
      {
        name: 'Arena Tostada',
        description: 'Un juego de contrastes cálidos que rinde tributo a la arena fina; texturas orgánicas tejidas a mano para elevar cualquier estilismo de verano.',
        price: '$40',
        image: '/cartera-mimbre.png',
      },
      {
        name: 'Jardín de Nácar',
        description: 'Una composición geométrica de contrastes profundos y detalles marinos; la elegancia del nácar hecha arte para resaltar con luz propia.',
        price: 'Ed. Limitada',
        image: '/cartera-raices.png',
        badge: 'Limitado',
      },
      {
        name: 'Raíces',
        description: 'Texturas orgánicas que fluyen de forma sutil con apliques florales únicos; un diseño ligero que rinde homenaje a la pureza y tradición de la tierra.',
        price: 'Ed. Limitada',
        image: '/cartera-raices.png',
        badge: 'Limitado',
      },
      {
        name: 'Constelación',
        description: 'Destellos naturales distribuidos simétricamente sobre un tejido rígido excepcional; una pieza icónica y sofisticada que brilla con luz propia.',
        price: 'Ed. Limitada',
        image: '/cartera-mimbre.png',
        badge: 'Limitado',
      },
      {
        name: 'Amanecer Andino',
        description: 'Una silueta geométrica imponente que destaca por su vibrante tono cálido; elegancia contemporánea tejida para resaltar con luz propia.',
        price: 'Ed. Limitada',
        image: '/cartera-raices.png',
        badge: 'Limitado',
      },
      {
        name: 'Metamorfosis',
        description: 'Delicadas incrustaciones que transforman un diseño clásico en una pieza de arte; textura y brillo natural en perfecto equilibrio.',
        price: 'Ed. Limitada',
        image: '/cartera-mimbre.png',
        badge: 'Limitado',
      },
      {
        name: 'Eclipse Botánico',
        description: 'Destellos naturales distribuidos simétricamente sobre un tejido rígido excepcional; una pieza icónica y sofisticada que brilla con luz propia.',
        price: 'Ed. Limitada',
        image: '/cartera-raices.png',
        badge: 'Limitado',
      },
    ],
  },
  {
    id: 'sets',
    label: 'Sets',
    products: [
      {
        name: 'Brisa del Pacífico',
        description: 'Una silueta geométrica imponente que destaca por su vibrante tono cálido; elegancia contemporánea tejida para resaltar con luz propia.',
        price: '$110',
        image: '/set-herencia.png',
      },
      {
        name: 'Herencia Viva',
        description: 'Una armonía perfecta de tonalidades cálidas y destellos naturales; el conjunto ideal para expresar sofisticación, arte y orgullo por lo nuestro.',
        price: '$110',
        image: '/set-herencia.png',
      },
      {
        name: 'Sol, Fibra y Estilo',
        description: 'La máxima expresión del lujo artesanal contemporáneo; un conjunto audaz, ligero y lleno de vida pensado para destacar bajo el sol.',
        price: '$110',
        image: '/set-herencia.png',
      },
      {
        name: 'Amanecer Andino Set',
        description: 'La fusión definitiva de la elegancia clásica y la sobriedad; un conjunto atemporal que destaca por su pureza de tonos naturales y texturas geométricas.',
        price: '$110',
        image: '/set-herencia.png',
      },
    ],
  },
];

/* ─── Craftsmanship Phases ───────────────────────────── */
const CRAFT_PHASES = [
  {
    step: '01',
    title: 'Preparación de la Paja Toquilla',
    description: 'Selección de las hojas más tiernas de la palma Carludovica Palmata. Se hierven, se secan al sol y se blanquean siguiendo técnicas ancestrales de Manabí y Azuay.',
    icon: '🌿',
  },
  {
    step: '02',
    title: 'Tejido y Formación',
    description: 'Manos mágicas tejen cada sombrero punto por punto, dedicando semanas a cada pieza. Cada fibra entrelazada respira historia y tradición costera.',
    icon: '🤲',
  },
  {
    step: '03',
    title: 'Acabado y Prensa',
    description: 'Remate de calidad: bloqueo, prensado y detalles que hacen de cada sombrero una obra de arte única. DiMali — Obra de arte única en Ecuador.',
    icon: '✨',
  },
];

/* ─── Why Us / Nosotros Section ────────────────────────── */
const WHY_US_ITEMS = [
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

/* ─── Testimonials Section ────────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'María Fernanda L.',
    location: 'Quito, Ecuador',
    text: '¡Mi sombrero Di Mali es espectacular! La calidad se siente desde el primer momento. Lo uso en every outing y siempre recibo cumplidos.',
    initial: 'M',
  },
  {
    name: 'Carlos Andrés M.',
    location: 'Guayaquil, Ecuador',
    text: 'Compré un Montecristi para mi boda y fue la mejor decisión. Elegancia pura, artesanía de otro nivel. Di Mali es sinónimo de calidad.',
    initial: 'C',
  },
  {
    name: 'Isabella R.',
    location: 'Cuenca, Ecuador',
    text: 'Me encanta saber que cada sombrero tiene una historia. Se nota el amor y la tradición en cada puntada. 100% recomendado.',
    initial: 'I',
  },
  {
    name: 'Sofía Valentina P.',
    location: 'Miami, USA',
    text: 'Vivo en Miami y mi sombrero Di Mali es mi accesorio favorito. Protege del sol y se ve increíble. ¡Mis amigas todas quieren uno!',
    initial: 'S',
  },
];

/* ─── Edición Limitada Showcase Data ─────────────────── */
const EDICION_LIMITADA_PRODUCTS = [
  {
    name: 'Isla Bonita',
    description: 'Sinfonía de hebras extrafinas tejidas durante semanas, esculpiendo un lujo ligero que evoca la brisa del paraíso.',
    price: '$120',
    image: '/hat-isla-bonita.png',
  },
  {
    name: 'Capital',
    description: 'Líneas de impecable simetría y sofisticación urbana que proyectan la majestuosidad de nuestra herencia cultural.',
    price: '$130',
    image: '/hat-capital.png',
  },
  {
    name: 'Fortaleza',
    description: 'Un homenaje a la frescura de los bosques eternos; su paño premium abraza tu estilo con elegancia orgánica y un carácter audaz.',
    price: '$135',
    image: '/hat-fortaleza.png',
  },
  {
    name: 'Esmeralda',
    description: 'Una joya artesanal de textura sedosa, donde la paciencia del tejedor se transforma en pura distinción y elegancia.',
    price: '$140',
    image: '/hat-esmeralda.png',
  },
  {
    name: 'Vegana',
    description: 'La audacia del color chocolate en un tejido extrafino que irradia distinción y carácter inquebrantable.',
    price: '$125',
    image: '/hat-vegana.png',
  },
  {
    name: 'Prisma',
    description: 'Rompe con la tradición. Una estructura geométrica audaz, diseñada para quienes marcan su propio camino.',
    price: '$145',
    image: '/hat-prisma.png',
  },
  {
    name: 'Manabí',
    description: 'Un homenaje directo a la cuna del tejido; cada fibra entrelazada respira historia, orgullo y tradición costera.',
    price: '$130',
    image: '/hat-manabi.png',
  },
  {
    name: 'Arena',
    description: 'Su color orgánico y flexibilidad superior rescatan la delicadeza de las playas infinitas moldeadas por el tiempo.',
    price: '$125',
    image: '/hat-arena.png',
  },
  {
    name: 'Sombra Fina',
    description: 'La cúspide del lujo silencioso: un tejido tan denso y etéreo que regala una caricia fresca en cada puesta.',
    price: '$160',
    image: '/hat-sombra-fina.png',
  },
  {
    name: 'El Heredero',
    description: 'Una obra de arte concebida para trascender generaciones, custodiando el saber hacer de los maestros tejedores.',
    price: '$180',
    image: '/hat-el-heredero.png',
  },
  {
    name: 'Quito',
    description: 'Elegancia de altura con un diseño clásico y alma de vanguardia, ideal para dejar una huella imborrable donde vayas.',
    price: '$150',
    image: '/hat-quito.png',
  },
];

/* ─── Carteras Showcase Data ─────────────────────────── */
const CARTERAS_REGULARES = [
  {
    name: 'Mariposa',
    description: 'Tejido artesanal y texturas vibrantes se fusionan en un diseño ligero; un toque lúdico y femenino que evoca la libertad y la belleza natural.',
    price: '$40',
    image: '/cartera-mariposa.png',
  },
  {
    name: 'Arena Tostada',
    description: 'Un juego de contrastes cálidos que rinde tributo a la arena fina; texturas orgánicas tejidas a mano para elevar cualquier estilismo de verano.',
    price: '$40',
    image: '/cartera-arena.png',
  },
];

const CARTERAS_LIMITADAS = [
  {
    name: 'Jardín de Nácar',
    description: 'Una composición geométrica de contrastes profundos y detalles marinos; la elegancia del nácar hecha arte para resaltar con luz propia.',
    price: '$40',
    image: '/cartera-nacar.png',
  },
  {
    name: 'Raíces',
    description: 'Texturas orgánicas que fluyen de forma sutil con apliques florales únicos; un diseño ligero que rinde homenaje a la pureza y tradición de la tierra.',
    price: '$40',
    image: '/cartera-raices.png',
  },
  {
    name: 'Constelación',
    description: 'Destellos naturales distribuidos simétricamente sobre un tejido rígido excepcional; una pieza icónica y sofisticada que brilla con luz propia.',
    price: '$40',
    image: '/cartera-constelacion.png',
  },
  {
    name: 'Amanecer Andino',
    description: 'Una silueta geométrica imponente que destaca por su vibrante tono cálido; elegancia contemporánea tejida para resaltar con luz propia.',
    price: '$40',
    image: '/cartera-nacar.png',
  },
  {
    name: 'Metamorfosis',
    description: 'Delicadas incrustaciones que transforman un diseño clásico en una pieza de arte; textura y brillo natural en perfecto equilibrio.',
    price: '$40',
    image: '/cartera-mariposa.png',
  },
  {
    name: 'Eclipse Botánico',
    description: 'Destellos naturales distribuidos simétricamente sobre un tejido rígido excepcional; una pieza icónica y sofisticada que brilla con luz propia.',
    price: '$40',
    image: '/cartera-raices.png',
  },
];

/* ─── Sets Showcase Data ─────────────────────────────── */
const SETS_PRODUCTS = [
  {
    name: 'Brisa del Pacífico',
    description: 'Una silueta geométrica imponente que destaca por su vibrante tono cálido; elegancia contemporánea tejida para resaltar con luz propia.',
    price: '$110',
    image: '/set-brisa.png',
  },
  {
    name: 'Herencia Viva',
    description: 'Una armonía perfecta de tonalidades cálidas y destellos naturales; el conjunto ideal para expresar sofisticación, arte y orgullo por lo nuestro.',
    price: '$110',
    image: '/set-herencia-v2.png',
  },
  {
    name: 'Sol, Fibra y Estilo',
    description: 'La máxima expresión del lujo artesanal contemporáneo; un conjunto audaz, ligero y lleno de vida pensado para destacar bajo el sol.',
    price: '$110',
    image: '/set-herencia.png',
  },
  {
    name: 'Amanecer Andino Set',
    description: 'La fusión definitiva de la elegancia clásica y la sobriedad; un conjunto atemporal que destaca por su pureza de tonos naturales y texturas geométricas.',
    price: '$110',
    image: '/set-amanecer.png',
  },
];

/* ─── Gift / Legado Section ──────────────────────────── */
const LEGADO_ITEMS = [
  {
    icon: '🎁',
    title: 'Bienvenidas Inolvidables',
    description: 'El obsequio perfecto para recibir a familiares, amigos o clientes con el calor de nuestra tierra.',
  },
  {
    icon: '💎',
    title: 'Regalos con Historia',
    description: 'Olvide los objetos comunes; regale una pieza de colección tejida a mano.',
  },
  {
    icon: '🎉',
    title: 'Celebraciones Especiales',
    description: 'El detalle distinguido para bodas, aniversarios y encuentros familiares.',
  },
];

/* ─── FAQ Data ───────────────────────────────────────── */
const FAQ_DATA = [
  {
    q: '¿Qué es la paja toquilla?',
    a: 'La paja toquilla es una fibra natural proveniente de la palma Carludovica Palmata, nativa de Ecuador. Es el material con el que se elaboran los famosos "Panama Hats", reconocidos mundialmente por su ligereza, flexibilidad y elegancia. Desde 2012, el tejido del sombrero de paja toquilla es Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO.',
  },
  {
    q: '¿Por qué se llaman "Panama Hats" si son de Ecuador?',
    a: 'Los sombreros de paja toquilla son 100% ecuatorianos. El nombre "Panama Hat" surgió porque en el siglo XIX se exportaban masivamente a través del canal de Panamá. En Di Mali nos enorgullece reivindicar su verdadero origen ecuatoriano.',
  },
  {
    q: '¿Cuánto tiempo toma hacer un sombrero?',
    a: 'Depende del grado de finura. Un sombrero fino puede tomar de 1 a 3 semanas de tejido manual. Los Montecristi más finos pueden requerir hasta 2 meses de trabajo artesanal dedicado. Las piezas de Edición Limitada son las que más tiempo requieren.',
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
  {
    q: '¿Qué hace especial la Edición Limitada?',
    a: 'Las piezas de Edición Limitada son tejidas con hebras extrafinas por nuestros maestros artesanos más experimentados. Cada una requiere semanas adicionales de trabajo y representa la cúspide del arte del tejido de paja toquilla. Son verdaderas obras de arte de colección.',
  },
  {
    q: '¿Las carteras también son de paja toquilla?',
    a: 'Sí, nuestras carteras están elaboradas con paja toquilla y mimbre artesanal. Algunas incluyen apliques florales, detalles en nácar y acabados especiales que las convierten en piezas únicas. Las carteras de Edición Limitada incorporan técnicas y materiales adicionales de la más alta calidad.',
  },
];

/* ─── WhatsApp Link Helper ───────────────────────────── */
const getWhatsAppLink = (productName: string) =>
  `https://wa.me/593979692701?text=Hola,%20me%20interesa%20el%20producto%20${encodeURIComponent(productName)}%20de%20Di%20Mali`;

/* ─── Main Component ─────────────────────────────────── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('colonial');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dropdown handlers with delay for smoother UX
  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  }, []);

  // Scroll-based navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // PWA service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  // IntersectionObserver for scroll animations
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

  // Re-observe on category change
  useEffect(() => {
    const timer = setTimeout(() => {
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
        .querySelectorAll('.animate-on-scroll, .animate-on-scroll-scale')
        .forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ═══ NAVBAR ═══ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center">
              <span
                className={`font-serif text-2xl sm:text-3xl font-bold tracking-wide transition-colors duration-500 ${
                  scrolled ? 'text-navy' : 'text-white'
                }`}
              >
                Di<span className="text-gold">Mali</span>
              </span>
            </a>

            {/* Desktop Links - Professional Mega-Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(link.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-sans tracking-wide transition-colors duration-300 hover:text-gold rounded-lg ${
                        openDropdown === link.label ? 'text-gold' : scrolled ? 'text-navy' : 'text-white'
                      }`}
                    >
                      {link.label}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === link.label ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Dropdown Panel */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ${
                        openDropdown === link.label
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl shadow-navy/10 border border-gold/10 overflow-hidden min-w-[280px]">
                        {/* Decorative top border */}
                        <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                        <div className="p-2">
                          {link.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-cream/80 transition-all duration-200 group"
                            >
                              <span className="text-lg mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                                {child.icon}
                              </span>
                              <div>
                                <div className="text-sm font-sans font-semibold text-navy group-hover:text-gold transition-colors duration-200">
                                  {child.label}
                                </div>
                                {child.desc && (
                                  <div className="text-xs text-navy/50 font-sans mt-0.5 leading-relaxed">
                                    {child.desc}
                                  </div>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-sans tracking-wide transition-colors duration-300 hover:text-gold rounded-lg ${
                      scrolled ? 'text-navy' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
              <a
                href="https://wa.me/593979692701"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-navy text-white px-5 py-2.5 rounded-full text-sm font-sans font-bold tracking-wide transition-all duration-300 hover:shadow-lg flex items-center gap-2 ml-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
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
                    mobileMenuOpen ? 'rotate-45 translate-y-2 bg-navy' : scrolled ? 'bg-navy' : 'bg-white'
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : scrolled ? 'bg-navy' : 'bg-white'
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-navy' : scrolled ? 'bg-navy' : 'bg-white'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu with Accordion Submenus */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            mobileMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/98 backdrop-blur-lg border-t border-gold/10 px-4 py-3 space-y-0.5">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                    }
                    className="flex items-center justify-between w-full py-3 px-4 text-navy font-sans text-sm font-medium tracking-wide hover:text-gold hover:bg-cream/50 rounded-lg transition-colors"
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 text-navy/40 transition-transform duration-300 ${
                        mobileExpanded === link.label ? 'rotate-180 text-gold' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileExpanded === link.label ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-4 pb-2 space-y-0.5">
                      {link.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileExpanded(null);
                          }}
                          className="flex items-center gap-3 py-2.5 px-4 text-navy/70 font-sans text-sm tracking-wide hover:text-gold hover:bg-cream/50 rounded-lg transition-colors"
                        >
                          <span className="text-base">{child.icon}</span>
                          <div>
                            <div>{child.label}</div>
                            {child.desc && (
                              <div className="text-[11px] text-navy/40 leading-tight mt-0.5">{child.desc}</div>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 text-navy font-sans text-sm tracking-wide hover:text-gold hover:bg-cream/50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
            <a
              href="https://wa.me/593979692701"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 bg-gold text-white text-center px-5 py-3 rounded-full text-sm font-sans font-bold tracking-wide"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-nueva-coleccion.png"
            alt="Nueva Colección Di Mali - Sombreros de paja toquilla"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/40" />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-32 h-32 border border-gold/20 rounded-full animate-float" />
        <div className="absolute bottom-40 left-10 w-20 h-20 border border-gold/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase mb-4 border border-gold/30 px-4 py-1.5 rounded-full">
              NUEVA COLECCIÓN
            </span>
          </div>

          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mt-6 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Sombreros que{' '}
            <span className="text-gradient-gold italic">enamoran</span>
          </h1>

          <p
            className="mt-6 text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-sans font-light leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            En Di Mali, creemos que el verdadero lujo no se fabrica, se teje. Cada fibra de nuestros
            sombreros cuenta una historia que nace en los campos de Ecuador, donde la naturaleza y la
            maestría humana se encuentran.
          </p>

          {/* Taglines */}
          <div
            className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <span className="text-gold/80 text-xs sm:text-sm font-sans tracking-widest uppercase">
              Ecuador en cada fibra
            </span>
            <span className="w-1 h-1 bg-gold/50 rounded-full" />
            <span className="text-gold/80 text-xs sm:text-sm font-sans tracking-widest uppercase">
              Amor por la perfección
            </span>
            <span className="w-1 h-1 bg-gold/50 rounded-full" />
            <span className="text-gold/80 text-xs sm:text-sm font-sans tracking-widest uppercase">
              Belleza eterna
            </span>
          </div>

          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <a
              href="https://wa.me/593979692701"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-full text-sm sm:text-base font-sans font-bold tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-gold/25 animate-pulse-gold flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar por WhatsApp
            </a>
            <a
              href="#products"
              className="border-2 border-white/30 hover:border-gold text-white px-8 py-4 rounded-full text-sm sm:text-base font-sans font-bold tracking-wide transition-all duration-300 hover:shadow-lg"
            >
              Ver Colección
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10 animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-gold">UNESCO</div>
              <div className="text-xs text-white/60 font-sans tracking-wide">Patrimonio Cultural</div>
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

      {/* ═══ BRAND STORY ═══ */}
      <section className="py-16 sm:py-24 bg-cream straw-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="animate-on-scroll-left relative">
              <div className="relative h-80 sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/artisan-process.png"
                  alt="Artesano tejiendo sombrero de paja toquilla"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-gold text-white rounded-2xl p-4 shadow-xl">
                <div className="text-3xl font-serif font-bold">🇪🇨</div>
                <div className="text-xs font-sans tracking-wide">
                  Patrimonio Cultural<br/>de la Humanidad
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="animate-on-scroll-right">
              <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
                Nuestra Historia
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mt-3 leading-tight">
                El verdadero lujo no se fabrica,{' '}
                <span className="text-gradient-gold italic">se teje</span>
              </h2>
              <div className="mt-6 relative">
                <div className="absolute -left-4 top-0 text-8xl text-gold/10 font-serif leading-none">&ldquo;</div>
                <p className="text-muted-foreground font-sans leading-relaxed text-sm sm:text-base pl-4">
                  Elaborada íntegramente a mano con paja toquilla (Carludovica Palmata), cada pieza es
                  el resultado de un proceso meticuloso que honra la tradición de las comunidades de
                  Manabí y Azuay. Al elegir un Di Mali, usted no solo viste alta moda; usted porta un
                  Patrimonio Cultural Inmaterial de la Humanidad y mantiene vivo el susurro de
                  generaciones de tejedores.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gold/10">
                  <span className="text-gold font-serif font-bold text-lg">46+</span>
                  <span className="text-muted-foreground font-sans text-sm ml-2">Productos únicos</span>
                </div>
                <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gold/10">
                  <span className="text-gold font-serif font-bold text-lg">7</span>
                  <span className="text-muted-foreground font-sans text-sm ml-2">Categorías</span>
                </div>
                <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gold/10">
                  <span className="text-gold font-serif font-bold text-lg">100%</span>
                  <span className="text-muted-foreground font-sans text-sm ml-2">Artesanal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS WITH TABS ═══ */}
      <section id="products" className="py-16 sm:py-24 bg-warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
              Colección Completa
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mt-3">
              Sombreros de Paja Toquilla
            </h2>
            <p className="mt-4 text-muted-foreground font-sans max-w-2xl mx-auto text-sm sm:text-base">
              Cada pieza es el resultado de un proceso meticuloso que honra la tradición de las comunidades de Manabí y Azuay.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="animate-on-scroll mb-10">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold tracking-wide transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-navy text-white shadow-lg shadow-navy/20'
                      : 'bg-white text-navy hover:bg-gold/10 border border-gold/20'
                  }`}
                >
                  {cat.label}
                  <span className="ml-1.5 text-[10px] opacity-70">({cat.products.length})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCategory.products.map((product, i) => (
              <div
                key={`${activeCategory}-${product.name}`}
                className="animate-on-scroll-scale group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gold/5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-cream">
                  <Image
                    src={product.image}
                    alt={`${product.name} - Di Mali`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                  {product.badge && (
                    <span className="absolute top-3 right-3 bg-gold text-white text-[10px] sm:text-xs font-sans font-bold px-2.5 py-1 rounded-full tracking-wide">
                      {product.badge}
                    </span>
                  )}
                </div>
                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-serif text-lg text-navy">{product.name}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-gold font-serif text-lg font-bold">
                      {product.price}
                    </span>
                    <a
                      href={getWhatsAppLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-sans font-bold text-navy hover:text-gold transition-colors flex items-center gap-1"
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

          {/* CTA below products */}
          <div className="mt-12 text-center animate-on-scroll">
            <a
              href="https://wa.me/593979692701"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-8 py-4 rounded-full text-sm sm:text-base font-sans font-bold tracking-wide transition-all duration-300 hover:shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Ver Catálogo Completo por WhatsApp
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
          <div className="text-center mb-14 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
              Nuestra Artesanía
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mt-3 leading-tight">
              De la palma a tus{' '}
              <span className="text-gradient-gold italic">manos mágicas</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="animate-on-scroll-left relative">
              <div className="relative h-80 sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/artisan-process.png"
                  alt="Proceso artesanal de tejido de paja toquilla"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-gold text-white rounded-2xl p-4 shadow-xl">
                <div className="text-3xl font-serif font-bold">4</div>
                <div className="text-xs font-sans tracking-wide">
                  Semanas por<br/>sombrero fino
                </div>
              </div>
            </div>

            {/* 3-Phase Infographic */}
            <div>
              {CRAFT_PHASES.map((phase, i) => (
                <div
                  key={i}
                  className="animate-on-scroll-right flex gap-5 group mb-8 last:mb-0"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl border-2 border-gold/40 flex flex-col items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                    <span className="text-lg font-serif font-bold">{phase.step}</span>
                    <span className="text-lg leading-none">{phase.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-white group-hover:text-gold transition-colors">
                      FASE {phase.step}: {phase.title}
                    </h3>
                    <p className="text-sm text-white/60 font-sans leading-relaxed mt-2">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Bottom tagline */}
              <div className="mt-8 animate-on-scroll-right" style={{ transitionDelay: '450ms' }}>
                <div className="bg-gold/10 border border-gold/20 rounded-2xl p-5 text-center">
                  <span className="text-gold font-serif text-lg sm:text-xl font-bold tracking-wide">
                    DiMali — Obra de arte única en Ecuador
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NOSOTROS / WHY US ═══ */}
      <section id="why-us" className="py-16 sm:py-24 bg-warm-beige">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHY_US_ITEMS.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gold/5 text-center group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl text-navy mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIOS ═══ */}
      <section id="testimonials" className="py-16 sm:py-24 bg-cream straw-pattern">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="animate-on-scroll bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gold/5 flex flex-col"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Quote */}
                <div className="text-4xl text-gold/30 font-serif leading-none mb-2">&ldquo;</div>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed flex-1">
                  {t.text}
                </p>
                {/* Author */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-serif font-bold text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-sans text-sm font-bold text-navy">{t.name}</div>
                    <div className="font-sans text-xs text-muted-foreground">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EDICIÓN LIMITADA SOMBREROS ═══ */}
      <section id="edicion-limitada" className="py-16 sm:py-24 bg-navy relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="inline-block text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase mb-2 border border-gold/30 px-4 py-1.5 rounded-full">
              Edición Limitada
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mt-4">
              Sombreros de Paja Toquilla{' '}
              <span className="text-gradient-gold italic">Edición Limitada</span>
            </h2>
            <p className="mt-4 text-white/60 font-sans max-w-2xl mx-auto text-sm sm:text-base">
              Piezas exclusivas tejidas con hebras extrafinas por nuestros maestros artesanos más experimentados. Verdaderas obras de arte de colección.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {EDICION_LIMITADA_PRODUCTS.map((product, i) => (
              <div
                key={product.name}
                className="animate-on-scroll-scale group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/10"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-navy-light">
                  <Image
                    src={product.image}
                    alt={`${product.name} - Di Mali Edición Limitada`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                  <span className="absolute top-3 right-3 bg-gold text-white text-[10px] sm:text-xs font-sans font-bold px-2.5 py-1 rounded-full tracking-wide">
                    Limitado
                  </span>
                </div>
                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-serif text-lg text-white">{product.name}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-white/50 font-sans leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-gold font-serif text-lg font-bold">{product.price}</span>
                    <a
                      href={getWhatsAppLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-sans font-bold text-gold hover:text-white transition-colors flex items-center gap-1"
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

          {/* CTA */}
          <div className="mt-12 text-center animate-on-scroll">
            <a
              href="https://wa.me/593979692701"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-full text-sm sm:text-base font-sans font-bold tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-gold/25"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar Edición Limitada por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CARTERAS DE MIMBRE Y PAJA TOQUILLA ═══ */}
      <section id="carteras" className="py-16 sm:py-24 bg-cream straw-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
              Accesorios Artesanales
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mt-3">
              Carteras de Mimbre y{' '}
              <span className="text-gradient-gold italic">Paja Toquilla</span>
            </h2>
            <p className="mt-4 text-muted-foreground font-sans max-w-2xl mx-auto text-sm sm:text-base">
              Complementos artesanales que fusionan tradición, elegancia y estilo en cada detalle tejido a mano.
            </p>
          </div>

          {/* Regular Carteras */}
          <div className="mb-12">
            <h3 className="font-serif text-2xl text-navy mb-6 text-center animate-on-scroll">Colección Clásica</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {CARTERAS_REGULARES.map((product, i) => (
                <div
                  key={product.name}
                  className="animate-on-scroll-scale group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gold/5"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-cream">
                    <Image
                      src={product.image}
                      alt={`${product.name} - Di Mali`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-lg text-navy">{product.name}</h4>
                    <p className="mt-2 text-sm text-muted-foreground font-sans leading-relaxed line-clamp-3">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gold font-serif text-lg font-bold">{product.price}</span>
                      <a
                        href={getWhatsAppLink(product.name)}
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
          </div>

          {/* Edición Limitada Carteras */}
          <div>
            <div className="text-center mb-8 animate-on-scroll">
              <span className="inline-block text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase mb-2 border border-gold/30 px-4 py-1.5 rounded-full">
                Edición Limitada
              </span>
              <h3 className="font-serif text-2xl text-navy mt-3">Carteras de Colección</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CARTERAS_LIMITADAS.map((product, i) => (
                <div
                  key={product.name}
                  className="animate-on-scroll-scale group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gold/10"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="relative h-60 sm:h-72 overflow-hidden bg-cream">
                    <Image
                      src={product.image}
                      alt={`${product.name} - Di Mali`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                    <span className="absolute top-3 right-3 bg-gold text-white text-[10px] sm:text-xs font-sans font-bold px-2.5 py-1 rounded-full tracking-wide">
                      Limitado
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h4 className="font-serif text-lg text-navy">{product.name}</h4>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed line-clamp-3">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gold font-serif text-lg font-bold">{product.price}</span>
                      <a
                        href={getWhatsAppLink(product.name)}
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
          </div>
        </div>
      </section>

      {/* ═══ SET HERENCIA ARTESANAL ═══ */}
      <section id="sets" className="py-16 sm:py-24 bg-warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
              Conjuntos Exclusivos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mt-3">
              Set{' '}
              <span className="text-gradient-gold italic">Herencia Artesanal</span>
            </h2>
            <p className="mt-4 text-muted-foreground font-sans max-w-2xl mx-auto text-sm sm:text-base">
              Sombrero y cartera en perfecta armonía. Conjuntos que combinan tradición, elegancia y el orgullo de lo nuestro.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {SETS_PRODUCTS.map((product, i) => (
              <div
                key={product.name}
                className="animate-on-scroll-scale group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gold/5"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative h-64 sm:h-72 overflow-hidden bg-cream">
                  <Image
                    src={product.image}
                    alt={`${product.name} - Di Mali Set`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                  <span className="absolute top-3 right-3 bg-navy text-white text-[10px] sm:text-xs font-sans font-bold px-2.5 py-1 rounded-full tracking-wide">
                    Set
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-serif text-lg text-navy">{product.name}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-gold font-serif text-lg font-bold">{product.price}</span>
                    <a
                      href={getWhatsAppLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-sans font-bold text-navy hover:text-gold transition-colors flex items-center gap-1"
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
        </div>
      </section>

      {/* ═══ ADQUIERA SU LEGADO ═══ */}
      <section id="legado" className="py-16 sm:py-24 bg-cream straw-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
              Regalo con Alma
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mt-3">
              Adquiera su{' '}
              <span className="text-gradient-gold italic">Legado Di Mali</span>
            </h2>
            <p className="mt-4 text-muted-foreground font-sans max-w-xl mx-auto text-sm sm:text-base">
              Cada pieza Di Mali es más que un accesorio — es un regalo que trasciende generaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {LEGADO_ITEMS.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gold/5 text-center group"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl text-navy mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {item.description}
                </p>
                <a
                  href="https://wa.me/593979692701"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-gold font-sans text-sm font-bold hover:text-navy transition-colors"
                >
                  Consultar
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMUNIDAD DI MALI ═══ */}
      <section id="comunidad" className="py-16 sm:py-24 bg-navy relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="animate-on-scroll-right order-2 lg:order-1">
              <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
                Comunidad Di Mali
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mt-3 leading-tight">
                Un legado que{' '}
                <span className="text-gradient-gold italic">trasciende</span>
              </h2>
              <p className="mt-6 text-white/70 font-sans leading-relaxed text-sm sm:text-base">
                Cada pieza de Di Mali es un tributo a la maestría artesanal del Ecuador.
                Gracias por ser parte de esta historia de lujo y tradición.
              </p>

              {/* Contact info */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <span className="text-white/80 font-sans text-sm">+593 99 715 8532</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <span className="text-white/80 font-sans text-sm">@DiMalijewelry</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-white/80 font-sans text-sm">Guayaquil, Ecuador</span>
                </div>
              </div>
            </div>

            {/* Photo Collage */}
            <div className="animate-on-scroll-left order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-40 sm:h-52 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/comunidad-1.jpg"
                    alt="Comunidad Di Mali - Personas usando sombreros"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-40 sm:h-52 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/comunidad-2.jpg"
                    alt="Comunidad Di Mali - Clientes con sombreros"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-40 sm:h-52 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/comunidad-3.jpg"
                    alt="Comunidad Di Mali - Arte y tradición"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-40 sm:h-52 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/comunidad-4.jpg"
                    alt="Comunidad Di Mali - Estilo ecuatoriano"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="col-span-2 relative h-40 sm:h-52 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/comunidad-5.jpg"
                    alt="Comunidad Di Mali - Set Herencia Artesanal"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-serif text-lg sm:text-xl italic">Elegancia que se vive y se comparte</p>
                  </div>
                </div>
              </div>
            </div>
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
                  className={`faq-content ${openFaq === i ? 'open' : ''}`}
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
      <section className="py-16 sm:py-24 bg-warm-beige relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">
              ¿Listo para brillar?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-navy mt-4 leading-tight">
              Tu sombrero perfecto{' '}
              <span className="text-gradient-gold italic">te espera</span>
            </h2>
            <p className="mt-6 text-muted-foreground font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Solicita nuestro catálogo por WhatsApp y déjanos ayudarte a encontrar
              el sombrero de paja toquilla que refleje tu estilo único.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/593979692701"
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
                className="border-2 border-navy/20 hover:border-gold text-navy px-8 py-4 rounded-full text-base font-sans font-bold tracking-wide transition-all duration-300 hover:shadow-lg flex items-center gap-2"
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
              <div className="mb-4">
                <span className="font-serif text-3xl font-bold text-white">
                  Di<span className="text-gold">Mali</span>
                </span>
              </div>
              <p className="text-white/50 font-sans text-sm leading-relaxed max-w-xs">
                Sombreros de paja toquilla hechos a mano en Ecuador. Patrimonio Cultural Inmaterial de la Humanidad.
              </p>
              <p className="mt-4 text-white/40 font-sans text-sm">
                manos mágicas
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-serif text-white text-lg mb-4">Navegación</h4>
              <div className="space-y-2">
                {NAV_LINKS.map((link) => {
                  // For items with children, link to the first child; otherwise link directly
                  const targetHref = link.children ? link.children[0]?.href : link.href;
                  return (
                    <a
                      key={link.label}
                      href={targetHref}
                      className="block text-white/50 hover:text-gold font-sans text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  );
                })}
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
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z"/>
                  </svg>
                  TikTok: @dimalijewelry
                </a>
                <a
                  href="https://wa.me/593979692701"
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
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 font-sans text-xs sm:text-sm">
              © {new Date().getFullYear()} Di Mali. Todos los derechos reservados.
            </p>
            <a
              href="https://jimbra.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold/30 transition-all duration-300 group"
            >
              <Image
                src="/logo-jimbra.png"
                alt="Jimbra"
                width={18}
                height={18}
                className="rounded-sm object-contain"
              />
              <span className="text-white/40 font-sans text-[11px] tracking-wide group-hover:text-white/60 transition-colors">
                Desarrollado por{' '}
                <span className="text-gold font-semibold group-hover:text-gold-light transition-colors">
                  Jimbra
                </span>
              </span>
            </a>
          </div>
        </div>
      </footer>

      {/* ═══ FLOATING WHATSAPP BUTTON ═══ */}
      <a
        href="https://wa.me/593979692701"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gold hover:bg-gold-light rounded-full flex items-center justify-center shadow-2xl shadow-gold/30 transition-all duration-300 hover:scale-110 whatsapp-float"
        aria-label="Contactar por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
