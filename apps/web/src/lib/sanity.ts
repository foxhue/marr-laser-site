import { createClient } from '@sanity/client';

// Project ID is not secret — it's a public identifier for the Sanity project
export const sanityClient = createClient({
  projectId: 'r8ooz97i',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});
