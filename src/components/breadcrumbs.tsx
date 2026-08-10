import Link from "next/link";

export function Breadcrumbs({ items, light = false }: { items: Array<{ label: string; href?: string }>; light?: boolean }) {
	return (
		<nav className={`breadcrumbs${light ? " light" : ""}`} aria-label="Breadcrumb">
			<ol>
				{items.map((item, index) => (
					<li key={`${item.label}-${index}`}>
						{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
					</li>
				))}
			</ol>
		</nav>
	);
}
