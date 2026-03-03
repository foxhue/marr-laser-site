import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required().error('A question is required.'),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'portableText',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Group FAQs by category, e.g. "Pricing", "Booking".',
    }),
    defineField({
      name: 'service',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Optionally link this FAQ to a specific service.',
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      question: 'question',
      category: 'category',
    },
    prepare({ question, category }) {
      return {
        title: question || 'Untitled FAQ',
        subtitle: category || 'No category',
      }
    },
  },
})
