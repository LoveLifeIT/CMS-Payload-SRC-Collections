import { CollectionConfig } from "payload/types";
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";
import { isUser } from "../access/isUser";
import {filterSupportedFeatures} from "../lib/utils";


const People: CollectionConfig = {
	slug: "people",
	admin: {
		defaultColumns: ["name", "title", "team"],
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
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "team",
			type: "relationship",
			relationTo: "teams"
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "bio",
			type: "richText",
			required: true,
			editor: lexicalEditor({
				features: ({defaultFeatures}) => [...filterSupportedFeatures(defaultFeatures), HTMLConverterFeature({})]
			})
		},
		lexicalHTML('bio', {name: 'bio_html'}),
		{
			name: "nickname",
			label: "Informal Name (First Name, Nickname)",
			type: "text",
		},
	]
};

export default People;
