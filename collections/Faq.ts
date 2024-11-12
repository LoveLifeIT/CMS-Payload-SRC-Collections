import { CollectionConfig } from "payload/types";
import { isUser} from "../access/isUser";
import {filterSupportedFeatures, hotReload} from "../lib/utils";
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";

const Faq: CollectionConfig = {
	slug: "faq",
	admin: {
		useAsTitle: 'question',
	},
	access: {
		read: () => true,
		create: isUser,
		update: isUser,
		delete: isUser,
	},
	fields: [
		{
			name: "question",
			type: "textarea",
			required: true,
		},
		{
			name: 'answerRichText',
			label: 'Answer',
			type: 'richText',
			editor: lexicalEditor({
				features: ({defaultFeatures}) => [...filterSupportedFeatures(defaultFeatures), HTMLConverterFeature({})]
			})
		},
		lexicalHTML('answerRichText', {name: 'answer_html'}),
		{
			name: "sortOrder",
			label: "Sort Order (lower values appear first)",
			type: "number",
			defaultValue: 100
		},
		{
			name: "category",
			type: "relationship",
			relationTo: "categories",
			required: true,
		},
		{
			name: "tags",
			type: "relationship",
			relationTo: "tags",
			required: true,
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

export default Faq;
