import Link from "next/link";
export default function PokerRunPage() {
	return (
		<>
			<section className="page-hero">
				<div className="container">
					<p className="eyebrow">2nd Annual · June 20, 2026</p>
					<h1 className="display">
						Ride with
						<br />
						purpose.
					</h1>
					<p>
						Join us for the 2nd Annual Veterans Outdoor Therapy Poker Run 2026 — a powerful day of riding, connection,
						and impact, all in support of Veterans and Gold Star families.
					</p>
					<Link className="button orange" href="/contact">
						Join the run
					</Link>
				</div>
			</section>
			<section className="section">
				<div className="container event-detail-grid">
					<article>
						<p className="eyebrow">Day of the ride</p>
						<h2 className="display">Start and finish together.</h2>
						<p>
							Start and finish at Head&apos;s Blacktop Harley-Davidson in Columbia. Registration opens at 8:30 AM and
							kickstands go up at 9:30 AM. Entry is $25 for one hand or $100 for five.
						</p>
					</article>
					<article>
						<p className="eyebrow">Route stops</p>
						<h2 className="display">Four stops. One mission.</h2>
						<ul>
							<li>Fulton VFW</li>
							<li>Concert &amp; Barrel Tavern in Hermann</li>
							<li>Teddy Joes in Martinsburg</li>
							<li>Mexico Veterans Home</li>
						</ul>
					</article>
					<article>
						<p className="eyebrow">After party</p>
						<h2 className="display">Bring it home.</h2>
						<p>Live band, raffle, and community celebration back at Head&apos;s Blacktop Harley-Davidson.</p>
					</article>
				</div>
			</section>
			<section className="giving-band">
				<div className="container">
					<div>
						<p className="eyebrow">Where proceeds go</p>
						<h2 className="display">Every mile funds recovery.</h2>
					</div>
					<p>
						All proceeds directly support outdoor therapy programs — providing opportunities like fishing, hiking,
						camping, and hunting that promote healing, camaraderie, and recovery.
					</p>
					<Link className="button orange" href="/donate">
						Support the mission
					</Link>
				</div>
			</section>
		</>
	);
}
