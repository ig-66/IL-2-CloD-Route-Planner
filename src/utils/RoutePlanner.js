import Maps from "../assets/maps/Maps";
import FlightMath from "./FlightMath";

const conversionTable = {
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
	}
} 

class RoutePlanner {

	#flightLegs = []
	#markers = []
	#speedUnit = 'kph'
	#altitudeUnit = 'm'
	#distanceUnit = 'km'

	/**
	 * 
	 * @param {function} setFlightLegCb Callback to set/update the state of the flight legs.
	 * @param {function} setMarkerCb Callback to set/update the state of the map markers.
	 * @param {*} setSpeedUnitCb Callback to set/update the state of the speed unit, either 'kph', 'mph' or 'knots'.
	 * @param {*} setAltitudeUnitCb Callback to set/update the state of the altitude unit, either 'm' (meters) or 'ft' (feet).
	 * @param {*} setDistanceUnitCb Callback to set/update the state of the distance unit, either 'km', 'mi' or 'nm' (nautical miles).
	 * @param {string} unit Inital/default unit, either 'metric' or 'imperial'.
	 * @param {number} defaultAltitude Initial/default altitude. 
	 * @param {number} defaultAirspeed Initial/defualt speed.
	 */
	constructor(setFlightLegCb, setMarkerCb, setSpeedUnitCb, setAltitudeUnitCb, setDistanceUnitCb, unit = 'metric', defaultAltitude = 1000, defaultAirspeed = 400) {
		this.setNewFlightLegs = setFlightLegCb
		this.setNewMarkers = setMarkerCb
		this.setSpeedUnit = setSpeedUnitCb
		this.setAltitudeUnit = setAltitudeUnitCb
		this.setDistanceUnit = setDistanceUnitCb
		this.unit = unit
		this.defaultAltitude = defaultAltitude
		this.defaultAirspeed = defaultAirspeed

		this.mapRatio = this.getMapObj().mapRatio
	}

	/**
	 * Add a marker on the given coordinate.
	 * 
	 * WARNING: this function will trigger a flight legs recalculation!
	 * 
	 * @param {number} lat Latitude - Y axis.
	 * @param {number} lng Longitude - X axis.
	 */
	addMarker(lat, lng) {
		const newMarker ={
			coord: {
				lat: lat,
				lng: lng
			},
			altitude: this.#markers.length > 0 ? this.#markers[this.#markers.length - 1].altitude ?? this.defaultAltitude : this.defaultAltitude,
			speed_ias: this.#markers.length > 0 ? this.#markers[this.#markers.length - 1].speed_ias ?? this.defaultAirspeed : this.defaultAirspeed
		}
		this.#markers = [...this.#markers, newMarker]
		this.#calculateFlightLegs()
	}

	/**
	 * Remove a given marker.
	 * 
	 * WARNING: this function will trigger a flight legs recalculation!
	 * 
	 * @param {number} id Marker ID.
	 */
	removeMarker(id)
	{
		this.#markers = this.#markers.filter((_, index) => index !== id); // creates a new array!
		this.#calculateFlightLegs()
	}

	/**
	 * Remove the last marker.
	 * 
	 * WARNING: this function will trigger a flight legs recalculation!
	 */
	removeLastMarker()
	{
		const updatedMarkers = this.#markers.slice(0, -1); // creates a new array!
		this.#markers = updatedMarkers;
		this.#calculateFlightLegs()
	}

