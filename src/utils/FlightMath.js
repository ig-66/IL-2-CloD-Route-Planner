
/**
 * Convert an angle from radians to degrees. 
 * 
 * @param {number} radians - angle in radians. 
 * @returns Angle in degrees.
 */
function radiansToDegrees(radians) {
	let degrees = radians * (180 / Math.PI);
	return (degrees + 360) % 360;
}

/**
 * Get the flight leg time/duration, in seconds.
 * 
 * @param {number} distance - distance, in metric (kilometers) or imperial (miles).
 * @param {number} speed - speed, in metric (km/h) or imperial (mph).
 * @returns Flight leg time, in seconds.
 */
function getLegTimeSeconds(distance, speed) {
	return distance / (speed / 3600);
}

const FlightMath = {
	/**
	 * Get the leg distance, in kilometers or mile, with the given coordinates.
	 * 
	 * @param {number} x0 - Initial point X.
	 * @param {number} y0 - Initial point Y.
	 * @param {number} x1 - Final point X.
	 * @param {number} y1 - Final point Y.
	 * @param {number} mapRatio - Map ratio, in pixels/km.
	 * @param {string} p_unit - Unit in which the distance is returned. If 'km', distance will be in km, otherwise in miles.  
	 * @returns Leg distance, in km or mi.
	 */
	getLegDistance(x0, y0, x1, y1, mapRatio, p_unit) {

		const legDistancePixels = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));

		const legDistanceKm = (legDistancePixels / mapRatio);

		var legDistance;
		if (p_unit === 'km' || p_unit === 'metric')
			legDistance = legDistanceKm;
		else
			legDistance = legDistanceKm / 1.60934

		return legDistance;
	},

	/**
	 * Get the leg heading in degrees.
	 * 
	 * @param {number} x0 - Initial point X.
	 * @param {number} y0 - Initial point Y.
	 * @param {number} x1 - Final point X.
	 * @param {number} y1 - Final point Y.
	 * @returns 
	 */
	getLegHeading(x0, y0, x1, y1) {
		var angle = radiansToDegrees(Math.atan2((y1 - y0), (x1 - x0))) + 90;

		if (angle >= 360)
			angle -= 360;

		return angle;
	},

	/**
	 * Get the flight leg time string.
	 * 
	 * @param {number} distance - distance, in metric (kilometers) or imperial (miles).
	 * @param {number} speed - speed, in metric (km/h) or imperial (mph).
	 * @returns Time string in the format: "hh:mm:ss" or "mm:ss".
	 */
	getLegTimeString(distance, speed) {
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
	},

	/**
	 * Convert a given length in meters to feet.
	 * 
	 * @param {number} meter - value, in meters.
	 * @returns Value in feet.
	 */
	convertMeterToFeet(meter) {
		return meter * 3.28084;
	},

	/**
	 * Convert a given length in feet to meter.
	 * 
	 * @param {number} feet - value, in feet.
	 * @returns Value in meters.
	 */
	convertFeetToMeter(feet) {
		return feet * 0.3048;
	},

	/**
	 * Convert a given speed from km/h to mph.
	 * 
	 * @param {number} kph - speed, in km/h.
	 * @returns converted speed, in mph.
	 */
	convertKphToMph(kph) {
		return kph / 1.60934;
	},

	/**
	 * Convert a given speed from mph to km/h.
	 * 
	 * @param {number} mph - speed, in mph.
	 * @returns converted speed, in km/h.
	 */
	convertMphToKph(mph) {
		return mph * 1.60934;
	},

	/**
	 * Calculate the (approximate) True Air Speed with the given altitude and speed.
	 * 
	 * WARNING: both altitude and speed must be either metric or imperial. DO NOT pass
	 * an altitude in feet and speed in km/h.
	 * 
	 * @param {number} altitude - Altitude, in metric (meters) or imperial (feet) unit.
	 * @param {number} ias - Indicated Air Speed, in metric (km/h) or imperial (mph) unit.
	 * @param {boolean} isMetric - Whether the passed `altitude` and `ias` are in metric unit or not. 
	 * @returns True Air Speed (TAS) in metric (km/h) or imperial (mph).
	 */
	calculateTAS(altitude, ias, isMetric) {
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
			tas = ias * (((this.convertFeetToMeter(altitude) / 500) * 0.03) + 1)

		return tas;
	},

	/**
	 * Adds the true (geographic) heading with the magnetic heading.
	 * 
	 * @param {number} trueHDG - True/geographic heading.
	 * @param {number} variation - Magnetic variation.
	 * @returns Resulting corrected heading.
	 */
	addHeadingVariation(trueHDG, variation) {
		return ((trueHDG + variation) % 360);
	}
};

export default FlightMath;
