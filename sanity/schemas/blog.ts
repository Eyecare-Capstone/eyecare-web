/* eslint-disable import/no-anonymous-default-export */
import { Rule } from "sanity";

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
      validation: (Rule: any) => Rule.required(),
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
        },
      ],
    },
  ],
};
