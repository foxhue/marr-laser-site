#!/usr/bin/env node

/**
 * Seeds Sanity with MARR Laser & Skin Clinic content.
 * Run: node scripts/seed-content.mjs
 *
 * Requires SANITY_PROJECT_ID in .env and authenticated Sanity CLI.
 */

import { createClient } from '@sanity/client';
import { readFileSync, createReadStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Read config from .env manually (no dotenv dependency)
const envContent = readFileSync(resolve(root, '.env'), 'utf-8');
const env = Object.fromEntries(
  envContent
    .split('\n')
    .filter((line) => line.includes('=') && !line.startsWith('#'))
    .map((line) => {
      const [key, ...rest] = line.split('=');
      return [key.trim(), rest.join('=').trim()];
    })
);

// Read auth token from Sanity CLI config
const sanityConfigPath = resolve(
  process.env.HOME,
  '.config/sanity/config.json'
);
const sanityConfig = JSON.parse(readFileSync(sanityConfigPath, 'utf-8'));

const client = createClient({
  projectId: env.SANITY_PROJECT_ID,
  dataset: env.SANITY_DATASET || 'production',
  apiVersion: env.SANITY_API_VERSION || '2024-01-01',
  token: sanityConfig.authToken,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Portable Text helpers
// ---------------------------------------------------------------------------

function heading(key, text) {
  return {
    _key: key,
    _type: 'block',
    style: 'h2',
    children: [{ _key: `${key}c`, _type: 'span', text, marks: [] }],
    markDefs: [],
  };
}

function paragraph(key, text) {
  return {
    _key: key,
    _type: 'block',
    style: 'normal',
    children: [{ _key: `${key}c`, _type: 'span', text, marks: [] }],
    markDefs: [],
  };
}

function subheading(key, text) {
  return {
    _key: key,
    _type: 'block',
    style: 'h3',
    children: [{ _key: `${key}c`, _type: 'span', text, marks: [] }],
    markDefs: [],
  };
}

function bulletItem(key, text) {
  return {
    _key: key,
    _type: 'block',
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _key: `${key}c`, _type: 'span', text, marks: [] }],
    markDefs: [],
  };
}

// ---------------------------------------------------------------------------
// Content definitions
// ---------------------------------------------------------------------------

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Marr Laser & Skin Clinic',
  tagline:
    'Our wonderful team at Marr Laser and Skin Clinic are highly trained and have all the advanced technology and techniques to support every avenue in laser, skin, aesthetics & even more.',
  contactEmail: 'hello@marrlaserandskin.clinic',
  contactPhone: '01418402222',
  address: '18 Neilston Road, Paisley, Renfrewshire, PA2 6LN',
  openingHours: [
    { _key: 'sun', _type: 'openingHours', day: 'Sunday', open: '', close: '', closed: true },
    { _key: 'mon', _type: 'openingHours', day: 'Monday', open: '', close: '', closed: true },
    { _key: 'tue', _type: 'openingHours', day: 'Tuesday', open: '09:30', close: '18:00', closed: false },
    { _key: 'wed', _type: 'openingHours', day: 'Wednesday', open: '09:30', close: '18:00', closed: false },
    { _key: 'thu', _type: 'openingHours', day: 'Thursday', open: '09:30', close: '19:00', closed: false },
    { _key: 'fri', _type: 'openingHours', day: 'Friday', open: '09:30', close: '18:00', closed: false },
    { _key: 'sat', _type: 'openingHours', day: 'Saturday', open: '09:00', close: '16:00', closed: false },
  ],
  socialLinks: [
    { _key: 'fb', _type: 'socialLink', platform: 'facebook', url: 'https://www.facebook.com/MarrBeauty' },
    { _key: 'ig', _type: 'socialLink', platform: 'instagram', url: 'https://www.instagram.com/marrlaserandskin' },
  ],
  defaultSeo: {
    _type: 'seo',
    title: 'Marr Laser & Skin Clinic | Paisley, Renfrewshire',
    description:
      'Multi-award winning laser, skin and aesthetic clinic in Paisley. Medical-grade technology, highly trained team, book a consultation today.',
  },
};

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

