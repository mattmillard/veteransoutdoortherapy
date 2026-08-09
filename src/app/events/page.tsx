import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getEvents } from "@/lib/db";

export const metadata: Metadata = { title: "Upcoming Events" };

export default async function EventsPage() {
	const events = (await getEvents())
		.filter((event) => event.published)
		.sort((a, b) => a.sortOrder - b.sortOrder);

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
						<article key={event.slug}>
							<div className="adventure-image">
								<Image src={event.image} alt={event.title} fill sizes="(max-width: 760px) 100vw, 45vw" />
							</div>
							<div>
								<span className="event-number">0{index + 1}</span>
								<p className="eyebrow">{event.type}</p>
								<h2 className="display">{event.title}</h2>
								<strong>{event.date}</strong>
								<p>{event.summary}</p>
								<Link className="button" href={`/events/${event.slug}`}>
									View event details
								</Link>
							</div>
						</article>
					))}
				</div>
			</section>
		</>
	);
}
