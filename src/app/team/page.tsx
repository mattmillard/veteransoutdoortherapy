import Image from "next/image";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata({
	title: "Veteran's Outdoor Therapy Leadership and Team",
	description: "Meet the volunteers and leaders who plan fully funded outdoor experiences for previously deployed Veterans and Gold Star families.",
	path: "/team",
});
export default function TeamPage() {
	return (
		<section className="section">
			<div className="container">
				<p className="eyebrow">The people behind the mission</p>
				<h1 className="display section-title">Meet the people responsible for the mission.</h1>
				<p className="prose">
					Our team includes Veterans and passionate outdoor advocates who coordinate every trip, partner, and detail
					behind the scenes.
				</p>
				<div className="team-grid">
					{["Crystal - President", "Travis", "Jason"].map((name) => (
						<article key={name}>
							<div>
								<Image
									src="https://veteransoutdoortherapy.org/wp-content/uploads/2025/10/portrait-03.jpg"
									alt={name}
									fill
									sizes="33vw"
								/>
							</div>
							<h2 className="display">{name}</h2>
							{name.startsWith("Crystal") && (
								<p>
									A proud Veteran and outdoorswoman, Crystal leads with heart and purpose, helping fellow Veterans find
									peace and connection through every adventure.
								</p>
							)}
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
