import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { events } from "@/lib/data";
export const metadata: Metadata = { title: "Outdoor Adventures" };
export default function AdventuresPage() {
	return (
		<>
			<section className="page-hero">
				<div className="container">
					<p className="eyebrow">2026 field calendar</p>
					<h1 className="display">
						Go farther,
						<br />
						together.
					</h1>
					<p>Every trip is built around connection, challenge, and the quiet that only open country can provide.</p>
				</div>
			</section>
			<section className="section">
				<div className="container adventure-list">
					{events.map((event, index) => (
						<article key={event.title}>
							<div className="adventure-image">
								<Image src={event.image} alt={event.title} fill sizes="(max-width: 760px) 100vw, 45vw" />
							</div>
							<div>
								<span className="event-number">0{index + 1}</span>
								<p className="eyebrow">{event.type}</p>
								<h2 className="display">{event.title}</h2>
								<strong>{event.date}</strong>
								<p>
									Details and registration information are shared with selected participants. Travel, core gear, meals,
									and activities are funded by our donors and sponsors.
								</p>
								<Link className="button" href="/apply">
									Apply for support
								</Link>
							</div>
						</article>
					))}
				</div>
			</section>
		</>
	);
}
