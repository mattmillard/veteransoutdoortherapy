import sharp from "sharp";

const source = "public/vot-logo-original.png";

async function crop(left, top, width, height) {
	return sharp(source).extract({ left, top, width, height }).png().toBuffer();
}

const [landscape, skullTop, skullBottom, veterans] = await Promise.all([
	crop(75, 0, 650, 325),
	crop(0, 305, 184, 132),
	crop(45, 420, 94, 100),
	crop(120, 305, 650, 137),
]);

const words = Buffer.from(`
<svg width="600" height="470" xmlns="http://www.w3.org/2000/svg">
	<g fill="#000" font-family="Arial, Helvetica, sans-serif" font-size="120" font-weight="800" letter-spacing="0">
		<text x="0" y="150">OUTDOOR</text>
		<text x="0" y="350">THERAPY</text>
	</g>
</svg>`);

await sharp({
	create: {
		width: 1360,
		height: 520,
		channels: 4,
		background: { r: 0, g: 0, b: 0, alpha: 0 },
	},
})
	.composite([
		{ input: landscape, left: 75, top: 0 },
		{ input: skullTop, left: 0, top: 305 },
		{ input: skullBottom, left: 45, top: 420 },
		{ input: veterans, left: 120, top: 305 },
		{ input: words, left: 750, top: 20 },
	])
	.png()
	.toFile("public/vot-logo-horizontal.png");
