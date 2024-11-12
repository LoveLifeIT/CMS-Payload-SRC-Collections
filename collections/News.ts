import { CollectionConfig } from "payload/types";
import { hotReload } from "../lib/utils";
import link from '../fields/link'
import { isUser } from "../access/isUser";

const News: CollectionConfig = {
	slug: "news",
	access: {
		read: () => true,
		create: isUser,
		update: isUser,
		delete: isUser,
	},
	admin: {
		useAsTitle: "title",
	},
  	fields: [
		{
			name: "title",
			type: "textarea",
			required: true,
		},
	    link({
	      appearances: false,
	      disableLabel: true,
	    }),
	    {
	      name: 'media',
	      type: 'upload',
	      relationTo: 'media',
	      required: true,
	    },
			{
				name: "publishedDate",
				type: "date",
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

export default News;
