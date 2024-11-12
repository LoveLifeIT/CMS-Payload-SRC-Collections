import {CollectionConfig} from "payload/types";
import {isUser} from "../access/isUser";
import {hotReload} from "../lib/utils";

// import fs from 'fs';


const Categories: CollectionConfig = {
  slug: "categories",
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
      required: true,
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

export default Categories;
