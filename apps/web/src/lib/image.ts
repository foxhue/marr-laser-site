import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from '@foxhue/shared';
import { sanityClient } from './sanity';

const builder = imageUrlBuilder(sanityClient);

/**
 * Returns an image URL builder instance for a given Sanity image source.
 * Chain additional transformations before calling `.url()`.
 */
export function urlFor(source: SanityImage) {
  return builder.image(source);
}

/**
 * Returns a ready-to-use WebP URL string for a Sanity image.
 * Optionally specify width and height for resizing.
 */
export function sanityImageUrl(
  source: SanityImage,
  width?: number,
  height?: number,
): string {
  let img = urlFor(source).format('webp').auto('format');

  if (width) {
    img = img.width(width);
  }
  if (height) {
    img = img.height(height);
  }

  return img.url();
}
