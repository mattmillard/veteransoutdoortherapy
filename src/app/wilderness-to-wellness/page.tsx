import Link from "next/link";
export default function WellnessPage() {
	return (
		<>
			<section className="page-hero">
				<div className="container">
					<p className="eyebrow">Wilderness to Wellness</p>
					<h1 className="display">
						Honoring our past.
						<br />
						Healing in the present.
						<br />
						Hope for the future.
					</h1>
					<p>
						Join us for an evening that celebrates the power of nature, community, and resilience. Wilderness to
						Wellness is more than a banquet — it&apos;s a journey through stories of service, healing, and hope.
					</p>
					<Link className="button orange" href="/contact">
						Ask about the next event
					</Link>
				</div>
			</section>
			<section className="section">
				<div className="container story-copy">
					<p className="eyebrow">Join us on the path</p>
					<h2 className="display section-title">From Wilderness to Wellness.</h2>
					<p className="prose">
						Together, we honor the service and sacrifice of our nation&apos;s heroes while sharing the transformative
						peace that comes from the great outdoors. The 2026 event is sold out, but the mission and the path forward
						continue.
					</p>
					<Link className="text-link" href="/sponsorships">
						Join us in making a difference
					</Link>
				</div>
			</section>
		</>
	);
}
