import { ApplicationFormPage } from "@/components/application-form-page";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
export const metadata = pageMetadata({
	title: "Volunteer or Host an Outdoor Experience",
	description: "Volunteer, host an event, offer land or expertise, or help raise support for Veteran's Outdoor Therapy programs.",
	path: "/fundraising-application",
});
export default function FundraisingApplicationPage() {
	return (
		<><JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Applications", path: "/application" }, { name: "Volunteer or host", path: "/fundraising-application" }])} /><ApplicationFormPage
			eyebrow="Volunteer, host, or fundraiser"
			title="Help create the next adventure."
			copy="Tell us how you would like to contribute your time, location, experience, or fundraising support."
			type="volunteer-fundraiser-host"
		/></>
	);
}
