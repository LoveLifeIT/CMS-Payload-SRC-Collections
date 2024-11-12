import type { CollectionConfig } from 'payload/types'
import link from '../fields/link'
import { hotReload } from "../lib/utils";
import { isUser } from "../access/isUser";


const LeftNav: CollectionConfig = {
  slug: "leftnavs",
  access: {
    read: () => true,
    create: isUser,
    update: isUser,
    delete: isUser,
  },
  admin: {
    useAsTitle: "title",
    disableDuplicate: true,
  },
  fields: [
     {
      name: "title",
      type: "text",
      required: true,
    },    
    {
      name: 'LeftNavItems',
      label: 'Left Nav Items',
      type: 'array',
      fields: [
        link({
          appearances: false,
        })
      ],
    },    
    {
      name: 'LeftNavDisclaimer',
      label: 'Left Nav Disclaimer (optional)',
      type: 'textarea',
    },    
    {
      name: 'LeftNavDisclaimerActionButton',
      label: 'Left Nav Disclaimer Action Button (optional)',
      type: 'text',
    },    
    {
      name: 'LeftNavDisclaimerActionButtonURL',
      label: 'Left Nav Disclaimer Action Button URL (optional)',
      type: 'text',
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
    }

    ],
    hooks: {
      afterChange: [
        hotReload
      ],
    },
}

export default LeftNav;