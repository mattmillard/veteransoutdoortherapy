import { ExternalLink, Mail, Mountain } from "lucide-react";
import Link from "next/link";
export function Footer() {
	return (
		<footer className="footer">
			<div className="container footer-grid">
				<div>
					<Mountain size={34} />
					<h2 className="display">
						The best therapy
						<br />
						is outside.
					</h2>
					<p>
						Veterans Outdoor Therapy is a nonprofit creating fully funded outdoor experiences for America&apos;s heroes.
					</p>
				</div>
				<div>
					<h3>Explore</h3>
					<Link href="/about">Our mission</Link>
					<Link href="/adventures">Adventures</Link>
					<Link href="/gallery">Field gallery</Link>
				</div>
				<div>
					<h3>Take action</h3>
					<Link href="/application">Apply</Link>
					<Link href="/sponsorships-2">Sponsor</Link>
					<Link href="/donate">Donate</Link>
					<Link href="/shop">Shop</Link>
				</div>
				<div>
					<h3>Connect</h3>
					<a href="mailto:contact@veteransoutdoortherapy.org">
						<Mail size={16} /> Email us
					</a>
					<a
						href="https://www.facebook.com/p/Veterans-Outdoor-Therapy-61573994307519/"
						target="_blank"
						rel="noreferrer">
						<ExternalLink size={16} /> Facebook
					</a>
					<Link href="/contact">Contact</Link>
				</div>
			</div>
			<div className="container footer-bottom">
				<span>© {new Date().getFullYear()} Veterans Outdoor Therapy</span>
				<Link href="/admin">Admin</Link>
			</div>
		</footer>
	);
}
