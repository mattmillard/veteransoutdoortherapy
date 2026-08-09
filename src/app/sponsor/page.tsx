import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/db";
import { sponsorLogos } from "@/lib/sponsors";
import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Sponsorships",
	alternates: { canonical: "/sponsorships" },
};
const uploads = "https://veteransoutdoortherapy.org/wp-content/uploads";
const tierDetails: Record<string, { tagline: string; benefits: string[] }> = {
	"bronze-sponsor": {
		tagline: "Help Make A Difference",
		benefits: [
			"Recognition on our website",
			"Free sponsor badge",
			"Newsletter mention",
			"Social media shoutout",
			"Event participation",
		],
	},
	"silver-sponsor": {
		tagline: "Sponsor A Hero",
		benefits: [
			"Partial Veteran sponsorship",
			"Logo on event materials",
			"Priority event invitations",
			"Dedicated social media post",
			"Exclusive networking opportunities",
			"Annual appreciation dinner invite",
		],
	},
	"gold-sponsor": {
		tagline: "Sponsor an Event",
		benefits: [
			"Fund a full event",
			"Prominent logo placement",
			"Priority event invitations",
			"Dedicated social media post",
			"Exclusive networking opportunities",
			"Feature in press releases",
			"Social media shoutout",
			"VIP access to events",
		],
	},
};
const customTier = {
	tagline: "Build a custom partnership",
	benefits: [
		"Direct support for outdoor programs",
		"Recognition tailored to your partnership",
		"Connection with mission events",
		"Personal planning with our team",
	],
};
const sponsorEvents = [
	{
		title: "Poker Run",
		date: "June 2026",
		image: `${uploads}/2025/10/thumbnail_IMG_4884-980x735.jpg`,
		copy: "Ride with purpose and help fund outdoor experiences for Veterans and Gold Star families.",
	},
	{
		title: "Gold Star Peak Hike",
		date: "2027",
		image: `${uploads}/2025/09/510943338_122138281850799810_4751360453603558598_n-980x575.jpg`,
		copy: "Embark on a scenic hike to Gold Star Peak. A great opportunity for Veterans to connect and unwind.",
	},
	{
		title: "Antelope Hunt Adventure",
		date: "September 2026",
		image: `${uploads}/2025/09/552626211_122157952436799810_562294068412297872_n-980x735.jpg`,
		copy: "Help make a fully supported archery antelope hunt possible in South Dakota.",
	},
];
export default async function SponsorPage() {
	const levels = (await getProducts())
		.filter((item) => item.category === "Sponsorships" && item.slug !== "custom-sponsor")
		.sort((a, b) => a.price - b.price);
	return (
		<>
			<section className="page-hero sponsor-hero">
				<div className="container">
					<p className="eyebrow">Empower our heroes through nature</p>
					<h1 className="display">
						Join Our Mission to
						<br />
						Heal Veterans Outdoors
					</h1>
					<p>
						Discover how your sponsorship can transform the lives of veterans through outdoor therapy. Your support is
						crucial in providing healing experiences in nature.
					</p>
					<Link className="button orange" href="#tiers">
						Explore sponsorships
					</Link>
				</div>
			</section>
			<section className="section" id="tiers">
				<div className="container">
					<p className="eyebrow">Sponsorship tiers</p>
					<h2 className="display section-title">Choose your impact.</h2>
					<div className="sponsor-grid">
						{levels.map((level) => {
							const details = tierDetails[level.slug] ?? customTier;
							return (
								<article key={level.slug}>
									<p className="eyebrow">{level.shortName}</p>
									<h2 className="display">${level.price.toLocaleString()}+</h2>
									<strong>{details.tagline}</strong>
									{details.benefits.map((benefit) => (
										<span key={benefit}>
											<Check size={17} />
											{benefit}
										</span>
									))}
									<Link className="button" href={`/product/${level.slug}`}>
										Become a sponsor
									</Link>
								</article>
							);
						})}
					</div>
				</div>
			</section>
			<section className="sponsor-proof">
				<div className="container">
					<div>
						<p className="eyebrow">What sponsorship funds</p>
						<h2 className="display">Travel. Gear. Meals. Time together.</h2>
					</div>
					<p>
						Every level helps cover the practical details behind fully funded hunts, fishing trips, horseback camps,
						hikes, and community events.
					</p>
					<Link className="button orange" href="/contact">
						Build a custom partnership
					</Link>
				</div>
			</section>
			<section className="section">
				<div className="container">
					<p className="eyebrow">With gratitude</p>
					<h2 className="display section-title">2025 Sponsors</h2>
					<div className="sponsor-logos">
						{sponsorLogos.map((sponsor) => (
							<figure key={sponsor.image}>
								<Image src={sponsor.image} alt={sponsor.name} fill sizes="(max-width: 600px) 50vw, 20vw" />
							</figure>
						))}
					</div>
				</div>
			</section>
			<section className="section sponsor-events-section">
				<div className="container">
					<p className="eyebrow">Upcoming sponsorship events</p>
					<h2 className="display section-title">Put support behind an experience.</h2>
					<div className="sponsor-events">
						{sponsorEvents.map((event) => (
							<article key={event.title}>
								<div className="sponsor-event-image">
									<Image src={event.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" />
								</div>
								<span>{event.date}</span>
								<h3 className="display">{event.title}</h3>
								<p>{event.copy}</p>
								<Link className="text-link" href="/contact">
									Sponsor this event <ArrowRight size={17} />
								</Link>
							</article>
						))}
					</div>
				</div>
			</section>
			<section className="giving-band">
				<div className="container">
					<div>
						<p className="eyebrow">Get involved today</p>
						<h2 className="display">Your support changes lives.</h2>
					</div>
					<p>
						Your support can make a significant difference in the lives of veterans. Apply for a sponsorship or donate
						now to help us continue our mission of healing through outdoor therapy.
					</p>
					<Link className="button orange" href="/product/custom-sponsor">
						Become a sponsor
					</Link>
				</div>
			</section>
		</>
	);
}
