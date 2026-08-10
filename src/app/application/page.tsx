import { ApplicationHub } from "@/components/application-hub";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
export const metadata = pageMetadata({
	title: "Apply for a Veteran or Gold Star Outdoor Program",
	description: "Choose the Veteran's Outdoor Therapy application for previously deployed Veterans, Gold Star families, volunteers, hosts, or fundraisers.",
	path: "/application",
});
export default function ApplicationPage() {
	return <><JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Applications", path: "/application" }])} /><ApplicationHub /></>;
}