const services = [
  // 1. Laser Treatments
  {
    _id: 'service-laser-treatments',
    _type: 'service',
    title: 'Laser Treatments',
    slug: { _type: 'slug', current: 'laser-treatments' },
    excerpt:
      'Marr Laser & Skin Clinic are delighted to be one of only a few clinics in Scotland to offer the latest ground breaking technology from DEKA Lasers \u2014 The Motus AY.',
    price: 'From \u00a319',
    duration: '15-60 min',
    featured: true,
    body: [
      heading('lt1', 'Laser Hair Removal'),
      paragraph(
        'lt2',
        'Alexandrite is universally considered the gold standard when it comes to laser hair removal. The Motus AY is the world\u2019s first FDA approved pain free Alexandrite for use on ALL skin types differentiating it from any other Alexandrite Laser technology on the market.'
      ),
      paragraph(
        'lt3',
        'The Motus overcomes these restrictions, providing the advantages of \u2018pain-free\u2019 laser hair removal but with the clinical efficacy and results associated with the alexandrite laser.'
      ),
      heading('lt4', 'Pigmented Lesions'),
      paragraph(
        'lt5',
        'Pigmented lesions are areas of the skin that have an abnormal accumulation of pigment, which can result in discoloration or dark spots. These lesions can be caused by various factors, including sun exposure, genetics, aging, hormonal changes, inflammation, or certain medical conditions. We offer removal using our Motus AY and Excelight IPL machines.'
      ),
      heading('lt6', 'Thread Vein Removal'),
      paragraph(
        'lt7',
        'Thread veins, also known as spider veins or telangiectasia, are small, dilated blood vessels near the surface of the skin that appear as thin, red, or purple lines. Treatment options include laser therapy and intense pulsed light (IPL) therapy. These treatments work by causing the affected blood vessels to collapse and gradually fade from view.'
      ),
      heading('lt8', 'Fungal Nail Treatment'),
      paragraph(
        'lt9',
        'Fungal nail infections, also known as onychomycosis, occur when fungi invade one or more of the nails. The Motus AY Laser heats up the nail throughout its depth causing the weakening and destruction of the fungus without the use of harmful chemicals or oral medication. It is completely safe and will require 4 treatments 1 week apart.'
      ),
      heading('lt10', 'Skin Rejuvenation (Moveo SR)'),
      paragraph(
        'lt11',
        'The Skin Rejuvenation Treatment boosts collagen production and plumps the skin to reduce the appearance of fine lines and wrinkles, giving the skin a radiant glow. The treatment also helps to lift and tighten the skin and freshen a dull and tired complexion.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: 'Laser Treatments Paisley | Marr Laser & Skin Clinic',
      description:
        'Advanced laser treatments in Paisley including pain-free hair removal, pigmentation removal, thread vein treatment, and skin rejuvenation using the Motus AY.',
    },
  },

  // 2. Skin Treatments
  {
    _id: 'service-skin-treatments',
    _type: 'service',
    title: 'Skin Treatments',
    slug: { _type: 'slug', current: 'skin-treatments' },
    excerpt:
      'Advanced skin rejuvenation including HIFU, RF Microneedling, IllumiFacial, chemical peels, and LED phototherapy. Tailored treatments for every skin concern.',
    price: 'From \u00a340',
    duration: '30-90 min',
    featured: true,
    body: [
      heading('st1', 'HIFU (High Intensity Focused Ultrasound)'),
      paragraph(
        'st2',
        'Give skin back its snap. HIFU uses Focused Ultrasound to target the deep structural layers of the skin with heat, without damaging the skin\u2019s surface. Focus Dual HIFU is one of the few treatments that can reach the superficial musculoaponeurotic system (SMAS) \u2014 which was previously accessible only via surgery. The result is a natural lift with virtually no downtime.'
      ),
      heading('st3', 'RF Microneedling'),
      paragraph(
        'st4',
        'Focus Dual uses a combination of radiofrequency and microneedling technology to create a controlled trauma which triggers the body\u2019s healing response of collagen and elastin production. With Focus Dual you receive two treatments in one, meaning that you will achieve a stronger treatment and more effective results than when compared to having microneedling and radiofrequency treatments individually.'
      ),
      heading('st5', 'IllumiFacial'),
      paragraph(
        'st6',
        'Together we can rejuvenate, enhance, and illuminate your skin\u2019s natural beauty. This quick and simple rejuvenating treatment dramatically improves skin tone and appearance, helping your skin feel and look its best as if lit from within. The treatment comprises of 4 stages: Cleanse, Tri-Fruit Acid Peel, Lynton IPL and Hydrate & Protect.'
      ),
      heading('st7', 'BioRePeel'),
      paragraph(
        'st8',
        'BioRePeel is a biphasic medical-grade chemical peel that combines various active ingredients to promote exfoliation, skin renewal, and rejuvenation. It is a 35% TCA Peel \u2014 among the most effective chemical peels available. For optimal results, we recommend a course of six sessions, spaced two weeks apart.'
      ),
      heading('st9', 'Dermalux LED Phototherapy'),
      paragraph(
        'st10',
        'Dermalux LED Phototherapy is a non-invasive facial treatment that uses narrow band, non-thermal LED light energy to trigger your body\u2019s natural cell processes to accelerate rejuvenation and repair of the skin. It uses three clinically proven wavelengths: red for rejuvenation, infrared for inflammation, and blue for acne-prone skin.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: 'Skin Treatments Paisley | Marr Laser & Skin Clinic',
      description:
        'Advanced skin treatments in Paisley including HIFU, RF Microneedling, IllumiFacial, BioRePeel, and LED phototherapy.',
    },
  },

  // 3. Aesthetic Treatments
  {
    _id: 'service-aesthetic-treatments',
    _type: 'service',
    title: 'Aesthetic Treatments',
    slug: { _type: 'slug', current: 'aesthetic-treatments' },
    excerpt:
      'Dermal fillers can plump thin lips, enhance shallow contours, soften facial creases, remove wrinkles and improve the appearance of scars.',
    price: 'From \u00a3139',
    duration: '30-60 min',
    featured: true,
    body: [
      heading('at1', 'Anti-Ageing Treatments'),
      paragraph(
        'at2',
        'Anti-Ageing Treatments are used to treat dynamic wrinkles by temporarily paralysing the muscles causing the skin to crease. The effects can usually be seen within 3-4 days post procedure with the complete result in 2 weeks. Results last between 3-6 months depending on each client.'
      ),
      heading('at3', 'Lip Enhancement'),
      paragraph(
        'at4',
        'Dermal fillers are made of Hyaluronic acid, a natural component within the skin. They can be used to restore lost facial volume, smooth wrinkles, sculpt the face and enhance the lips. We aim to create natural looking results using premium products and advanced techniques.'
      ),
      heading('at5', 'Tear Trough Filler'),
      paragraph(
        'at6',
        'Tear trough filler involves administering dermal fillers into the area beneath the lower eyelid and above the cheek. Tear trough fillers aim to restore volume, smooth out wrinkles, and reduce the appearance of under-eye bags or dark circles.'
      ),
      heading('at7', 'Facial Contouring'),
      paragraph(
        'at8',
        'We offer cheek fillers to restore volume and create a youthful contoured appearance, jawline fillers for a more defined and chiseled look, and chin fillers to improve overall facial balance and profile.'
      ),
      heading('at9', 'Profhilo'),
      paragraph(
        'at10',
        'Profhilo is a unique hyaluronic acid-based product used for skin rejuvenation and hydration. Unlike traditional dermal fillers, Profhilo focuses on improving overall skin quality and addressing skin laxity, stimulating collagen and elastin production, and providing hydration from within.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: 'Aesthetic Treatments Paisley | Marr Laser & Skin Clinic',
      description:
        'Professional aesthetic treatments in Paisley including anti-ageing, lip enhancement, dermal fillers, facial contouring, and Profhilo.',
    },
  },

  // 4. PMU Treatments
  {
    _id: 'service-pmu-treatments',
    _type: 'service',
    title: 'PMU Treatments',
    slug: { _type: 'slug', current: 'pmu-treatments' },
    excerpt:
      'Our Permanent Make Up is carried out by Jennifer Graham. Jen has a natural flair for brow treatments and has the added advantage that she is trained in tattooing and microblading.',
    price: 'From \u00a3300',
    duration: '90-120 min',
    featured: false,
    body: [
      heading('pm1', 'Barely There Brows'),
      paragraph(
        'pm2',
        'This technique also known as the \u2018powdered brow\u2019 is great for nervous first time clients or those looking for a natural and subtle result. Barely there brows are completed in two sessions six weeks apart. The treatment takes approximately 90 minutes including consultation and numbing.'
      ),
      heading('pm3', 'Microblading'),
      paragraph(
        'pm4',
        'Microblading is a semi-permanent tattoo technique where a handheld tool is used to create fine, hair-like strokes on the skin. This can give the appearance of fuller, more defined brows. The results typically last for 1-2 years. Microbladed brows are completed in 2 sessions, 6 weeks apart.'
      ),
      heading('pm5', 'Ombre Brows'),
      paragraph(
        'pm6',
        'Ombre brows, also known as powder brows, is a semi-permanent makeup technique designed to create a soft, gradient look that mimics the appearance of naturally filled-in eyebrows. A different type of shading technique, creating a more subtle colour at the bulb of the brow and a bold defined tail.'
      ),
      heading('pm7', 'Combination Brows'),
      paragraph(
        'pm8',
        'Combination brows, also known as hybrid brows, combine the natural-looking hair strokes of microblading with the shading technique of ombre brows. This method creates fuller, more defined eyebrows with a realistic appearance. Completed in two sessions six weeks apart.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: 'Permanent Makeup Paisley | Marr Laser & Skin Clinic',
      description:
        'Semi-permanent makeup in Paisley including microblading, ombre brows, and combination brows by specialist Jennifer Graham.',
    },
  },

  // 5. CACI Treatments
  {
    _id: 'service-caci-treatments',
    _type: 'service',
    title: 'CACI Treatments',
    slug: { _type: 'slug', current: 'caci-treatments' },
    excerpt:
      'Tailored treatment solutions for men and women of all ages and skin types. Described by the media as the non-surgical face lift.',
    price: 'From \u00a328',
    duration: '15-80 min',
    featured: false,
    body: [
      paragraph(
        'ca1',
        'CACI International has paved the way in anti-ageing, skin rejuvenation and problematic skin solutions for over three decades. Described by the media as \u2018the non-surgical face lift\u2019, CACI has become the go-to red-carpet treatment for numerous celebrities.'
      ),
      heading('ca2', 'Signature Non-Surgical Facial (60 min \u2014 \u00a350)'),
      paragraph(
        'ca3',
        'This non-invasive facial uses microcurrent impulses to lift, tone and reduce the appearance of fine lines and wrinkles. It also firms your face and gives your skin a more youthful, fresh appearance and glow.'
      ),
      heading('ca4', 'CACI Microdermabrasion (45 min \u2014 \u00a350)'),
      paragraph(
        'ca5',
        'This treatment leaves the complexion looking smooth and radiantly healthy. A combination of red and blue LED light therapy, deep cleansing and skin exfoliation techniques are used to effectively brighten and even the skin tone.'
      ),
      heading('ca6', 'Ultimate Non-Surgical Facial (80 min \u2014 \u00a370)'),
      paragraph(
        'ca7',
        'The Ultimate procedure incorporates muscle lifting and toning, microdermabrasion, LED light therapy, plumping of fine lines and wrinkles and a hydrating gel mask to rejuvenate and brighten the skin.'
      ),
      heading('ca8', 'CACI Jowl Lift (15 min \u2014 \u00a328)'),
      paragraph(
        'ca9',
        'This treatment lifts and firms the muscles and redefines facial contours to give a firmer, more toned appearance. Ideal for women and men wanting to improve the appearance of sagging jowls.'
      ),
      heading('ca10', 'CACI Eye Revive (30 min \u2014 \u00a330)'),
      paragraph(
        'ca11',
        'Lift and firm muscles around the eye area. This treatment uses serum filled microcurrent rollers together with the soothing Eye Revive Mask to reduce puffiness and dark circles, and soften the appearance of fine lines and wrinkles around the eyes.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: 'CACI Treatments Paisley | Marr Laser & Skin Clinic',
      description:
        'CACI non-surgical face lift treatments in Paisley. Microcurrent facials, jowl lift, eye revive, and microdermabrasion.',
    },
  },
];

// ---------------------------------------------------------------------------
// Team Members
// ---------------------------------------------------------------------------

const teamMembers = [
  {
    _id: 'team-member-1',
    _type: 'teamMember',
    name: 'Emma',
    role: 'Director & Owner',
    bio: [
      paragraph(
        'tm1b1',
        "Hi, I'm Emma, the owner of Marr Laser and Skin Clinic. My passion for the industry stems from being a teenager with extremely problematic skin which impacted me greatly. This has evolved into a lifelong journey, following this passion and opening Marr Laser and Skin Clinic. I have taken the step to invest in medical grade technology from aesthetic award winning Lynton and continue to invest in the team. Whether you are looking for a one off treatment or a long term course for a dramatic result, we have you covered. Why not visit us and see for yourself?"
      ),
    ],
    quote: 'Your skin tells a story — we are here to help you write the next chapter.',
    specialisms: ['Laser Hair Removal', 'Skin Rejuvenation', 'HIFU', 'RF Microneedling', 'LED Phototherapy'],
    qualifications: ['Medical-Grade Laser Specialist', 'Lynton Certified', 'Business Owner'],
    order: 1,
  },
  {
    _id: 'team-member-2',
    _type: 'teamMember',
    name: 'Jennifer Graham',
    role: 'PMU Specialist',
    bio: [
      paragraph(
        'tm2b1',
        'Jen has a natural flair for brow treatments and has the added advantage that she is trained in tattooing and microblading. This gives her a unique ability to carry out the ultimate bespoke brow.'
      ),
    ],
    quote: 'Great brows frame the face — I create brows that are uniquely yours.',
    specialisms: ['Microblading', 'Ombre Brows', 'Combination Brows', 'Barely There Brows'],
    qualifications: ['Semi-Permanent Makeup', 'Microblading', 'Tattooing'],
    order: 2,
  },
  {
    _id: 'team-member-3',
    _type: 'teamMember',
    name: 'Fraser',
    role: 'Aesthetic Practitioner',
    bio: [
      paragraph(
        'tm3b1',
        'Experienced aesthetic practitioner specialising in advanced injectable treatments and skin care. Committed to providing personalised care and natural-looking results.'
      ),
    ],
    quote: 'Subtle enhancements that let your confidence shine through.',
    specialisms: ['Anti-Ageing Treatments', 'Dermal Fillers', 'Lip Enhancement', 'Profhilo'],
    qualifications: ['Aesthetic Practitioner', 'Injectable Treatments'],
    order: 3,
  },
  {
    _id: 'team-member-4',
    _type: 'teamMember',
    name: 'Katie',
    role: 'Beauty Therapist',
    bio: [
      paragraph(
        'tm4b1',
        'Skilled beauty therapist with expertise across a wide range of treatments. Dedicated to ensuring every client feels comfortable and leaves looking and feeling their best.'
      ),
    ],
    quote: 'Everyone deserves to feel pampered — self-care is not a luxury.',
    specialisms: ['CACI Facials', 'BioRePeel', 'IllumiFacial', 'Dermalux LED'],
    qualifications: ['Beauty Therapy', 'Skin Care Specialist'],
    order: 4,
  },
];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

const testimonials = [
  {
    _id: 'testimonial-1',
    _type: 'testimonial',
    quote:
      'Absolutely amazing results! The team made me feel so comfortable and the laser hair removal has been life-changing. Would highly recommend Marr Laser to anyone.',
    author: 'Verified Client',
    rating: 5,
    service: { _type: 'reference', _ref: 'service-laser-treatments' },
  },
  {
    _id: 'testimonial-2',
    _type: 'testimonial',
    quote:
      'I had a course of skin treatments and my skin has never looked better. The staff are knowledgeable, friendly, and the clinic is beautiful. Five stars!',
    author: 'Verified Client',
    rating: 5,
    service: { _type: 'reference', _ref: 'service-skin-treatments' },
  },
  {
    _id: 'testimonial-3',
    _type: 'testimonial',
    quote:
      'From the consultation to the final treatment, the whole experience was professional and welcoming. The results speak for themselves.',
    author: 'Verified Client',
    rating: 5,
  },
];

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

const faqs = [
  {
    _id: 'faq-1',
    _type: 'faq',
    question: 'How many treatments will I need?',
    answer: [
      paragraph(
        'f1a',
        "The laser targets actively growing follicles; since not all follicles grow simultaneously, multiple sessions are necessary. Most people need 6 treatments spaced 4-6 weeks apart, though up to 8 treatments might be needed."
      ),
    ],
    category: 'Laser Hair Removal',
    order: 1,
  },
  {
    _id: 'faq-2',
    _type: 'faq',
    question: 'Is it pain free?',
    answer: [
      paragraph(
        'f2a',
        'Yes, the Motus AY laser is often described as pain-free or significantly less painful compared to traditional laser hair removal systems. The device uses advanced technology, including the Moveo handpiece, which allows for a gradual heating process that is more comfortable.'
      ),
    ],
    category: 'Laser Hair Removal',
    order: 2,
  },
  {
    _id: 'faq-3',
    _type: 'faq',
    question: 'Can the Motus AY be used on all skin types?',
    answer: [
      paragraph(
        'f3a',
        'Yes, the Motus AY is suitable for all skin types, including darker and tanned skin. This is the first system in the world that uses the Alexandrite laser to safely treat darker skin types from Fitzpatrick 4-6.'
      ),
    ],
    category: 'Laser Hair Removal',
    order: 3,
  },
  {
    _id: 'faq-4',
    _type: 'faq',
    question: 'Is a test patch necessary?',
    answer: [
      paragraph(
        'f4a',
        'Yes, a test patch is essential. While adverse reactions are rare, we always begin with a test patch to ensure the laser settings are compatible with your specific skin type.'
      ),
    ],
    category: 'Laser Hair Removal',
    order: 4,
  },
  {
    _id: 'faq-5',
    _type: 'faq',
    question: 'Can you undergo treatment year-round?',
    answer: [
      paragraph(
        'f5a',
        'You can undergo the treatment year-round, even if you have a tan in the summer. The Motus AY laser is the first system worldwide approved for treating tanned skin.'
      ),
    ],
    category: 'Laser Hair Removal',
    order: 5,
  },
  {
    _id: 'faq-6',
    _type: 'faq',
    question: 'Preparing for your treatment',
    answer: [
      paragraph(
        'f6a',
        'Shave the area to be treated 24 hours before your appointment. Avoid waxing, plucking, or using depilatory creams for at least four weeks before the treatment, as these methods remove the hair root that the laser targets.'
      ),
    ],
    category: 'Laser Hair Removal',
    order: 6,
  },
  {
    _id: 'faq-7',
    _type: 'faq',
    question: 'What is eyebrow tattooing?',
    answer: [
      paragraph(
        'f7a',
        'Eyebrow tattooing is a semi-permanent cosmetic procedure that uses pigment to fill in or shape the eyebrows. It can create the appearance of fuller, more defined brows and is often done using techniques like microblading or powder brows.'
      ),
    ],
    category: 'Eyebrow Tattooing',
    order: 7,
  },
  {
    _id: 'faq-8',
    _type: 'faq',
    question: 'What are the different techniques?',
    answer: [
      paragraph(
        'f8a',
        'Three methods: Microblading involves manually creating fine, hair-like strokes. Powder Brows use a machine to create a soft, powdered effect. Combo Brows combine microblading and powder brows to achieve a natural yet defined look.'
      ),
    ],
    category: 'Eyebrow Tattooing',
    order: 8,
  },
  {
    _id: 'faq-9',
    _type: 'faq',
    question: 'How long does eyebrow tattooing last?',
    answer: [
      paragraph(
        'f9a',
        'Eyebrow tattoos are semi-permanent and generally last between 1-3 years, depending on factors like skin type, lifestyle, and aftercare.'
      ),
    ],
    category: 'Eyebrow Tattooing',
    order: 9,
  },
  {
    _id: 'faq-10',
    _type: 'faq',
    question: 'Is it painful?',
    answer: [
      paragraph(
        'f10a',
        'Most clients experience minimal discomfort during the procedure. A topical anesthetic is applied to numb the area, making the process more comfortable.'
      ),
    ],
    category: 'Eyebrow Tattooing',
    order: 10,
  },
  {
    _id: 'faq-11',
    _type: 'faq',
    question: 'What is the Excelight medical-grade IPL machine?',
    answer: [
      paragraph(
        'f11a',
        'The Excelight is a powerful and compact device, designed to provide safe and effective hair removal and skin rejuvenation treatments. It uses multiple wavelengths of light to treat a broad spectrum of skin conditions.'
      ),
    ],
    category: 'Excelight IPL',
    order: 11,
  },
  {
    _id: 'faq-12',
    _type: 'faq',
    question: 'What conditions can the Excelight IPL machine treat?',
    answer: [
      paragraph(
        'f12a',
        'The device is capable of treating acne, rosacea, vascular lesions, pigmentation, sun damage, and permanent hair reduction.'
      ),
    ],
    category: 'Excelight IPL',
    order: 12,
  },
  {
    _id: 'faq-13',
    _type: 'faq',
    question: 'What are your opening hours?',
    answer: [
      paragraph(
        'f13a',
        "We're open Tuesday-Friday 9:30am-6pm (late appointments until 7pm on Thursdays), Saturday 9am-4pm. Closed Sundays and Mondays."
      ),
    ],
    category: 'General',
    order: 13,
  },
  {
    _id: 'faq-14',
    _type: 'faq',
    question: 'Where are you located?',
    answer: [
      paragraph(
        'f14a',
        "We're located at 18 Neilston Road, Paisley, Renfrewshire, PA2 6LN."
      ),
    ],
    category: 'General',
    order: 14,
  },
  {
    _id: 'faq-15',
    _type: 'faq',
    question: 'Do you offer consultations?',
    answer: [
      paragraph(
        'f15a',
        "Yes, we offer consultations for all treatments. Laser/IPL consultations are \u00a310, skin/aesthetic consultations are \u00a320, and semi-permanent makeup consultations are free."
      ),
    ],
    category: 'General',
    order: 15,
  },
];

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

const pages = [
  {
    _id: 'page-about',
    _type: 'page',
    title: 'About Us',
    slug: { _type: 'slug', current: 'about' },
    hero: {
      _type: 'hero',
      heading: 'About Marr Laser & Skin Clinic',
      tagline: 'Experience the best laser and skincare treatments in Paisley.',
    },
    body: [
      heading('ab1', 'Our Story'),
      paragraph(
        'ab2',
        "Hi, I'm Emma, the owner of Marr Laser and Skin Clinic. My passion for the industry stems from being a teenager with extremely problematic skin which impacted me greatly. This has evolved into a lifelong journey, following this passion and opening Marr Laser and Skin Clinic. I have taken the step to invest in medical grade technology from aesthetic award winning Lynton and continue to invest in the team. Whether you are looking for a one off treatment or a long term course for a dramatic result, we have you covered. Why not visit us and see for yourself?"
      ),
      heading('ab3', 'Our Approach'),
      paragraph(
        'ab4',
        'We take a personalised approach to every client. During your consultation, we listen to your goals, assess your needs, and create a treatment plan tailored specifically to you. We use only medical-grade equipment from aesthetic award winning Lynton and premium products to ensure the best possible results.'
      ),
      heading('ab5', 'Our Technology'),
      paragraph(
        'ab6',
        'We have invested in the latest medical-grade technology including the Cynosure Elite+, the Motus AY from DEKA Lasers, the Excelight IPL system, the Focus Dual combining HIFU and RF microneedling, and CO2 fractional laser for skin resurfacing. This means we can offer the widest range of safe, effective treatments.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: 'About Us | Marr Laser & Skin Clinic, Paisley',
      description:
        'Learn about Marr Laser & Skin Clinic in Paisley. Multi-award winning clinic with medical-grade technology and a passionate, highly trained team.',
    },
  },
];

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

const blogPosts = [
  // 1. Why I Stopped Recommending Fillers
  {
    _id: 'blog-stopped-recommending-fillers',
    _type: 'blogPost',
    title: 'Why I Stopped Recommending Fillers (And What I Do Instead)',
    slug: { _type: 'slug', current: 'why-i-stopped-recommending-fillers' },
    publishedAt: '2026-04-21T09:00:00Z',
    excerpt:
      'After years in the industry, I stopped recommending dermal fillers. Here\u2019s what I\u2019ve seen, why I changed my mind, and the treatments I genuinely believe in now.',
    categories: ['Skin Advice', 'Anti-Ageing', 'Treatments'],
    body: [
      paragraph(
        'bf1',
        'I\u2019ll be honest with you. A few years ago, dermal fillers were everywhere in this industry, and plenty of clinics were happy to keep injecting them into anyone who asked. I used to sit with clients who\u2019d come in wanting more filler because they\u2019d seen someone on Instagram with sculpted cheekbones and puffy lips, and I\u2019d think to myself, is this actually helping her skin, or am I just chasing a trend?'
      ),
      paragraph(
        'bf2',
        'So I stopped. And I want to explain why, because I think women in their 30s, 40s and 50s deserve to know what\u2019s really going on before they sit in anyone\u2019s treatment chair.'
      ),
      heading('bf3', 'The problem with how fillers are being used'),
      paragraph(
        'bf4',
        'Fillers aren\u2019t evil. In the right hands, for the right reason, they have their place. But the way they\u2019re being used on the high street now is a different story. Too much, too often, in the wrong areas, and without any real long-term thinking.'
      ),
      paragraph(
        'bf5',
        'Here\u2019s what I\u2019ve seen with my own eyes over the years:'
      ),
      bulletItem('bf6', 'Filler migrating away from where it was injected and settling in places it shouldn\u2019t'),
      bulletItem('bf7', 'Chronic low-grade swelling that clients didn\u2019t even realise was swelling, because it had been there for years'),
      bulletItem('bf8', 'That heavy, overfilled look that ages a face rather than freshening it'),
      bulletItem('bf9', 'Skin that looked stretched, tired and genuinely worse than when we started'),
      paragraph(
        'bf10',
        'The research coming out now is catching up with what a lot of us practitioners have been quietly saying for years. Filler doesn\u2019t always fully dissolve. It can sit in the tissue for far longer than we were told, and it can cause problems you only notice when you finally stop.'
      ),
      heading('bf11', 'So what do I actually recommend now?'),
      paragraph(
        'bf12',
        'I work with a few treatments that do the opposite of what filler does. Instead of adding volume from the outside, they work with your own skin to improve quality, tone and firmness from within. Here\u2019s the honest breakdown.'
      ),
      subheading('bf13', 'Focus Dual HIFU'),
      paragraph(
        'bf14',
        'This is one of my favourites for women who want lift without anything injected. It uses focused ultrasound energy to target the deeper layers of your skin, the same layer a surgeon would tighten in a facelift. No needles, no downtime, and the results build gradually over a few months. It looks like you, just a fresher, lifted version of you.'
      ),
      subheading('bf15', 'Calecim Exosome Microneedling'),
      paragraph(
        'bf16',
        'If you\u2019ve not heard of exosomes yet, you will soon. They\u2019re tiny signalling molecules that tell your skin cells to behave younger, and when combined with medical microneedling, the results on skin texture, tone and radiance are genuinely impressive. It\u2019s become one of the most requested treatments at the clinic, and for good reason.'
      ),
      subheading('bf17', 'Preventative anti-wrinkle treatments'),
      paragraph(
        'bf18',
        'Small, thoughtful doses of anti-wrinkle injections in the right muscles can soften lines before they become permanent. Done properly, nobody should be able to tell you\u2019ve had anything done. You just look well-rested.'
      ),
      heading('bf19', 'What this means for you'),
      paragraph(
        'bf20',
        'If you\u2019ve been thinking about fillers, or you\u2019ve had them before and you\u2019re not sure what to do next, my advice is this. Don\u2019t rush into another syringe. Come in for a proper consultation and let\u2019s look at your skin, your face and your goals together. There\u2019s almost always a better way to get you where you want to be.'
      ),
      paragraph(
        'bf21',
        'You\u2019re not a canvas for whatever trend is passing through TikTok. You\u2019re a real woman with real skin, and the goal should always be healthier skin, not more stuff in your face.'
      ),
      paragraph(
        'bf22',
        'Ready to chat through your options? Book a consultation at Marr Laser & Skin Clinic in Paisley. We\u2019ll give you an honest assessment, no pressure, and a plan that\u2019s actually right for your skin.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: 'Why I Stopped Recommending Fillers | Marr Laser & Skin Clinic Paisley',
      description:
        'Clinic owner Emma Marr on why she moved away from dermal fillers and the HIFU, exosome and anti-wrinkle treatments she recommends instead. Paisley clinic.',
    },
  },

  // 2. Preventative Botox in Your 30s
  {
    _id: 'blog-preventative-botox-30s',
    _type: 'blogPost',
    title: 'Preventative Botox in Your 30s: What I Wish I\u2019d Known Sooner',
    slug: { _type: 'slug', current: 'preventative-botox-in-your-30s' },
    publishedAt: '2026-04-14T09:00:00Z',
    excerpt:
      'Emma Marr explains why starting anti-wrinkle treatment in your 30s, in small thoughtful doses, is about preserving your skin rather than chasing youth.',
    categories: ['Anti-Wrinkle', 'Preventative Care', 'Skin Advice'],
    body: [
      paragraph(
        'bb1',
        'When I was in my early 30s, anti-wrinkle injections felt like something you did when the damage was already done. You waited until the lines were carved into your forehead, then you panicked and booked in. Now, years later and having treated hundreds of women, I honestly wish someone had sat me down and explained how much easier it is if you start earlier, in small, considered doses.'
      ),
      paragraph(
        'bb2',
        'This is the blog I wish I\u2019d read when I was 32.'
      ),
      heading('bb3', 'What does \u201Cpreventative\u201D actually mean?'),
      paragraph(
        'bb4',
        'When we talk about lines on your face, there are two types. Dynamic lines are the ones that appear when you move, so when you frown, smile, or raise your eyebrows. Static lines are the ones that stay there even when your face is relaxed, because the skin has been creased in the same spot so many times that it can\u2019t fully smooth out anymore.'
      ),
      paragraph(
        'bb5',
        'Preventative anti-wrinkle treatment is about softening those dynamic lines before they have a chance to become static. Once a static line has formed properly, no injection in the world will fully erase it. You can soften it, improve it, but not undo it. So the clever play is getting in before that happens.'
      ),
      heading('bb6', 'But won\u2019t I look frozen?'),
      paragraph(
        'bb7',
        'This is the single most common question I get asked, and I love it because it tells me the client actually cares about looking like herself. The answer is no, not if it\u2019s done properly.'
      ),
      paragraph(
        'bb8',
        'Preventative treatment uses much smaller doses than traditional anti-wrinkle treatment. The goal isn\u2019t to freeze your face. It\u2019s to gently soften the muscle activity that\u2019s creating the creases, while leaving enough movement that you still look expressive and alive. If your practitioner is telling you they\u2019re going to wipe out all movement, find a different practitioner.'
      ),
      paragraph(
        'bb9',
        'A well-done treatment should leave your friends saying you look well-rested, not asking if you\u2019ve had something done.'
      ),
      heading('bb10', 'When should you start?'),
      paragraph(
        'bb11',
        'There\u2019s no magic age. It depends on your skin, your muscle strength, your lifestyle and your genetics. Some women in their late 20s start noticing dynamic lines that bother them. Others sail through their 30s without a concern. A good consultation will tell you whether you actually need it yet, and if you don\u2019t, I\u2019ll tell you that. I\u2019d much rather send you home and see you in a year than sell you something you don\u2019t need.'
      ),
      heading('bb12', 'How often do you need treatments?'),
      paragraph(
        'bb13',
        'Most clients come in every three to four months. Some can stretch it to five or six, especially once they\u2019ve been having treatment for a while and their muscles have gently re-trained. It\u2019s not a monthly commitment. It\u2019s a quiet bit of maintenance a few times a year.'
      ),
      heading('bb14', 'Things nobody tells you about preventative treatment'),
      bulletItem('bb15', 'You\u2019ll probably need less product over time, not more. Muscles that aren\u2019t constantly contracting become easier to manage.'),
      bulletItem('bb16', 'The first couple of weeks can feel slightly heavy while your muscles adjust. This settles quickly.'),
      bulletItem('bb17', 'Your makeup will sit differently on smoother skin. In a good way.'),
      bulletItem('bb18', 'It\u2019s not a replacement for good skincare. It works alongside it, not instead of it.'),
      heading('bb19', 'My honest take'),
      paragraph(
        'bb20',
        'If I could rewind and speak to my 32 year old self, I\u2019d tell her to stop worrying about whether it was \u201Ctoo soon\u201D and just go and get a proper consultation. Not to book a treatment necessarily, but to get a real, expert opinion on what her face actually needed.'
      ),
      paragraph(
        'bb21',
        'Most of the women I treat in their 30s tell me the same thing six months in. They wish they\u2019d done it sooner.'
      ),
      paragraph(
        'bb22',
        'Curious whether preventative anti-wrinkle treatment is right for you? Book a no-obligation consultation at Marr Laser & Skin Clinic in Paisley and we\u2019ll have a proper, honest chat about your skin.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: 'Preventative Botox in Your 30s | Marr Laser & Skin Clinic Paisley',
      description:
        'Thinking about preventative anti-wrinkle injections in your 30s? Emma Marr explains when to start, what to expect and why natural-looking results matter. Paisley.',
    },
  },

  // 3. Laser Hair Removal: Why the Machine Matters
  {
    _id: 'blog-laser-machine-matters',
    _type: 'blogPost',
    title: 'Laser Hair Removal: Why the Machine Matters More Than the Price',
    slug: { _type: 'slug', current: 'laser-hair-removal-machine-matters' },
    publishedAt: '2026-04-07T09:00:00Z',
    excerpt:
      'Most women who come to us frustrated with laser hair removal haven\u2019t been having laser at all. Here\u2019s why the machine matters more than the price tag.',
    categories: ['Laser Hair Removal', 'Treatments', 'Buyer\u2019s Guide'],
    body: [
      paragraph(
        'bl1',
        'There\u2019s a conversation I have at least once a week. A woman books in, tells me she\u2019s already had eight sessions of laser hair removal somewhere else, and she\u2019s frustrated because the hair is still growing back. She paid a decent amount of money, followed the aftercare, did everything right, and her legs still need shaving.'
      ),
      paragraph(
        'bl2',
        'And then she sits on my treatment bed, we do a patch test with the Alexandrite laser, and she books a course. Because it turns out she hadn\u2019t actually been having laser hair removal at all.'
      ),
      heading('bl3', 'Laser vs IPL: they\u2019re not the same thing'),
      paragraph(
        'bl4',
        'This is the big one, and it\u2019s where most women get caught out. IPL and laser are not the same treatment. They\u2019re not even close, despite being marketed like they are.'
      ),
      paragraph(
        'bl5',
        'IPL stands for Intense Pulsed Light. It uses a broad spectrum of light wavelengths that scatter across the skin. It\u2019s cheaper to buy, cheaper to run, and cheaper to deliver. That\u2019s why you see it in so many salons on the high street at bargain prices. The problem is that because the light is scattered, only a small portion of it is actually doing anything useful to the hair follicle. You need more sessions, the results are less reliable, and it simply doesn\u2019t work as well on finer hair, darker skin tones or stubborn areas.'
      ),
      paragraph(
        'bl6',
        'A proper laser uses a single, focused wavelength specifically tuned to target the pigment in the hair follicle. That\u2019s it. No scattering. No guessing. Just precise, targeted energy going exactly where it needs to go.'
      ),
      heading('bl7', 'Why we chose the Alexandrite'),
      paragraph(
        'bl8',
        'When I was researching which laser to invest in for the clinic, I wasn\u2019t looking for the cheapest option. I was looking for the one that actually worked. After a lot of digging and speaking to practitioners across the country, I kept hearing the same answer. The Alexandrite is the gold standard for laser hair removal, particularly for the skin tones we most commonly treat in Scotland.'
      ),
      paragraph(
        'bl9',
        'We\u2019re the only clinic in Paisley with a genuine medical-grade Alexandrite laser. Not a similar machine. Not an IPL dressed up with fancy branding. The actual Alexandrite.'
      ),
      paragraph(
        'bl10',
        'Here\u2019s why that matters to you:'
      ),
      bulletItem('bl11', 'Fewer sessions. Most clients see genuine reduction within 6 to 8 sessions, rather than the 12 plus you might need with IPL.'),
      bulletItem('bl12', 'Better results on finer hairs, which IPL really struggles with.'),
      bulletItem('bl13', 'Faster treatment times, because the Alexandrite delivers energy more efficiently.'),
      bulletItem('bl14', 'Long-term reduction you can actually see, rather than temporary thinning that grows back in full within a year.'),
      heading('bl15', 'The hidden cost of \u201Ccheap\u201D laser'),
      paragraph(
        'bl16',
        'I understand the appeal of a cheaper price. We\u2019re all watching what we spend. But here\u2019s the maths I always share with clients who are weighing it up.'
      ),
      paragraph(
        'bl17',
        'If you spend ten pounds less per session but need double the sessions, you\u2019ve not saved money. You\u2019ve spent more, and you\u2019ve been shaving and plucking through an extra year of your life while you waited for it to work. The cheap option usually ends up being the expensive one, once you add it all up.'
      ),
      heading('bl18', 'What to ask before you book anywhere'),
      bulletItem('bl19', 'What make and model is the machine? A good clinic will tell you without hesitation.'),
      bulletItem('bl20', 'Is it laser or IPL? If they dodge the question, you have your answer.'),
      bulletItem('bl21', 'Who operates it and what training do they have?'),
      bulletItem('bl22', 'Do they do a patch test before starting a course?'),
      paragraph(
        'bl23',
        'If a clinic can\u2019t answer those four questions confidently, keep your money in your purse.'
      ),
      paragraph(
        'bl24',
        'Book a free patch test at Marr Laser & Skin Clinic in Paisley and see the difference real laser hair removal makes. It\u2019s time to stop shaving.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: 'Laser Hair Removal Paisley: Why the Machine Matters | Marr Clinic',
      description:
        'Confused between laser and IPL hair removal? Emma Marr explains why the Alexandrite laser delivers better, faster results. Paisley\u2019s only medical-grade clinic.',
    },
  },

  // 4. Exosomes Explained
  {
    _id: 'blog-exosomes-explained',
    _type: 'blogPost',
    title: 'Exosomes Explained: The Skincare Breakthrough That Actually Lives Up to the Hype',
    slug: { _type: 'slug', current: 'exosomes-explained-calecim-microneedling' },
    publishedAt: '2026-03-31T09:00:00Z',
    excerpt:
      'Everyone\u2019s talking about exosomes, but what do they actually do? Emma Marr breaks down the science, why Calecim stands out, and what to expect from treatment.',
    categories: ['Skincare Science', 'Exosomes', 'Treatments'],
    body: [
      paragraph(
        'be1',
        'Every few years, a new word takes over the skincare world. Peptides had their moment. Then it was retinol, then hyaluronic acid, then stem cells. Right now, the word on everyone\u2019s lips is exosomes, and I\u2019ll be completely honest with you. For once, the hype is justified.'
      ),
      paragraph(
        'be2',
        'But you probably don\u2019t want a biology lecture. You want to know what they actually do, whether they\u2019re worth the money, and whether they\u2019re going to do something real for your skin. So let\u2019s break it down properly.'
      ),
      heading('be3', 'What on earth is an exosome?'),
      paragraph(
        'be4',
        'Think of exosomes as tiny messengers. They\u2019re microscopic packages that cells use to send information to each other. When a young, healthy cell sends an exosome to another cell, it essentially tells that cell how to behave. Repair faster. Produce more collagen. Calm down inflammation. Wake up.'
      ),
      paragraph(
        'be5',
        'As we age, our cells stop sending as many of these messages, and the messages they do send aren\u2019t as strong. Which is part of the reason skin starts to look tired, dull and slower to recover.'
      ),
      paragraph(
        'be6',
        'Exosome treatments are essentially a way of delivering those youthful, high-quality messages directly back into your skin, so your cells remember what they\u2019re supposed to be doing.'
      ),
      heading('be7', 'Why Calecim, specifically'),
      paragraph(
        'be8',
        'Here\u2019s where I need to be really clear. Not all exosomes are equal. There are a lot of products on the market right now claiming to contain exosomes, and frankly, some of them are marketing fluff dressed up in a fancy bottle.'
      ),
      paragraph(
        'be9',
        'We use Calecim at the clinic because it\u2019s one of the most clinically studied exosome products in the world. It\u2019s derived from ethically sourced red deer umbilical cord lining stem cells, which sounds strange when you say it out loud, but the science behind it is genuinely impressive. The exosomes are potent, stable, and actually do what they say they\u2019ll do.'
      ),
      paragraph(
        'be10',
        'We chose it because it works. It\u2019s that simple.'
      ),
      heading('be11', 'What does the treatment actually involve?'),
      paragraph(
        'be12',
        'We combine the Calecim with medical microneedling. The microneedling creates thousands of tiny channels in your skin, which does two things. First, it kicks your own collagen production into gear, which is already beneficial on its own. Second, it gives the exosomes a direct route into the deeper layers of your skin where they can actually get to work.'
      ),
      paragraph(
        'be13',
        'The treatment itself takes about an hour. Most clients describe it as a prickling or scratching sensation rather than painful, and we use numbing cream beforehand to keep things comfortable. Afterwards, your skin will feel warm and look a bit pink, like a mild sunburn. By the next morning, most people are back to normal.'
      ),
      heading('be14', 'Who is it actually for?'),
      paragraph(
        'be15',
        'Honestly, most women over 30 will see a benefit. But it\u2019s particularly brilliant for:'
      ),
      bulletItem('be16', 'Dull, tired-looking skin that\u2019s lost its bounce'),
      bulletItem('be17', 'Fine lines, especially around the eyes and mouth'),
      bulletItem('be18', 'Acne scarring or uneven texture'),
      bulletItem('be19', 'Post-laser recovery, to speed up healing and enhance results'),
      bulletItem('be20', 'Anyone who wants genuine skin quality improvement without anything injected'),
      heading('be21', 'What sort of results should you expect?'),
      paragraph(
        'be22',
        'I\u2019ll be straight with you. You won\u2019t leave the clinic looking like a different person. Exosome treatments work with your skin over time, not overnight. Most clients start seeing a proper difference around the four week mark, and the results keep improving over the following two to three months as your collagen builds.'
      ),
      paragraph(
        'be23',
        'Skin looks brighter. Feels firmer. Sits differently under makeup. Old scars soften. That kind of change.'
      ),
      paragraph(
        'be24',
        'We usually recommend a course of three treatments spaced four to six weeks apart for the best results, then a top-up once or twice a year to maintain.'
      ),
      heading('be25', 'Is it worth it?'),
      paragraph(
        'be26',
        'If you\u2019re looking for a treatment that actually improves the quality of your skin, rather than just masking the surface, yes. This is one of the treatments I\u2019m most proud to offer, because the results speak for themselves. I\u2019ve got clients in their 50s whose skin genuinely looks better now than it did in their 40s, and this is a big part of that.'
      ),
      paragraph(
        'be27',
        'Want to find out whether Calecim Exosome Microneedling is right for your skin? Book a consultation at Marr Laser & Skin Clinic in Paisley and let\u2019s have a proper look together.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: 'Calecim Exosome Microneedling Paisley | Marr Laser & Skin Clinic',
      description:
        'Curious about exosome microneedling? Emma Marr explains how Calecim works, what results to expect and who it\u2019s best for. Book a consultation in Paisley.',
    },
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Blog cover image mapping
// ---------------------------------------------------------------------------

const blogCoverImages = [
  {
    blogId: 'blog-stopped-recommending-fillers',
    file: 'services/skin-hero.jpg',
    alt: 'Emma Marr consulting with a client about non-filler facial treatments at Marr Laser & Skin Clinic in Paisley',
    caption: 'There\u2019s almost always a better way to get you where you want to be.',
  },
  {
    blogId: 'blog-preventative-botox-30s',
    file: 'services/aesthetic-hero.jpg',
    alt: 'Close-up of a woman in her 30s smiling confidently after preventative anti-wrinkle treatment at Marr Laser & Skin Clinic',
    caption: 'Most of the women I treat in their 30s tell me the same thing six months in. They wish they\u2019d done it sooner.',
  },
  {
    blogId: 'blog-laser-machine-matters',
    file: 'services/laser-hero.jpg',
    alt: 'Medical-grade Alexandrite laser hair removal treatment in progress at Marr Laser & Skin Clinic in Paisley',
    caption: 'If you spend ten pounds less per session but need double the sessions, you\u2019ve not saved money.',
  },
  {
    blogId: 'blog-exosomes-explained',
    file: 'tech/focus-dual.jpg',
    alt: 'Calecim exosome microneedling treatment being performed on a female client at Marr Laser & Skin Clinic in Paisley',
    caption: 'I\u2019ve got clients in their 50s whose skin genuinely looks better now than it did in their 40s.',
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

async function uploadImage(filePath) {
  const stream = createReadStream(filePath);
  const asset = await client.assets.upload('image', stream, {
    filename: filePath.split('/').pop(),
  });
  return asset._id;
}

async function seed() {
  console.log('Seeding Marr Laser & Skin Clinic content...\n');

  // Upload blog cover images
  const imagesDir = resolve(root, 'apps/web/public/images');
  console.log('Uploading blog cover images...');
  for (const img of blogCoverImages) {
    const filePath = resolve(imagesDir, img.file);
    const assetId = await uploadImage(filePath);
    const post = blogPosts.find((p) => p._id === img.blogId);
    if (post) {
      post.coverImage = {
        _type: 'figure',
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        },
        alt: img.alt,
        caption: img.caption,
      };
      console.log(`  \u2713 ${img.file} \u2192 ${post.title.slice(0, 50)}...`);
    }
  }

  const allDocuments = [
    siteSettings,
    ...services,
    ...teamMembers,
    ...testimonials,
    ...faqs,
    ...pages,
    ...blogPosts,
  ];

  const transaction = client.transaction();

  for (const doc of allDocuments) {
    transaction.createOrReplace(doc);
  }

  try {
    const result = await transaction.commit();
    console.log(`\n\u2713 Seeded ${allDocuments.length} documents`);
    console.log(`  - 1 siteSettings`);
    console.log(`  - ${services.length} services`);
    console.log(`  - ${teamMembers.length} team members`);
    console.log(`  - ${testimonials.length} testimonials`);
    console.log(`  - ${faqs.length} FAQs`);
    console.log(`  - ${pages.length} pages`);
    console.log(`  - ${blogPosts.length} blog posts (with cover images)`);
    console.log(`\nTransaction ID: ${result.transactionId}`);
  } catch (err) {
    console.error('Failed to seed content:', err.message);
    process.exit(1);
  }
}

seed();
