import sharp from "sharp";

const canvasWidth = 2500;
const canvasHeight = 600;
const mark = await sharp("public/vot-mark.png")
	.trim()
	.resize({
		width: 690,
		height: 360,
		fit: "contain",
		background: { r: 0, g: 0, b: 0, alpha: 0 },
	})
	.png()
	.toBuffer();

async function renderLine(text, fontSize, tracking) {
	const line = Buffer.from(`
		<svg width="2200" height="240" xmlns="http://www.w3.org/2000/svg">
			<text x="10" y="190" fill="#050505" font-family="Rockwell, serif" font-size="${fontSize}" font-weight="400" letter-spacing="${tracking}">${text}</text>
		</svg>
	`);

	return sharp(line)
		.trim()
		.resize({ width: 1430, fit: "fill" })
		.png()
		.toBuffer();
}

const veteranLine = await renderLine("VETERAN'S", 170, 10);
const outdoorTherapyLine = await renderLine("OUTDOOR THERAPY", 126, 4);

await sharp({
	create: {
		width: canvasWidth,
		height: canvasHeight,
		channels: 4,
		background: { r: 0, g: 0, b: 0, alpha: 0 },
	},
})
	.composite([
		{ input: mark, left: 70, top: 120 },
		{ input: veteranLine, left: 830, top: 120 },
		{ input: outdoorTherapyLine, left: 830, top: 320 },
	])
	.png()
	.toFile("public/vot-logo-navigation.png");