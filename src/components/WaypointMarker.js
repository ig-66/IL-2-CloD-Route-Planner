import React, { useEffect } from "react"
import { Icon } from 'leaflet'
import legicon from '../assets/icons/legicon.ico'
import { Marker, Popup } from "react-leaflet"

const iconSize = 20
const icon = new Icon({
	iconUrl: legicon,
	iconSize: [iconSize, iconSize],
	iconAnchor: [iconSize / 2, iconSize / 2], // Anchor point of the icon (middle bottom)
	popupAnchor: [0, iconSize * (-1)], // Anchor point for popups relative to the icon
})

var waypoint = {
	coord: {
		lat: 2000,
		lng: 2000
	},
	altitude: 1000,
	speed_ias: 450
}

function WaypointMarker({ p_waypoint, p_id }) {
	const [position, setPosition] = React.useState([p_waypoint.coord.lat, p_waypoint.coord.lng])
	const markerRef = React.useRef(null)

	const eventHandlers = React.useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current
				if (marker != null) {
					setPosition(marker.getLatLng())
				}
			},
		}),
		[],
	)

	useEffect(() => {
		setPosition([p_waypoint.coord.lat, p_waypoint.coord.lng])
	}, [p_waypoint])

	if (!position) return;

	return (
		<Marker
			icon={icon}
			draggable={true}
			eventHandlers={eventHandlers}
			position={position}
			ref={markerRef}>
			<Popup minWidth={90}>
				<span>
					<a>DEBUG: {JSON.stringify(position)}</a><br />
					<a style={{ fontWeight: 'bold' }}>{p_id + 1}</a><br />
					<a>{Math.round(95.2) % 360 + '°'}</a><br />
					<a>{Math.round(p_waypoint.altitude) + ' ' + 'km'}</a><br />
					<a>{`${Math.round(waypoint.speed_ias)} ${'km/h'}`}</a><br />
					<a>07:30</a><br />
				</span>
			</Popup>
		</Marker>
	)
}

export default WaypointMarker;
