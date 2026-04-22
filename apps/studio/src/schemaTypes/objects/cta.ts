import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'variant',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (taupe)', value: 'primary' },
          { title: 'Outline (charcoal)', value: 'outline' },
          { title: 'Ghost (text-only)', value: 'ghost' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      buttonText: 'buttonText',
    },
    prepare({ heading, buttonText }) {
      return {
        title: heading || 'Call to Action',
        subtitle: buttonText ? `Button: ${buttonText}` : 'No button text',
      }
    },
  },
})
