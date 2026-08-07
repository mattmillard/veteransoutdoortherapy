import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { mission } from "@/lib/data";
export const metadata: Metadata = { title: "Our Mission" };
export default function AboutPage() {
	return (
		<>
			<section className="page-hero">
				<div className="container">
					<p className="eyebrow">Built for those who served</p>
					<h1 className="display">
						Nature makes
						<br />
						room to heal.
					</h1>
				</div>
			</section>
			<section className="section">
				<div className="container story-grid">
					<div>
						<p className="eyebrow">Our mission</p>
						<h2 className="display section-title">Honor in motion.</h2>
						<p className="prose">{mission}</p>
						<Link className="button orange" href="/apply">
							Take the next step
						</Link>
					</div>
					<div className="story-image">
						<Image
							src="https://veteransoutdoortherapy.org/wp-content/uploads/2025/09/549644240_122157681338799810_154435253116294159_n-980x586.jpg"
							alt="Veterans gathering outdoors"
							fill
							sizes="(max-width: 800px) 100vw, 50vw"
						/>
					</div>
				</div>
			</section>
			<section className="values">
				<div className="container">
					<p className="eyebrow">Our compass</p>
					<div className="value-grid">
						<div>
							<b>01</b>
							<h3 className="display">Dignity</h3>
							<p>People are never reduced to a diagnosis, injury, or chapter of service.</p>
						</div>
						<div>
							<b>02</b>
							<h3 className="display">Camaraderie</h3>
							<p>Shared experience and honest connection are central to every outing.</p>
						</div>
						<div>
							<b>03</b>
							<h3 className="display">Access</h3>
							<p>Funding removes the practical barriers between participants and the outdoors.</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
