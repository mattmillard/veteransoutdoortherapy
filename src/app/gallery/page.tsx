import type { Metadata } from "next";
import Image from "next/image";
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
				<div className="gallery-grid">
					{galleryImages.map((image, index) => (
						<div key={image} className={index % 5 === 0 ? "wide" : ""}>
							<Image
								src={image}
								alt={`Veterans Outdoor Therapy field experience ${index + 1}`}
								fill
								sizes="(max-width: 700px) 100vw, 40vw"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
