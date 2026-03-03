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
// Content definitions
// ---------------------------------------------------------------------------

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'MARR Laser & Skin Clinic',
  tagline: 'Advanced laser hair removal and skin treatments in Newry, Co. Down. Professional results in a comfortable, modern clinic.',
  contactEmail: 'hello@marrlaser.com',
  contactPhone: '+44 28 3026 0000',
  address: 'Hill Street, Newry, Co. Down, BT34 1AR',
  openingHours: [
    { _key: 'mon', _type: 'openingHours', day: 'Monday', open: '09:00', close: '18:00', closed: false },
    { _key: 'tue', _type: 'openingHours', day: 'Tuesday', open: '09:00', close: '18:00', closed: false },
    { _key: 'wed', _type: 'openingHours', day: 'Wednesday', open: '09:00', close: '20:00', closed: false },
    { _key: 'thu', _type: 'openingHours', day: 'Thursday', open: '09:00', close: '20:00', closed: false },
    { _key: 'fri', _type: 'openingHours', day: 'Friday', open: '09:00', close: '18:00', closed: false },
    { _key: 'sat', _type: 'openingHours', day: 'Saturday', open: '09:00', close: '16:00', closed: false },
    { _key: 'sun', _type: 'openingHours', day: 'Sunday', open: '', close: '', closed: true },
  ],
  socialLinks: [
    { _key: 'fb', _type: 'socialLink', platform: 'facebook', url: 'https://facebook.com/marrlaser' },
    { _key: 'ig', _type: 'socialLink', platform: 'instagram', url: 'https://instagram.com/marrlaser' },
  ],
  defaultSeo: {
    _type: 'seo',
    title: 'MARR Laser & Skin Clinic | Newry, Co. Down',
    description: 'Professional laser hair removal and skin treatments in Newry, Co. Down. Medical-grade technology, qualified practitioners, free consultations.',
  },
};

