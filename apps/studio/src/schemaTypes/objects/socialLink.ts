import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Twitter / X', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'YouTube', value: 'youtube' },
        ],
      },
      validation: (rule) => rule.required().error('Please select a platform.'),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      validation: (rule) =>
        rule
          .required()
          .error('A profile URL is required.')
          .uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
    },
    prepare({ platform, url }) {
      const labels: Record<string, string> = {
        facebook: 'Facebook',
        instagram: 'Instagram',
        twitter: 'Twitter / X',
        linkedin: 'LinkedIn',
        tiktok: 'TikTok',
        youtube: 'YouTube',
      }
      return {
        title: labels[platform] || platform || 'Unknown platform',
        subtitle: url,
      }
    },
  },
})
