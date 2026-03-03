import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'openingHours',
  title: 'Opening Hours',
  type: 'object',
  fields: [
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      options: {
        list: [
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
          { title: 'Sunday', value: 'sunday' },
        ],
      },
      validation: (rule) => rule.required().error('Please select a day.'),
    }),
    defineField({
      name: 'open',
      title: 'Opening Time',
      type: 'string',
      description: 'e.g. 09:00',
      hidden: ({ parent }) => !!parent?.closed,
    }),
    defineField({
      name: 'close',
      title: 'Closing Time',
      type: 'string',
      description: 'e.g. 17:00',
      hidden: ({ parent }) => !!parent?.closed,
    }),
    defineField({
      name: 'closed',
      title: 'Closed',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      day: 'day',
      open: 'open',
      close: 'close',
      closed: 'closed',
    },
    prepare({ day, open, close, closed }) {
      const dayLabels: Record<string, string> = {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
      }
      const label = dayLabels[day] || day || 'Unknown'
      const hours = closed ? 'Closed' : `${open || '?'} - ${close || '?'}`
      return {
        title: label,
        subtitle: hours,
      }
    },
  },
})
