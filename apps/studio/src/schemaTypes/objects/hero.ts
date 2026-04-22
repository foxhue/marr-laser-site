import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'Small serif label above the heading (e.g. "Advanced Skin Care"). Max 40 chars.',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().error('A heading is required.'),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'figure',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'url',
          validation: (rule) =>
            rule.uri({
              allowRelative: true,
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
      ],
    }),
  ],
})
