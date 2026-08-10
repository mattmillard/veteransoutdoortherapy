import { GalleryLightbox } from "@/components/gallery-lightbox";
import Link from "next/link";
import { galleryImages } from "@/lib/data";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata({
	title: "Veteran Outdoor Adventure Photo Gallery",
	description: "See Veteran's Outdoor Therapy in the field through photos from hunting, horseback riding, community events, and fully funded outdoor experiences.",
	path: "/gallery",
});
export default function GalleryPage() {
	return (
		<section className="section">
			<div className="container">
				<p className="eyebrow">Proof of the mission</p>
				<h1 className="display section-title">Veteran&apos;s Outdoor Therapy in the field.</h1>
				<p className="prose">
					Every photo reflects more than an adventure. It is a story of healing, hope, and connection, from sunrise on
					the water to laughter around camp.
				</p>
				<Link className="text-link" href="/field-stories">Read the stories behind recent experiences</Link>
				<GalleryLightbox images={galleryImages} />
			</div>
		</section>
	);
}
