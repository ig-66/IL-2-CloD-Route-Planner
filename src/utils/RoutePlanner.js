import Maps from "../assets/maps/Maps";
import FlightMath from "./FlightMath";

class RoutePlanner {

	#flightLegs = []
	#markers = []
	
	/**
	 * 
	 * @param {function} setFlightLegCb Callback to set/update the state of the flight legs.
	 * @param {function} setMarkerCb Callback to set/update the state of the map markers.
	 * @param {number} mapRatio Initial/default map ratio, in pixels/km. 
	 * @param {string} unit Inital/default unit, either 'metric' or 'imperial'.
	 * @param {number} defaultAltitude Initial/default altitude. 
	 * @param {number} defaultAirspeed Initial/defualt speed.
	 */
	constructor(setFlightLegCb, setMarkerCb, unit = 'metric', defaultAltitude = 1000, defaultAirspeed = 400) {
		this.setNewFlightLegs = setFlightLegCb
		this.setNewMarkers = setMarkerCb
		this.unit = unit;
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

	/**
	 * Get the desired map object (and properties).
	 * 
	 * @param {string} mapName Map name, either 'channel' or 'tobruk'. 
	 * @returns Map object.
	 */
	getMapObj(mapName)
	{
		switch (mapName) {
			case 'tobruk':
				this.mapRatio = Maps.tobruk.mapRatio
				return Maps.tobruk
			
			case 'channel':
			default:
				this.mapRatio = Maps.channel.mapRatio
				return Maps.channel
		}
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

			let speed = index >= this.#flightLegs.length || !this.#flightLegs[index] ? this.defaultAirspeed : this.#flightLegs[index].speed ?? this.#flightLegs[index - 1].speed ?? this.defaultAirspeed

			let time = FlightMath.getLegTimeString(distance, speed)

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
