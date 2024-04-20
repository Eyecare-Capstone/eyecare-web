export default {
  name: "blog",
  type: "document",
  title: "Blog",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title of blog article",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "SLug of blog article",
      options: {
        source: "title",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "articleType",
      title: "Article Type",
      type: "string",
      options: {
        list: [
          { title: "Education", value: "education" },
          { title: "Nutritional", value: "nutritional" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "DD MMM YYYY",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "titleImage",
      type: "image",
      title: "Title image",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: "block",
        },
      ],
    },
  ],
};
