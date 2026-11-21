import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string({ required_error: 'Judul artikel wajib diisi' }),
    description: z.string({ required_error: 'Deskripsi artikel wajib diisi' }),
    slug: z.string().optional(),
    excerpt: z.string().optional(),
    featuredImage: z.string().optional(),
    imageAlt: z.string().optional(),
    author: z.string().default('Tim KalkulatorSeller'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    category: z.enum([
      'Tips Jualan Online',
      'Shopee',
      'TikTok Shop',
      'Tokopedia',
      'Harga dan Profit',
      'Bisnis Online',
      'Edukasi Seller',
    ]).default('Tips Jualan Online'),
    tags: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalUrl: z.string().optional(),
    noIndex: z.boolean().default(false),
  }),
});

export const collections = { blog };
