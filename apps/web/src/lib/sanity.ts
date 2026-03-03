import { createClient } from '@sanity/client';

const projectId = import.meta.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const apiVersion = import.meta.env.SANITY_API_VERSION || process.env.SANITY_API_VERSION || '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
