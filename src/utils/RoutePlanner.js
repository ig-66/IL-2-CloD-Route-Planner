import Maps from "../assets/maps/Maps";
import FlightMath from "./FlightMath";
import UnitConversion from "./UnitConversion";

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
	constructor(setFlightLegCb, setMarkerCb, setSpeedUnitCb, setAltitudeUnitCb, setDistanceUnitCb, defaultAltitude = 1000, defaultAirspeed = 400) {
		this.setNewFlightLegs = setFlightLegCb
		this.setNewMarkers = setMarkerCb
		this.setSpeedUnit = setSpeedUnitCb
		this.setAltitudeUnit = setAltitudeUnitCb
		this.setDistanceUnit = setDistanceUnitCb
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
		const newMarker = {
			coord: {
				lat: markerObj.coord.lat,
				lng: markerObj.coord.lng
			},
			altitude: Number(markerObj.altitude),
			speed_ias: Number(markerObj.speed_ias)
		}
		const updatedMarkers = [...this.#markers] // create a new array, once again weeee
		updatedMarkers[id] = newMarker
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
		var newMarkers = this.#markers.map((marker) => ({
			...marker,
			speed_ias: marker.speed_ias * UnitConversion.getSpeedConversionValue(speedUnit, this.#speedUnit)
		}))

		this.#markers = [...newMarkers]

		this.#speedUnit = speedUnit
		this.setSpeedUnit(speedUnit)

		this.#calculateFlightLegs()
	}

	changeAltitudeUnit(altitudeUnit)
	{
		// convert on markers
		var newMarkers = this.#markers.map((marker) => ({
			...marker,
			altitude: marker.altitude * UnitConversion.getAltitudeConversionValue(altitudeUnit, this.#altitudeUnit)
		}))

		this.#markers = [...newMarkers]
		
		this.#altitudeUnit = altitudeUnit
		this.setAltitudeUnit(altitudeUnit)

		this.#calculateFlightLegs()
	}

	changeDistanceUnit(distanceUnit)
	{
		// convert on flight legs
		var newFlightLegs = this.#flightLegs.map((leg) => ({
			...leg,
			distance: leg.distance * UnitConversion.getDistanceConversionValue(distanceUnit, this.#distanceUnit)
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

	/**
	 * Get the route export object.
	 * 
	 * @param {string} mapName Current map name.
	 * @param {boolean} useMagneticHDG Whether or not to use magnetic or true heading.
	 * @returns Route export object.
	 */
	getRouteExportObject(mapName, useMagneticHDG)
	{
		// {
		// 	"map": "channel",
		// 	"useMagneticHDG": true,
		// 	"units": {
		// 		"speed": "kph",
		// 		"altitude": "m",
		// 		"distance": "km"
		// 		},
		// 	"markers": []
		// }

		let routeExportObject = {
			map: mapName,
			useMagneticHDG: useMagneticHDG,
			units: {
				speed: this.#speedUnit,
				altitude: this.#altitudeUnit,
				distance: this.#distanceUnit
			},
			markers: this.#markers
		}

		return routeExportObject
	}

	/**
	 * Apply the passed options
	 * 
	 * WARNING: BE AWARE THE ROUTE PLANNER OBJECT DOES NOT CONTROL MAGNETIC HEADING NOR
	 * MAP SELECTION, THOSE MUST BE SET ELSEWHERE!
	 * 
	 * @param {object} routeObj Route object.
	 * @returns true if not error, otherwise failed to export.
	 */
	applyRouteImportObject(routeObj)
	{
		let isImportOk = false

		const requiredProperties = ['map', 'useMagneticHDG', 'units', 'markers']

		for (const prop of requiredProperties) {
			if (!routeObj.hasOwnProperty(prop))
				return isImportOk
		}

		// check map options:
		const availableMaps = this.getMaps().map(map => map.name)
		if (!availableMaps.includes(routeObj.map))
			return isImportOk

		// check useMagnetic:
		if (typeof(routeObj.useMagneticHDG) !== 'boolean')
			return isImportOk

		// check units:
		const validSpeedUnits = ['kph', 'mph', 'knots']
		const validAltitudeUnits = ['m', 'ft']
		const validDistanceUnits = ['km', 'mi', 'nm']

		if (!validSpeedUnits.includes(routeObj.units.speed))
			return isImportOk

		if (!validAltitudeUnits.includes(routeObj.units.altitude))
			return isImportOk

		if (!validDistanceUnits.includes(routeObj.units.distance))
			return isImportOk

		// check markers:
		if (!Array.isArray(routeObj.markers))
			return isImportOk

		for (const marker of routeObj.markers) {
			const { coord, altitude, speed_ias } = marker;

			// coordinates
			if (!coord || typeof coord.lat !== 'number' || coord.lat < 0 ||
				typeof coord.lng !== 'number' || coord.lng < 0)
				return isImportOk

			// altitude
			if (typeof altitude !== 'number' || altitude < 0)
				return isImportOk

			// speed
			if (typeof speed_ias !== 'number' || speed_ias <= 0)
				return isImportOk
		}

		isImportOk = true

		// applying options
		this.changeAltitudeUnit(routeObj.units.altitude)
		this.changeSpeedUnit(routeObj.units.speed)
		this.changeDistanceUnit(routeObj.units.distance)
		
		this.#markers = routeObj.markers
		this.#calculateFlightLegs()

		return isImportOk
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

			let distance = FlightMath.getLegDistance(lastMarker.coord.lng, lastMarker.coord.lat, marker.coord.lng, marker.coord.lat, this.mapRatio, this.#distanceUnit)

			let speed = index >= this.#markers.length || !this.#markers[index] ? this.defaultAirspeed : this.#markers[index].speed_ias

			let convertedSpeed = speed * UnitConversion.getSpeedConversionValue('kph', this.#speedUnit)
			let convertedDistance = distance * UnitConversion.getDistanceConversionValue('km', this.#distanceUnit)

			let altitude = index >= this.#markers.length || !this.#markers[index] ? this.defaultAltitude : this.#markers[index].altitude
			
			let time = FlightMath.getLegTimeSeconds(convertedDistance, FlightMath.calculateTAS(altitude, this.#altitudeUnit, convertedSpeed))

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