const services = [
  {
    _id: 'service-laser-hair-removal',
    _type: 'service',
    title: 'Laser Hair Removal',
    slug: { _type: 'slug', current: 'laser-hair-removal' },
    excerpt: 'Permanent hair reduction using medical-grade laser technology. Safe and effective for all skin types with long-lasting results.',
    price: 'From £50',
    duration: '15-60 min',
    featured: true,
    body: [
      {
        _key: 'lhr1',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'lhr1c', _type: 'span', text: 'How Laser Hair Removal Works', marks: [] }],
        markDefs: [],
      },
      {
        _key: 'lhr2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'lhr2c',
            _type: 'span',
            text: 'Our medical-grade laser targets the melanin in hair follicles, delivering precise energy that damages the follicle and prevents future hair growth. The surrounding skin is left unharmed thanks to our advanced cooling system.',
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _key: 'lhr3',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'lhr3c', _type: 'span', text: 'Treatment Areas', marks: [] }],
        markDefs: [],
      },
      {
        _key: 'lhr4',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'lhr4c',
            _type: 'span',
            text: 'We offer laser hair removal for all areas of the body including face, underarms, bikini line, legs, arms, back, and chest. Treatment plans are tailored to your individual needs and skin type.',
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _key: 'lhr5',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'lhr5c', _type: 'span', text: 'What to Expect', marks: [] }],
        markDefs: [],
      },
      {
        _key: 'lhr6',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'lhr6c',
            _type: 'span',
            text: 'Most clients require 6-8 sessions spaced 4-6 weeks apart for optimal results. Each session is quick and comfortable, with minimal downtime. You may experience mild redness immediately after treatment, which typically subsides within a few hours.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    seo: {
      _type: 'seo',
      title: 'Laser Hair Removal Newry | MARR Laser & Skin Clinic',
      description: 'Professional laser hair removal in Newry, Co. Down. Medical-grade technology for permanent hair reduction. Free consultation available.',
    },
  },
  {
    _id: 'service-skin-treatments',
    _type: 'service',
    title: 'Skin Treatments',
    slug: { _type: 'slug', current: 'skin-treatments' },
    excerpt: 'Advanced skin rejuvenation including chemical peels, microneedling, and LED therapy. Tailored treatments for your skin concerns.',
    price: 'From £75',
    duration: '30-60 min',
    featured: true,
    body: [
      {
        _key: 'st1',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'st1c', _type: 'span', text: 'Our Skin Treatments', marks: [] }],
        markDefs: [],
      },
      {
        _key: 'st2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'st2c',
            _type: 'span',
            text: 'We offer a range of advanced skin treatments designed to address various concerns including ageing, pigmentation, acne scarring, and uneven skin tone. Each treatment plan is customised to your unique skin type and goals.',
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _key: 'st3',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'st3c', _type: 'span', text: 'Available Treatments', marks: [] }],
        markDefs: [],
      },
      {
        _key: 'st4',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'st4c',
            _type: 'span',
            text: 'Chemical peels for skin renewal, microneedling for collagen stimulation, LED light therapy for healing and rejuvenation, and advanced facials tailored to your skin\'s needs. All treatments use premium, medical-grade products.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    seo: {
      _type: 'seo',
      title: 'Skin Treatments Newry | MARR Laser & Skin Clinic',
      description: 'Advanced skin treatments in Newry including chemical peels, microneedling, and LED therapy. Personalised plans for your skin goals.',
    },
  },
  {
    _id: 'service-chemical-peels',
    _type: 'service',
    title: 'Chemical Peels',
    slug: { _type: 'slug', current: 'chemical-peels' },
    excerpt: 'Professional chemical peels to reveal brighter, smoother skin. Addresses pigmentation, fine lines, and uneven texture.',
    price: 'From £80',
    duration: '45 min',
    featured: false,
    body: [
      {
        _key: 'cp1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'cp1c',
            _type: 'span',
            text: 'Our professional chemical peels use carefully selected acids to remove damaged outer layers of skin, revealing the fresher, healthier skin beneath. We offer superficial, medium, and deep peels depending on your concerns and skin type.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    seo: {
      _type: 'seo',
      title: 'Chemical Peels Newry | MARR Laser & Skin Clinic',
      description: 'Professional chemical peels in Newry. Reveal brighter, smoother skin with our customised peel treatments.',
    },
  },
  {
    _id: 'service-microneedling',
    _type: 'service',
    title: 'Microneedling',
    slug: { _type: 'slug', current: 'microneedling' },
    excerpt: 'Collagen-boosting microneedling treatment for improved skin texture, reduced scarring, and a more youthful appearance.',
    price: 'From £120',
    duration: '60 min',
    featured: false,
    body: [
      {
        _key: 'mn1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'mn1c',
            _type: 'span',
            text: 'Microneedling creates tiny controlled micro-injuries in the skin, triggering the body\'s natural healing response and boosting collagen production. This results in firmer, smoother skin with reduced appearance of scars, wrinkles, and enlarged pores.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    seo: {
      _type: 'seo',
      title: 'Microneedling Newry | MARR Laser & Skin Clinic',
      description: 'Professional microneedling in Newry for collagen boosting and skin rejuvenation. Reduce scarring and improve skin texture.',
    },
  },
];

const teamMembers = [
  {
    _id: 'team-member-1',
    _type: 'teamMember',
    name: '[PENDING] Practice Owner',
    role: 'Clinic Director & Lead Practitioner',
    bio: [
      {
        _key: 'tm1b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'tm1b1c',
            _type: 'span',
            text: 'Qualified laser and skin specialist with extensive experience in advanced aesthetic treatments. Passionate about delivering safe, effective results for every client.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    qualifications: ['Level 4 Laser & IPL', 'Skin Rejuvenation Specialist', 'VTCT Certified'],
    order: 1,
  },
  {
    _id: 'team-member-2',
    _type: 'teamMember',
    name: '[PENDING] Team Member',
    role: 'Aesthetic Practitioner',
    bio: [
      {
        _key: 'tm2b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'tm2b1c',
            _type: 'span',
            text: 'Experienced aesthetic practitioner specialising in laser treatments and skin care. Committed to providing personalised care in a warm, welcoming environment.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    qualifications: ['Level 4 Laser & IPL', 'Advanced Skin Care'],
    order: 2,
  },
];

const testimonials = [
  {
    _id: 'testimonial-1',
    _type: 'testimonial',
    quote: 'Absolutely amazing results! The team made me feel so comfortable and the laser hair removal has been life-changing. Would highly recommend MARR to anyone.',
    author: '[PENDING] Client Name',
    rating: 5,
    service: { _type: 'reference', _ref: 'service-laser-hair-removal' },
  },
  {
    _id: 'testimonial-2',
    _type: 'testimonial',
    quote: 'I had a course of chemical peels and my skin has never looked better. The staff are knowledgeable, friendly, and the clinic is beautiful. Five stars!',
    author: '[PENDING] Client Name',
    rating: 5,
    service: { _type: 'reference', _ref: 'service-skin-treatments' },
  },
  {
    _id: 'testimonial-3',
    _type: 'testimonial',
    quote: 'From the free consultation to the final treatment, the whole experience was professional and welcoming. The results speak for themselves.',
    author: '[PENDING] Client Name',
    rating: 5,
  },
];

const faqs = [
  {
    _id: 'faq-1',
    _type: 'faq',
    question: 'Is laser hair removal painful?',
    answer: [
      {
        _key: 'f1a',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'f1ac',
            _type: 'span',
            text: 'Most clients describe the sensation as a mild snap, similar to a rubber band. Our laser has a built-in cooling system that minimises discomfort. We adjust settings to your comfort level throughout the treatment.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: 'Laser Hair Removal',
    order: 1,
  },
  {
    _id: 'faq-2',
    _type: 'faq',
    question: 'How many laser sessions will I need?',
    answer: [
      {
        _key: 'f2a',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'f2ac',
            _type: 'span',
            text: 'Most clients require 6-8 sessions for optimal results, spaced 4-6 weeks apart. This is because hair grows in cycles, and the laser is most effective during the active growth phase. We\'ll create a personalised treatment plan at your consultation.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: 'Laser Hair Removal',
    order: 2,
  },
  {
    _id: 'faq-3',
    _type: 'faq',
    question: 'Is laser hair removal safe for all skin types?',
    answer: [
      {
        _key: 'f3a',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'f3ac',
            _type: 'span',
            text: 'Yes, our medical-grade laser is suitable for all skin types (Fitzpatrick I-VI). During your consultation, we assess your skin type and adjust the laser settings accordingly to ensure safe and effective treatment.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: 'Laser Hair Removal',
    order: 3,
  },
  {
    _id: 'faq-4',
    _type: 'faq',
    question: 'What skin treatments do you offer?',
    answer: [
      {
        _key: 'f4a',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'f4ac',
            _type: 'span',
            text: 'We offer chemical peels, microneedling, LED light therapy, and advanced facials. Each treatment is tailored to address your specific skin concerns, whether that\'s ageing, pigmentation, acne scarring, or general skin health.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: 'Skin Treatments',
    order: 4,
  },
  {
    _id: 'faq-5',
    _type: 'faq',
    question: 'Do you offer free consultations?',
    answer: [
      {
        _key: 'f5a',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'f5ac',
            _type: 'span',
            text: 'Yes! We offer a free initial consultation for all new clients. During this appointment, we\'ll assess your needs, discuss your goals, and recommend a personalised treatment plan. There\'s no obligation to proceed.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: 'General',
    order: 5,
  },
  {
    _id: 'faq-6',
    _type: 'faq',
    question: 'What should I do before my laser treatment?',
    answer: [
      {
        _key: 'f6a',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'f6ac',
            _type: 'span',
            text: 'Avoid sun exposure and tanning for 2 weeks before treatment. Shave the treatment area 24 hours before your appointment. Avoid waxing, plucking, or using hair removal creams for 4 weeks prior. We\'ll provide full pre-treatment instructions at your consultation.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: 'Laser Hair Removal',
    order: 6,
  },
  {
    _id: 'faq-7',
    _type: 'faq',
    question: 'How long do results last?',
    answer: [
      {
        _key: 'f7a',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'f7ac',
            _type: 'span',
            text: 'Laser hair removal provides permanent hair reduction. After completing your course of treatments, most clients see 80-90% reduction in hair growth. Occasional maintenance sessions may be needed once or twice a year.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: 'Laser Hair Removal',
    order: 7,
  },
  {
    _id: 'faq-8',
    _type: 'faq',
    question: 'What are your opening hours?',
    answer: [
      {
        _key: 'f8a',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'f8ac',
            _type: 'span',
            text: 'We\'re open Monday-Friday 9am-6pm (late appointments until 8pm on Wednesdays and Thursdays), Saturday 9am-4pm. Closed Sundays. Contact us to book your appointment.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: 'General',
    order: 8,
  },
  {
    _id: 'faq-9',
    _type: 'faq',
    question: 'Where are you located?',
    answer: [
      {
        _key: 'f9a',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'f9ac',
            _type: 'span',
            text: 'We\'re located on Hill Street in Newry, Co. Down (BT34 1AR). The clinic is easily accessible with nearby parking available. We serve clients from Newry, Warrenpoint, Kilkeel, Banbridge, and the wider South Down area.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: 'General',
    order: 9,
  },
  {
    _id: 'faq-10',
    _type: 'faq',
    question: 'What payment methods do you accept?',
    answer: [
      {
        _key: 'f10a',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'f10ac',
            _type: 'span',
            text: 'We accept all major credit and debit cards, cash, and bank transfer. We also offer treatment packages with payment plans for courses of treatments. Ask at reception for details.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: 'General',
    order: 10,
  },
];

const pages = [
  {
    _id: 'page-about',
    _type: 'page',
    title: 'About Us',
    slug: { _type: 'slug', current: 'about' },
    hero: {
      _type: 'hero',
      heading: 'About MARR Laser & Skin Clinic',
      tagline: 'Your trusted clinic for advanced laser and skin treatments in Newry, Co. Down.',
    },
    body: [
      {
        _key: 'ab1',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'ab1c', _type: 'span', text: 'Our Story', marks: [] }],
        markDefs: [],
      },
      {
        _key: 'ab2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'ab2c',
            _type: 'span',
            text: 'MARR Laser & Skin Clinic was founded with a simple mission: to bring professional-grade laser and skin treatments to the Newry community. We believe everyone deserves access to safe, effective aesthetic treatments delivered by qualified practitioners in a warm, welcoming environment.',
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _key: 'ab3',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'ab3c', _type: 'span', text: 'Our Approach', marks: [] }],
        markDefs: [],
      },
      {
        _key: 'ab4',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'ab4c',
            _type: 'span',
            text: 'We take a personalised approach to every client. During your free consultation, we listen to your goals, assess your needs, and create a treatment plan tailored specifically to you. We use only medical-grade equipment and premium products to ensure the best possible results.',
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _key: 'ab5',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'ab5c', _type: 'span', text: 'Our Commitment', marks: [] }],
        markDefs: [],
      },
      {
        _key: 'ab6',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'ab6c',
            _type: 'span',
            text: 'Safety is our top priority. All our practitioners hold recognised qualifications and undergo continuous professional development. Our clinic meets all health and safety standards, and we maintain full insurance for your peace of mind.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    seo: {
      _type: 'seo',
      title: 'About Us | MARR Laser & Skin Clinic, Newry',
      description: 'Learn about MARR Laser & Skin Clinic in Newry. Qualified practitioners, medical-grade technology, and personalised care for laser and skin treatments.',
    },
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

async function seed() {
  console.log('Seeding MARR Laser & Skin Clinic content...\n');

  const allDocuments = [
    siteSettings,
    ...services,
    ...teamMembers,
    ...testimonials,
    ...faqs,
    ...pages,
  ];

  const transaction = client.transaction();

  for (const doc of allDocuments) {
    transaction.createOrReplace(doc);
  }

  try {
    const result = await transaction.commit();
    console.log(`✓ Seeded ${allDocuments.length} documents`);
    console.log(`  - 1 siteSettings`);
    console.log(`  - ${services.length} services`);
    console.log(`  - ${teamMembers.length} team members`);
    console.log(`  - ${testimonials.length} testimonials`);
    console.log(`  - ${faqs.length} FAQs`);
    console.log(`  - ${pages.length} pages`);
    console.log(`\nTransaction ID: ${result.transactionId}`);
  } catch (err) {
    console.error('Failed to seed content:', err.message);
    process.exit(1);
  }
}

seed();
