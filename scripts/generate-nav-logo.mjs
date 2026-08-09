import sharp from "sharp";

const canvasWidth = 2500;
const canvasHeight = 600;
const mark = await sharp("public/vot-mark.png")
	.resize({ width: 780, height: 390, fit: "contain" })
	.png()
	.toBuffer();

const wordmark = Buffer.from(`
	<svg width="${canvasWidth}" height="${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
		<g fill="#050505" stroke="#050505" stroke-width="1" font-family="Rockwell, serif" font-weight="400">
			<text x="900" y="270" font-size="176" letter-spacing="4">VETERAN'S</text>
			<text x="900" y="440" font-size="138" letter-spacing="4">OUTDOOR THERAPY</text>
		</g>
	</svg>
`);

await sharp({
	create: {
		width: canvasWidth,
		height: canvasHeight,
		channels: 4,
		background: { r: 0, g: 0, b: 0, alpha: 0 },
	},
})
	.composite([
		{ input: mark, left: 60, top: 105 },
		{ input: wordmark, left: 0, top: 0 },
	])
	.png()
	.toFile("public/vot-logo-navigation.png");