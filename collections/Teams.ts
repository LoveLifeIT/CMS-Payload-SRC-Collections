import { CollectionConfig } from "payload/types";
import { isUser } from "../access/isUser";

const Teams: CollectionConfig = {
  slug: "teams",
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
  ],
  timestamps: false
};

export default Teams;
