import Link from "next/link";
export default function RafflePage() {
	return (
		<section className="page-hero">
			<div className="container">
				<p className="eyebrow">Annual benefit raffle</p>
				<h1 className="display">
					Three chances.
					<br />
					One mission.
				</h1>
				<p>
					Tickets were $20 for three chances to win. The drawing took place March 13, 2026 at the Wilderness to Wellness
					benefit dinner. All state and federal firearm regulations apply.
				</p>
				<Link className="button orange" href="/events">
					See upcoming events
				</Link>
			</div>
		</section>
	);
}
