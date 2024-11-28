const UnitConversion = {
	/**
	 * Unit conversion table. 
	 */
	table: {
		speed: {
			kph: {
				toMph: 0.621371,
				toKnots: 0.539957
			},
			mph: {
				tokph: 1.60934,
				toKnots: 0.868976
			},
			knots: {
				toKph: 1.852,
				toMph: 1.15078
			}
		},
		altitude:
		{
			metersToFeet: 3.28084,
			feetToMeters: 0.3048
		},
		distance: {
			km: {
				toMiles: 0.621371,
				toNauticalMiles: 0.539957
			},
			mi: {
				toKm: 1.60934,
				toNauticalMiles: 0.868976
			},
			nm: {
				toKm: 1.852,
				toMiles: 1.15078
			}
		},
		volume: {
			literToGallons: 0.264172,
			gallonsToLiters: 3.78541
		}
	},

	/**
	 * Get the conversion value to convert a distance from one given unit to another.
	 * 
	 * WARNING: MAKE SURE YOU ARE PASSING A IMPLEMENTED UNIT, AS PER DOCUMENTATION.
	 * 
	 * @param {string} newUnit New distance unit, either 'km', 'mi' or 'nm' (nautical miles).
	 * @param {string} oldUnit Old/current distance unit, either 'km', 'mi' or 'nm' (nautical miles).
	 * @returns Conversion value, simply multiply the current distance value by the conversion value.
	 */
	getDistanceConversionValue(newUnit, oldUnit) {
		var conversionValue = 1

		switch (newUnit) {
			case 'km':
				if (oldUnit === 'mi')
					conversionValue = this.table.distance.mi.toKm
				else if (oldUnit === 'nm')
					conversionValue = this.table.distance.nm.toKm
				break
			case 'mi':
				if (oldUnit === 'km')
					conversionValue = this.table.distance.km.toMiles
				else if (oldUnit === 'nm')
					conversionValue = this.table.distance.nm.toMiles
				break

			case 'nm':
				if (oldUnit === 'km')
					conversionValue = this.table.distance.km.toNauticalMiles
				else if (oldUnit === 'mi')
					conversionValue = this.table.distance.mi.toNauticalMiles
				break

			default:
				break
		}

		return conversionValue
	},

	/**
	 * Get the conversion value to convert a altitude from one given unit to another.
	 * 
	 * WARNING: MAKE SURE YOU ARE PASSING A IMPLEMENTED UNIT, AS PER DOCUMENTATION.
	 * 
	 * @param {string} newUnit New altitude unit, either 'm' or 'ft'.
	 * @param {string} oldUnit Old/current altitude unit, either 'ft' or 'm'.
	 * @returns Conversion value, simply multiply the current altitude value by the conversion value.
	 */
	getAltitudeConversionValue (newUnit, oldUnit) {
		var conversionValue = 1

		switch (newUnit) {
			case 'ft':
				if (oldUnit === 'ft')
					break
				else if (oldUnit === 'm')
					conversionValue = this.table.altitude.metersToFeet
				break
			case 'm':
				if (oldUnit === 'm')
					break
				else if (oldUnit === 'ft')
					conversionValue = this.table.altitude.feetToMeters
				break

			default:
				break
		}

		return conversionValue
	},

	/**
	 * Get the conversion value to convert a speed from one given unit to another.
	 * 
	 * WARNING: MAKE SURE YOU ARE PASSING A IMPLEMENTED UNIT, AS PER DOCUMENTATION.
	 * 
	 * @param {string} newUnit New speed unit, either 'kph', 'mph' or 'knots'.
	 * @param {string} oldUnit Old/current speed unit, either 'kph', 'mph' or 'knots'.
	 * @returns Conversion value, simply multiply the current speed value by the conversion value.
	 */
	getSpeedConversionValue (newUnit, oldUnit) {
		var conversionValue = 1

		switch (newUnit) {
			case 'kph':
				if (oldUnit === 'kph')
					break
				else if (oldUnit === 'mph')
					conversionValue = this.table.speed.mph.tokph
				else if (oldUnit === 'knots')
					conversionValue = this.table.speed.knots.toKph
				break
			case 'mph':
				if (oldUnit === 'mph')
					break
				else if (oldUnit === 'kph')
					conversionValue = this.table.speed.kph.toMph
				else if (oldUnit === 'knots')
					conversionValue = this.table.speed.knots.toMph
				break
			case 'knots':
				if (oldUnit === 'knots')
					break
				else if (oldUnit === 'kph')
					conversionValue = this.table.speed.kph.toKnots
				else if (oldUnit === 'mph')
					conversionValue = this.table.speed.mph.toKnots
				break
			default:
				break
		}

		return conversionValue
	},

	/**
	 * Get the conversion value to convert a volume from one given unit to another.
	 * 
	 * WARNING: MAKE SURE YOU ARE PASSING A IMPLEMENTED UNIT, AS PER DOCUMENTATION.
	 * 
	 * @param {string} newUnit New volume unit, accepts 'l', 'litres', 'liters' for liters 
	 * or 'gal', 'gallons' for gallons.
	 * @param {string} oldUnit Old volume unit, accepts 'l', 'litres', 'liters' for liters 
	 * or 'gal', 'gallons' for gallons.
	 * @returns Conversion value, simply multiply the current volume value by the conversion value.
	 */
	getVolumeConversionValue (newUnit, oldUnit) {
		let conversionValue = 1
		if (newUnit === oldUnit)
			return conversionValue

		switch (newUnit) {
			case 'l':
			case 'liters':
			case 'litres':
				if (oldUnit === 'gal' || oldUnit === 'gallons')
					conversionValue = this.table.volume.gallonsToLiters
				break
			case 'gal':
			case 'gallons':
				if (oldUnit === 'l' || oldUnit === 'liters' || oldUnit === 'litres')
					conversionValue = this.table.volume.literToGallons
				break
			default:
				break
		}

		return conversionValue
	}
}

export default UnitConversion


