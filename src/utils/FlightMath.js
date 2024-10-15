function getLegDistance(x0, y0, x1, y1, mapRatio) {

	const legPixelSize = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));

	const legDistanceKm = convertPixelsToKm(legPixelSize, mapRatio);

	return legDistanceKm;
}

function convertPixelsToKm(pixels, mapRatio) {
	return (pixels / mapRatio);
}

function getLegHeading(x0, y0, x1, y1) {
	var angle = radiansToDegrees(Math.atan2((y1 - y0), (x1 - x0))) + 90;

	if (angle >= 360)
		angle -= 360;

	return angle; 
}

function radiansToDegrees(radians) {
	let degrees = radians * (180 / Math.PI);
	return (degrees + 360) % 360;
}

function getLegTimeSeconds(distance, speed) {
	return distance/(speed/3600); 
}

function getLegTimeString(distance, speed) {
	const legTimeSeconds = getLegTimeSeconds(distance, speed);

	var minutes = legTimeSeconds/60;
	var seconds = legTimeSeconds - minutes*legTimeSeconds;

	var hours = 0;
	if (minutes >= 60)
	{
		minutes = minutes - 60;
		hours = minutes / 60;
		minutes = minutes - hours*60;
	}

	var legTimeString;
	if (hours >= 1)
		legTimeString = `${hours.toPrecision(2)}:${minutes.toPrecision(2)}:${seconds.toPrecision(2)}`;
	else 
		legTimeString = `${minutes.toPrecision(2)}:${seconds.toPrecision(2)}`;

	return legTimeString;
}

const FlightMath = {
	getLegDistance,
	getLegHeading,
	getLegTimeString,
};

export default FlightMath;