	/**
	 * Modify the properties of a given marker and trigger a flight leg recalculation.
	 * 
	 * WARNING: this function will trigger a flight legs recalculation!
	 * 
	 * @param {number} id Marker ID.
	 * @param {object} markerObj New properties of the marker.
	 */
	modifyMarker(id, markerObj) {
		const updatedMarkers = [...this.#markers] // create a new array, once again weeee
		updatedMarkers[id] = markerObj
		this.#markers = updatedMarkers;
		this.#calculateFlightLegs();
	}

	/**
	 * Removes all markers/flight legs.
	 */
	removeAllMarkers()
	{
		this.#markers = []
		this.#calculateFlightLegs()
	}

	changeSpeedUnit(speedUnit)
	{
		var conversionValue = 1
		switch (speedUnit) {
			case 'kph':
				if (this.#speedUnit === 'kph')
					return
				else if (this.#speedUnit === 'mph')
					conversionValue = conversionTable.speed.mph.tokph
				else if (this.#speedUnit === 'knots')
					conversionValue = conversionTable.speed.knots.toKph
				break
			case 'mph':
				if (this.#speedUnit === 'mph')
					return
				else if (this.#speedUnit === 'kph')
					conversionValue = conversionTable.speed.kph.toMph
				else if (this.#speedUnit === 'knots')
					conversionValue = conversionTable.speed.knots.toMph
				break
			case 'knots':
				if (this.#speedUnit === 'knots')
					return
				else if (this.#speedUnit === 'kph')
					conversionValue = conversionTable.speed.kph.toKnots
				else if (this.#speedUnit === 'mph')
					conversionValue = conversionTable.speed.mph.toKnots
				break
			default:
				return
		}
		var newMarkers = this.#markers.map((marker) => ({
			...marker,
			speed_ias: marker.speed_ias * conversionValue
		}))

		this.#markers = [...newMarkers]

		this.#speedUnit = speedUnit
		this.setSpeedUnit(speedUnit)

		this.#calculateFlightLegs()
	}

	changeAltitudeUnit(altitudeUnit)
	{
		var conversionValue = 1
		switch (altitudeUnit) {
			case 'ft':
				if (this.#altitudeUnit === 'ft')
					return
				else if (this.#altitudeUnit === 'm')
					conversionValue = conversionTable.altitude.metersToFeet
				break
			case 'm':
				if (this.#altitudeUnit === 'm')
					return
				else if (this.#altitudeUnit === 'ft')
					conversionValue = conversionTable.altitude.feetToMeters
				break

			default:
				return
		}
		// convert on markers
		var newMarkers = this.#markers.map((marker) => ({
			...marker,
			altitude: marker.altitude * conversionValue
		}))

		this.#markers = [...newMarkers]
		
		this.#altitudeUnit = altitudeUnit
		this.setAltitudeUnit(altitudeUnit)

		this.#calculateFlightLegs()
	}

	changeDistanceUnit(distanceUnit)
	{
		var conversionValue = 1
		switch (distanceUnit) {
			case 'km':
				if (this.#distanceUnit === 'mi')
					conversionValue = conversionTable.distance.mi.toKm
				else if (this.#distanceUnit === 'nm')
					conversionValue = conversionTable.distance.nm.toKm
				break
			case 'mi':
				if (this.#distanceUnit === 'km')
					conversionValue = conversionTable.distance.km.toMiles
				else if (this.#distanceUnit === 'nm')
					conversionValue = conversionTable.distance.nm.toMiles
				break

			case 'nm':
				if (this.#distanceUnit === 'km')
					conversionValue = conversionTable.distance.km.toNauticalMiles
				else if (this.#distanceUnit === 'mi')
					conversionValue = conversionTable.distance.mi.toNauticalMiles
				break
			
			default:
				return
		}

		// convert on flight legs
		var newFlightLegs = this.#flightLegs.map((leg) => ({
			...leg,
			distance: leg.distance * conversionValue
		}))

		this.#flightLegs = [...newFlightLegs]

		this.setNewFlightLegs(newFlightLegs)
		this.#distanceUnit = distanceUnit
		this.setDistanceUnit(distanceUnit)
	}

	/**
	 * Get the desired map object (and properties).
	 * 
	 * @param {string} mapName Map name. 
	 * @returns Map object.
	 */
	getMapObj(mapName)
	{
		const map = Maps[mapName];
		if (map) {
			this.mapRatio = map.mapRatio;
			return map;
		}

		const defaultMap = Object.values(Maps)[0];
		this.mapRatio = defaultMap.mapRatio;
		return defaultMap;
	}

	/**
	 * Get the implemented maps name and display name.
	 * 
	 * @returns Array with the name and displayName of the options.
	 */
	getMaps()
	{
		return Object.values(Maps).map(({ name, displayName }) => ({
			name,
			displayName
		}))
	}

	#calculateFlightLegs ()
	{
		this.setNewMarkers(this.#markers)

		if (!(this.#markers.length > 1))
		{
			const newFlighLegs = []
			this.#flightLegs = newFlighLegs
			this.setNewFlightLegs(this.#flightLegs)
			return
		}

		var newFlighLegs = []

		this.#markers.forEach((marker, index) => {
			if (index === 0) return;

			let lastMarker = this.#markers[index - 1]

			let heading = FlightMath.getLegHeading(lastMarker.coord.lng, lastMarker.coord.lat, marker.coord.lng, marker.coord.lat)

			let distance = FlightMath.getLegDistance(lastMarker.coord.lng, lastMarker.coord.lat, marker.coord.lng, marker.coord.lat, this.mapRatio, this.unit)

			// let speed = index >= this.#flightLegs.length || !this.#flightLegs[index] ? this.defaultAirspeed : this.#flightLegs[index].speed ?? this.#flightLegs[index - 1].speed ?? this.defaultAirspeed

			let speed = index >= this.#markers.length || !this.#markers[index] ? this.defaultAirspeed : this.#markers[index].speed_ias

			let time = FlightMath.getLegTimeString(distance, speed)

			let altitude = index >= this.#markers.length || !this.#markers[index] ? this.defaultAltitude : this.#markers[index].altitude

			let newFlightLeg = {
				coord:
				{
					start: {
						lat: lastMarker.coord.lat,
						lng: lastMarker.coord.lng,
					},
					end: {
						lat: marker.coord.lat,
						lng: marker.coord.lng
					}
				},
				heading: heading,
				distance: distance,
				altitude: altitude,
				speed: speed,
				time: time,
			}

			newFlighLegs = [...newFlighLegs, newFlightLeg]

		})

		this.#flightLegs = newFlighLegs

		this.setNewFlightLegs(newFlighLegs)
	}
}

export default RoutePlanner;
