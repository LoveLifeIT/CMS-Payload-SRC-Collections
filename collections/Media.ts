import { CollectionConfig } from "payload/types";
import { hotReload } from "../lib/utils";
import { isUser } from "../access/isUser";

const staticURL = process.env.UPLOAD_STATIC_URL || "";

const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: isUser,
    update: isUser,
    delete: isUser,
  },
  admin: {
    useAsTitle: "title",
  },
  upload: {
    disableLocalStorage: true,
    staticURL,
    staticDir: "media",
    imageSizes: [
      {
        name: "avatar",
        width: 250,
        height: 250,
        crop: "centre",
      },
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        crop: "centre",
      },
      {
        name: "small",
        width: 640,
        height: null,
        crop: "centre",
        withoutEnlargement: true,
      },
      {
        name: "medium",
        width: 1024,
        height: null,
        crop: "centre",
        withoutEnlargement: true,
        formatOptions: {
          format: 'jpg',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: "large",
        width: 1440,
        height: null,
        crop: "centre",
        withoutEnlargement: true,
        formatOptions: {
          format: 'jpg',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: "full",
        width: 1920,
        height: null,
        crop: "centre",
        withoutEnlargement: true,
        formatOptions: {
          format: 'jpg',
          options: {
            quality: 85,
          },
        },
      }
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*", "video/*"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "alt",
      label: "Alt Text",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          value: "draft",
          label: "Draft",
        },
        {
          value: "awaiting",
          label: "Awaiting Verification",
        },
        {
          value: "published",
          label: "Published",
        },
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar",
      },
    },
  ],


  hooks: {
    afterChange: [
      hotReload
    ],
  },




};

export default Media;
