import type { Metadata } from "next";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { galleryImages } from "@/lib/data";
export const metadata: Metadata = { title: "Field Gallery" };
export default function GalleryPage() {
	return (
		<section className="section">
			<div className="container">
				<p className="eyebrow">Proof of the mission</p>
				<h1 className="display section-title">
					Stories from
					<br />
					the field.
				</h1>
				<p className="prose">
					Every photo reflects more than an adventure. It is a story of healing, hope, and connection, from sunrise on
					the water to laughter around camp.
				</p>
				<GalleryLightbox images={galleryImages} />
			</div>
		</section>
	);
}
