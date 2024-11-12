import { CollectionConfig } from "payload/types";
import { hotReload } from "../lib/utils";
import { isUser } from "../access/isUser";

// * Post tags like Misc, Informative, Dev, etc

const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    useAsTitle: "name",
    disableDuplicate: true,
  },
  access: {
    read: () => true,
    create: isUser,
    update: isUser,
    delete: isUser,
  },
  fields: [
    {
      name: "name",
      type: "text",
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
  timestamps: false,




  hooks: {
    afterChange: [
      hotReload
    ],
  },




};

export default Tags;
