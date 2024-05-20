/* eslint-disable import/no-anonymous-default-export */
import { Rule } from "sanity";
import sanityClient from "@sanity/client";

// Konfigurasi Sanity Client
const client = sanityClient({
  projectId: "t8sl2x8b",
  dataset: "production",
  apiVersion: "2024-04-20",
  useCdn: true,
});

export default {
  name: "blog",
  type: "document",
  title: "Blog",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title of blog article",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug of blog article",
      options: {
        source: "title",
      },
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "articleType",
      title: "Article Type",
      type: "string",
      options: {
        list: [
          { title: "Educational", value: "educational" },
          { title: "Nutritional", value: "nutritional" },
        ],
      },
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "Bahasa Indonesia", value: "id" },
          { title: "English", value: "en" },
        ],
      },
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "date",
      options: {
        dateFormat: "DD MMM YYYY",
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      validation: (Rule: Rule) => Rule.max(250).error("Max 250 characters"),
    },
    {
      name: "titleImage",
      type: "image",
      title: "Title image",
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          fields: [{ type: "text", name: "alt", title: "Alt" }],
          options: {
            hotspot: true,
          },
          validation: (Rule: Rule) =>
            Rule.custom(async (image: any) => {
              if (!image || !image.asset) {
                return true; // Allow empty images
              }

              // const filetype = getExtension(image.asset._ref);

              // if (filetype !== "jpg" && filetype !== "png") {
              //   return "Image must be a JPG or PNG";
              // }

              const asset = await client.getDocument(image.asset._ref);
              if (asset && asset.size) {
                return asset.size <= 300 * 1024
                  ? true
                  : "Image size should not exceed 300kb";
              }
              return "Invalid image";
            }),
        },
      ],
    },
  ],
};
