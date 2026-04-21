#!/usr/bin/env node

/**
 * Seeds Sanity with MARR Laser & Skin Clinic content.
 * Run: node scripts/seed-content.mjs
 *
 * Requires SANITY_PROJECT_ID in .env and authenticated Sanity CLI.
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
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
  {
    _id: 'blog-laser-hair-removal-prep',
    _type: 'blogPost',
    title: '5 Things to Know Before Your First Laser Hair Removal Session',
    slug: { _type: 'slug', current: '5-things-to-know-before-laser-hair-removal' },
    publishedAt: '2026-04-15T09:00:00Z',
    excerpt:
      'Thinking about laser hair removal? Here are five essential things to know before your first session at Marr Laser & Skin Clinic.',
    categories: ['Laser'],
    body: [
      heading('blr1', 'What to Expect'),
      paragraph(
        'blr2',
        'Laser hair removal is one of the most popular treatments we offer at Marr Laser & Skin Clinic. Using our Motus AY — the world\'s first FDA-approved pain-free Alexandrite laser — we can safely treat all skin types year-round. But before you book your first session, there are a few things worth knowing to get the best results.'
      ),
      heading('blr3', '1. Shave, Don\'t Wax'),
      paragraph(
        'blr4',
        'Shave the treatment area 24 hours before your appointment. Avoid waxing, plucking, or using depilatory creams for at least four weeks beforehand. The laser targets the hair follicle beneath the skin, so the root needs to be intact for the treatment to work effectively.'
      ),
      heading('blr5', '2. Multiple Sessions Are Needed'),
      paragraph(
        'blr6',
        'Hair grows in cycles, and the laser can only target follicles in the active growth phase. Most clients need six to eight sessions spaced four to six weeks apart to achieve lasting results. Patience pays off — each session reduces regrowth significantly.'
      ),
      heading('blr7', '3. A Patch Test Comes First'),
      paragraph(
        'blr8',
        'We always begin with a patch test to ensure the laser settings are compatible with your skin type. While adverse reactions are rare with the Motus AY, safety is our priority. The patch test also lets you experience the sensation before committing to a full session.'
      ),
      heading('blr9', '4. It Really Is Pain-Free'),
      paragraph(
        'blr10',
        'Unlike older laser systems, the Motus AY uses a gradual heating technique that most clients describe as comfortable or even relaxing. There is no need for numbing cream, and you can return to your normal activities immediately afterwards.'
      ),
      heading('blr11', '5. Aftercare Matters'),
      paragraph(
        'blr12',
        'After your session, keep the treated area out of direct sunlight and apply SPF 30 or higher. Avoid hot baths, saunas, and vigorous exercise for 24 hours. Following these simple steps helps your skin recover quickly and ensures the best possible outcome.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: '5 Things to Know Before Laser Hair Removal | Marr Laser & Skin Clinic',
      description:
        'Preparing for laser hair removal? Learn five essential tips before your first session at Marr Laser & Skin Clinic in Paisley.',
    },
  },
  {
    _id: 'blog-understanding-hifu',
    _type: 'blogPost',
    title: 'Understanding HIFU: The Non-Surgical Facelift',
    slug: { _type: 'slug', current: 'understanding-hifu-non-surgical-facelift' },
    publishedAt: '2026-04-08T09:00:00Z',
    excerpt:
      'HIFU is transforming the way we think about skin tightening and lifting. Learn how this non-surgical treatment works and what results you can expect.',
    categories: ['Skin Treatments'],
    body: [
      heading('bh1', 'What Is HIFU?'),
      paragraph(
        'bh2',
        'High Intensity Focused Ultrasound — HIFU — is a non-invasive treatment that uses focused ultrasound energy to target the deep structural layers of the skin. At Marr Laser & Skin Clinic, we use the Focus Dual HIFU system, one of the few devices capable of reaching the superficial musculoaponeurotic system (SMAS). This is the same tissue layer addressed during surgical facelifts, but without a single incision.'
      ),
      heading('bh3', 'How Does It Work?'),
      paragraph(
        'bh4',
        'The device delivers precise bursts of ultrasound energy to targeted depths beneath the skin. This creates controlled thermal coagulation points that trigger the body\'s natural healing response. Over the following weeks and months, your body produces new collagen and elastin, resulting in gradual tightening and lifting of the treated areas.'
      ),
      heading('bh5', 'What Can HIFU Treat?'),
      paragraph(
        'bh6',
        'HIFU is particularly effective for sagging skin along the jawline and neck, fine lines around the eyes and mouth, loss of definition in the cheeks and brow area, and overall skin laxity. Many clients notice an immediate subtle lift, with continued improvement over two to three months as new collagen forms.'
      ),
      heading('bh7', 'Is It Right for You?'),
      paragraph(
        'bh8',
        'HIFU is ideal for clients who want visible lifting and tightening without surgery or downtime. The treatment typically takes 30 to 60 minutes depending on the area, and most people return to their daily routine immediately. We recommend a consultation to assess your skin and discuss whether HIFU is the right option for your goals.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: 'Understanding HIFU: Non-Surgical Facelift | Marr Laser & Skin Clinic',
      description:
        'Learn how HIFU (High Intensity Focused Ultrasound) provides a non-surgical facelift. Discover the science and results at Marr Laser & Skin Clinic, Paisley.',
    },
  },
  {
    _id: 'blog-medical-grade-technology',
    _type: 'blogPost',
    title: 'Why Medical-Grade Technology Matters for Your Skin',
    slug: { _type: 'slug', current: 'why-medical-grade-technology-matters' },
    publishedAt: '2026-04-01T09:00:00Z',
    excerpt:
      'Not all laser and skin treatment devices are created equal. Here\'s why we invest in medical-grade technology and what it means for your results.',
    categories: ['Technology'],
    body: [
      heading('bt1', 'The Difference Between Salon and Medical-Grade'),
      paragraph(
        'bt2',
        'Walk into many high-street beauty salons and you will find IPL machines and laser devices marketed as professional-grade. While these can produce some results, there is a significant difference between consumer-level equipment and the medical-grade systems we use at Marr Laser & Skin Clinic. Medical-grade devices undergo rigorous clinical testing, carry FDA or CE medical clearance, and deliver substantially higher energy levels with precision targeting.'
      ),
      heading('bt3', 'Our Technology Investment'),
      paragraph(
        'bt4',
        'We have invested in a carefully selected range of award-winning technology. The Motus AY from DEKA is the world\'s first pain-free Alexandrite laser approved for all skin types. The Cynosure Elite+ combines Alexandrite and Nd:YAG wavelengths for versatile treatment options. The Focus Dual provides both HIFU and RF microneedling in a single platform. And our Lynton Excelight delivers medical-grade IPL for a broad spectrum of skin conditions.'
      ),
      heading('bt5', 'What This Means for You'),
      paragraph(
        'bt6',
        'Medical-grade technology translates directly into better outcomes. Treatments are more effective per session, meaning fewer visits overall. The precision of these systems reduces the risk of side effects and allows us to tailor settings precisely to your skin type and concern. It also means we can treat conditions that lower-powered devices simply cannot address.'
      ),
      heading('bt7', 'Trained Hands Behind the Technology'),
      paragraph(
        'bt8',
        'Advanced equipment is only as good as the people operating it. Every member of our team is fully trained and certified on each device we use. We attend regular manufacturer training sessions and stay current with the latest techniques and protocols. When you visit Marr Laser & Skin Clinic, you are in experienced, qualified hands.'
      ),
    ],
    seo: {
      _type: 'seo',
      title: 'Why Medical-Grade Technology Matters | Marr Laser & Skin Clinic',
      description:
        'Discover why medical-grade laser and skin technology delivers better results. Learn about the advanced equipment at Marr Laser & Skin Clinic, Paisley.',
    },
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

async function seed() {
  console.log('Seeding Marr Laser & Skin Clinic content...\n');

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
    console.log(`\u2713 Seeded ${allDocuments.length} documents`);
    console.log(`  - 1 siteSettings`);
    console.log(`  - ${services.length} services`);
    console.log(`  - ${teamMembers.length} team members`);
    console.log(`  - ${testimonials.length} testimonials`);
    console.log(`  - ${faqs.length} FAQs`);
    console.log(`  - ${pages.length} pages`);
    console.log(`  - ${blogPosts.length} blog posts`);
    console.log(`\nTransaction ID: ${result.transactionId}`);
  } catch (err) {
    console.error('Failed to seed content:', err.message);
    process.exit(1);
  }
}

seed();
