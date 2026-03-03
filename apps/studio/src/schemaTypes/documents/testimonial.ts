import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().error('A quote is required.'),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (rule) => rule.required().error('An author name is required.'),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Star rating from 1 to 5.',
      validation: (rule) =>
        rule
          .min(1)
          .max(5)
          .integer()
          .error('Rating must be a whole number between 1 and 5.'),
    }),
    defineField({
      name: 'service',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Optionally link this testimonial to a specific service.',
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author',
      rating: 'rating',
    },
    prepare({ quote, author, rating }) {
      const stars = rating ? ' '.repeat(0) + Array(rating).fill('*').join('') : ''
      return {
        title: author || 'Anonymous',
        subtitle: `${stars ? `${rating}/5 - ` : ''}${quote ? quote.substring(0, 80) : 'No quote'}`,
      }
    },
  },
})
