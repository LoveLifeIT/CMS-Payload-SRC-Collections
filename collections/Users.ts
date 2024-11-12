import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
    disableDuplicate: true,
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: false,
      defaultValue: 'member',
      required: true,
      options: [
        'admin',
        'member'
      ]
    }
  ],
};

export default Users;
