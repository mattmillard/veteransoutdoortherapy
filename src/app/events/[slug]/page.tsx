import { CalendarDays, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events as seedEvents } from "@/lib/data";
import { getEvent } from "@/lib/db";

export function generateStaticParams() {
	return seedEvents.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const event = await getEvent(slug);
	if (!event || !event.published) return {};
	return { title: event.title, description: event.summary };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const event = await getEvent(slug);
	if (!event || !event.published) notFound();

	return (
		<>
			<section className={`event-page-hero ${event.template}`}>
				<div className="container event-page-hero-grid">
					<div>
						<p className="eyebrow">{event.type}</p>
						<h1 className="display">{event.heroTitle}</h1>
						<p>{event.summary}</p>
						<div className="event-meta">
							<span>
								<CalendarDays size={18} /> {event.date}
							</span>
							<span>
								<MapPin size={18} /> {event.location}
							</span>
						</div>
						<Link className="button orange" href={event.ctaHref}>
							{event.ctaLabel}
						</Link>
					</div>
					<div className="event-page-image">
						<Image src={event.image} alt={event.title} fill priority sizes="(max-width: 800px) 100vw, 48vw" />
					</div>
				</div>
			</section>
			<section className="section event-page-content">
				<div className="container event-page-sections">
					<article>
						<p className="eyebrow">{event.title}</p>
						<h2 className="display">{event.overviewTitle}</h2>
						<p>{event.overview}</p>
					</article>
					<article>
						<h2 className="display">{event.detailsTitle}</h2>
						<p>{event.details}</p>
					</article>
				</div>
			</section>
			<section className="giving-band">
				<div className="container">
					<div>
						<h2 className="display">{event.title}</h2>
					</div>
					<p>{event.summary}</p>
					<Link className="button orange" href={event.ctaHref}>
						{event.ctaLabel}
					</Link>
				</div>
			</section>
		</>
	);
}
