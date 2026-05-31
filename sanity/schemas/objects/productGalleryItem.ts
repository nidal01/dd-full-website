import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productGalleryItem',
  title: 'Galeri Öğesi',
  type: 'object',
  fields: [
    defineField({
      name: 'kind',
      title: 'Tür',
      type: 'string',
      options: {
        list: [
          { title: 'Görsel', value: 'image' },
          { title: 'Video', value: 'video' },
          { title: '3D Model (GLB/GLTF)', value: 'model3d' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt metin' }],
      hidden: ({ parent }) => parent?.kind !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video URL (MP4/HLS)',
      type: 'url',
      hidden: ({ parent }) => parent?.kind !== 'video',
    }),
    defineField({
      name: 'model',
      title: '3D Model Dosyası (.glb)',
      type: 'file',
      options: { accept: '.glb,.gltf' },
      hidden: ({ parent }) => parent?.kind !== 'model3d',
    }),
    defineField({
      name: 'poster',
      title: 'Poster Görseli (video/3D için)',
      type: 'image',
      hidden: ({ parent }) => parent?.kind === 'image',
    }),
  ],
  preview: {
    select: { title: 'kind', media: 'image' },
    prepare: ({ title, media }) => ({ title: title?.toUpperCase(), media }),
  },
})
