import { ArrowRight, Compass, HeartHandshake, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { contributionCopy, events, healingPowerCopy, mission } from "@/lib/data";
import { getProducts } from "@/lib/db";

export default async function Home() {
	const merchandise = (await getProducts()).filter((item) => item.category === "Merchandise" && item.featured);
	return (
		<>
			<section className="hero">
				<Image
					src="/quote-bg.jpg"
					alt="Veterans sharing an outdoor adventure"
					fill
					priority
					sizes="100vw"
				/>
				<div className="hero-shade" />
				<div className="container hero-content">
					<p className="eyebrow">Honoring Our Nation&apos;s Heroes</p>
					<h1 className="display">
						Open country.
						<br />
						Stronger bonds.
					</h1>
					<p>
						Fully funded outdoor adventures where Veterans and Gold Star families can reconnect, recover, and feel the
						strength of community.
					</p>
					<div className="hero-actions">
						<Link className="button orange" href="/application">
							Find your adventure <ArrowRight size={18} />
						</Link>
						<Link className="button hero-secondary" href="/donate">
							Fund a trip
						</Link>
					</div>
				</div>
			</section>
			<section className="mission-band">
				<div className="container mission-grid">
					<p className="eyebrow">Our mission</p>
					<h2 className="display">Service deserves more than thanks.</h2>
					<p>{mission}</p>
				</div>
			</section>
			<section className="section healing-section">
				<div className="container healing-grid">
					<div className="healing-video">
						<iframe
							src="https://www.youtube-nocookie.com/embed/yWHOErhxKQ4"
							title="The Healing Power of Nature"
							width="1280"
							height="720"
							loading="lazy"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
					<div>
						<p className="eyebrow">Why we head outside</p>
						<h2 className="display section-title">The Healing Power of Nature</h2>
						<p className="prose">{healingPowerCopy}</p>
					</div>
				</div>
			</section>
			<section className="section">
				<div className="container">
					<p className="eyebrow">In the field</p>
					<h2 className="display section-title">The next trail starts here.</h2>
					<div className="event-strip">
						{events.slice(0, 3).map((event, index) => (
							<article className="event-card" key={event.title}>
								<Image src={event.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
								<div className="event-number">0{index + 1}</div>
								<div className="event-copy">
									<span>{event.date}</span>
									<h3 className="display">{event.title}</h3>
									<p>{event.type}</p>
								</div>
							</article>
						))}
					</div>
					<Link className="text-link" href="/adventures">
						View all adventures <ArrowRight size={17} />
					</Link>
				</div>
			</section>
			<section className="impact">
				<div className="container impact-grid">
					<div>
						<p className="eyebrow">Why outdoors</p>
						<h2 className="display section-title">A different kind of support.</h2>
					</div>
					<div className="impact-points">
						<div>
							<Compass />
							<h3>Shared direction</h3>
							<p>Purposeful days outside create room to reset and move forward.</p>
						</div>
						<div>
							<HeartHandshake />
							<h3>Real camaraderie</h3>
							<p>Connect with people who understand the road you have traveled.</p>
						</div>
						<div>
							<ShieldCheck />
							<h3>Fully funded</h3>
							<p>Travel, meals, gear, and activities are covered for participants.</p>
						</div>
					</div>
				</div>
			</section>
			<section className="section">
				<div className="container">
					<p className="eyebrow">Mission gear</p>
					<h2 className="display section-title">Wear your support.</h2>
					<div className="product-grid">
						{merchandise.map((product) => (
							<ProductCard key={product.slug} product={product} />
						))}
					</div>
				</div>
			</section>
			<section className="contribution">
				<div className="container contribution-grid">
					<div>
						<p className="eyebrow">Every contribution makes a difference</p>
						<h2 className="display section-title">Show our Veterans they are never alone.</h2>
					</div>
					<div>
						<p>{contributionCopy}</p>
						<div className="hero-actions">
							<Link className="button orange" href="/donate">
								Donate now
							</Link>
							<Link className="text-link" href="/sponsorships-2">
								Explore sponsorships <ArrowRight size={17} />
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className="quote">
				<div className="container">
					<span>“</span>
					<blockquote>
						<p>
							This event meant the world to me! It gave me hope again in America and our country. It made me realize
							that I am not alone and there are other members who have been through what I have.
						</p>
						<p>
							The community involved in this event was the best. They lifted my spirits so much! It was emotional for me
							and very much needed.
						</p>
					</blockquote>
					<p>Derek · Army Purple Heart Recipient</p>
				</div>
			</section>
		</>
	);
}
