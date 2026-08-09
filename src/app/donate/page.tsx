import { ArrowRight, BedDouble, Fuel, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

const impact = [
	{
		icon: Fuel,
		amount: "$25",
		title: "Fuel the route",
		copy: "Helps move Veterans from the meeting point to open country.",
	},
	{
		icon: UtensilsCrossed,
		amount: "$100",
		title: "Share a meal",
		copy: "Provides meals and supplies during a fully funded adventure.",
	},
	{
		icon: BedDouble,
		amount: "$250",
		title: "Make camp possible",
		copy: "Supports lodging, field gear, and a participant's trip costs.",
	},
];

export default function DonatePage() {
	return (
		<>
			<section className="donate-page">
				<div className="container">
					<p className="eyebrow">Every gift moves the mission</p>
					<h1 className="display">
						Fuel the
						<br />
						next mile.
					</h1>
					<p>
						From a warm meal on a hunt to fuel for a fishing trip, your contribution gives Veterans and Gold Star
						families space to reconnect and heal outside.
					</p>
					<div className="hero-actions">
						<Link className="button orange" href="/product/custom-sponsor">
							Make a donation <ArrowRight size={18} />
						</Link>
						<Link className="button hero-secondary" href="/sponsorships">
							Explore sponsorships
						</Link>
					</div>
				</div>
			</section>
			<section className="section">
				<div className="container">
					<p className="eyebrow">Your impact in the field</p>
					<h2 className="display section-title">
						A gift becomes
						<br />
						an experience.
					</h2>
					<div className="donation-impact">
						{impact.map(({ icon: Icon, amount, title, copy }) => (
							<article key={title}>
								<Icon />
								<strong>{amount}</strong>
								<h3 className="display">{title}</h3>
								<p>{copy}</p>
							</article>
						))}
					</div>
				</div>
			</section>
			<section className="giving-band">
				<div className="container">
					<div>
						<p className="eyebrow">Give with confidence</p>
						<h2 className="display">No gift is too small.</h2>
					</div>
					<p>
						Every contribution supports the travel, meals, equipment, and coordination behind our outdoor programs.
						Secure payment is processed through PayPal.
					</p>
					<Link className="button orange" href="/product/custom-sponsor">
						Donate securely
					</Link>
				</div>
			</section>
		</>
	);
}
