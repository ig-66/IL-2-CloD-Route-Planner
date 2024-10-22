function getLegDistance(x0, y0, x1, y1, mapRatio, p_unit) {

	const legPixelSize = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));

	const legDistanceKm = convertPixelsToKm(legPixelSize, mapRatio);

	var legDistance;
	if (p_unit === 'km')
		legDistance = legDistanceKm;
	else 
		legDistance = legDistanceKm / 1.60934

	return legDistance;
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

	const hours = Math.floor(legTimeSeconds / 3600);
	const minutes = Math.floor((legTimeSeconds % 3600) / 60);
	const seconds = Math.floor(legTimeSeconds % 60);

	let legTimeString;
	if (hours > 0) {
		legTimeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	} else {
		legTimeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}

	return legTimeString;
}

function convertMeterToFeet(meter) {
	return meter * 3.28084;
}

function convertFeetToMeter(feet) {
	return feet * 0.3048;
}

function convertKphToMph(kph) {
	return kph / 1.60934;
}

function convertMphToKph(mph) {
	return mph * 1.60934;
}

function calculateTAS(altitude, ias, isMetric) {
	let tas;
	
	/**
	 * According to the Flashcards All Aircraft-en.pdf, page 64, in the game folder:
	 * 
	 *  	"Pilot tip: TAS can be approximated by adding 3% to IAS for every 500 m of altitude. 
	 *  	For example, at 5000 m with anIAS of 340 km/h, the TAS is 340 + 30% ≈ 440 km/h. 
	 *  	This is the figure you should enter in the bombsight"
	*/

	if (isMetric)
		tas = ias * (((altitude / 500) * 0.03) + 1) 
	else 
		tas = ias * (((convertFeetToMeter(altitude) / 500) * 0.03) + 1)
	
	return tas;
}

function addHeadingVariation(trueHDG, variation)
{
	return (((trueHDG + variation) % 360) + 360) % 360;
}

const FlightMath = {
	getLegDistance,
	getLegHeading,
	getLegTimeString,
	convertMeterToFeet,
	convertFeetToMeter,
	convertKphToMph,
	convertMphToKph,
	calculateTAS,
	addHeadingVariation
};

export default FlightMath;
