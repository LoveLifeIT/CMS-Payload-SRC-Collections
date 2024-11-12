import { CollectionConfig } from "payload/types";
import { hotReload } from "../lib/utils";
import { isUser } from "../access/isUser";

import { ContactModule } from '../blocks/ContactModule'
import { FaqModule } from '../blocks/FaqModule'
import { HeaderModule } from '../blocks/HeaderModule'
import { HeroModule } from '../blocks/HeroModule'
import { LegalModule } from '../blocks/LegalModule'
import { MapModule } from '../blocks/MapModule'
import { MenuModule } from '../blocks/MenuModule'
import { NewsModule } from '../blocks/NewsModule'
import { OneColumnModule } from "../blocks/OneColumnModule";
import { OurTeamModule } from "../blocks/OurTeamModule";
import { SignupModule } from '../blocks/SignupModule'
import { ThreeColumnModule } from "../blocks/ThreeColumnModule";
import { TwoColumnModule } from "../blocks/TwoColumnModule";
import { OurTeamCarouselModule } from "../blocks/OurTeamCarouselModule";
import { GalleryCarousel } from "../blocks/GalleryCarousel";
import { TheLoveLifeMethodModule } from "../blocks/TheLoveLifeMethodModule";
import { PublicationsModule } from "../blocks/PublicationsModule";
import { SpaMenuModule } from "../blocks/SpaMenuModule";
import { FaqTeaserModule } from "../blocks/FaqTeaserModule";
import { WidgetModule } from "../blocks/WidgetModule";
import { BannerModule } from "../blocks/BannerModule";
import { adTheorentActivityIdField } from "../fields/fields";

const Pages: CollectionConfig = {
	slug: "pages",
	admin: {
		defaultColumns: ["title", "author", "category", "tags", "status"],
		useAsTitle: "title",
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
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "slug",
			type: "text",
			required: true,
			validate: async (val, {operation}) => {
				if (operation === 'create' || operation === 'update') {
					if (val?.startsWith('/')) return true;
					else return 'A slug must start with a forward slash "/"';
				}
			},
		},
		{
			name: "authors",
			type: "relationship",
			relationTo: "users",
			required: false,
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
			name: 'layout',
			type: 'blocks',
			required: true,
			blocks: [
				HeroModule,
				HeaderModule,
				OneColumnModule,
				TwoColumnModule,
				ThreeColumnModule,
				MapModule,
				SignupModule,
				ContactModule,
				LegalModule,
				FaqModule,
				FaqTeaserModule,
				OurTeamModule,
				OurTeamCarouselModule,
				NewsModule,
				BannerModule,
				GalleryCarousel,
				MenuModule,
				TheLoveLifeMethodModule,
				PublicationsModule,
				SpaMenuModule,
				WidgetModule
			],
		},
		adTheorentActivityIdField,
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
		{
			name: "isSidebar",
			type: "checkbox",
			label: "Is legal, news, or faq page? (reduced padding)",
			required: true,
			defaultValue: false,
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

export default Pages;
