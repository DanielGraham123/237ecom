export default {
  type: "document",
  name: "product",
  title: "Product",

  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "image",
      title: "Image",
      type: "array", //array of images for a product
      of: [{ type: "image" }], // array of type image
      options: {
        hotspot: true, // responsive resizing
      },
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
  ],
};
