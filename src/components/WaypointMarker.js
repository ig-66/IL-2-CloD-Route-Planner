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

function WaypointMarker({ p_waypoint, p_id, altitudeUnit, speedUnit, p_routePlanner }) {
	const [wpMarker, setWPMarker] = React.useState(p_waypoint)
	const [position, setPosition] = React.useState([p_waypoint.coord.lat, p_waypoint.coord.lng])
	const markerRef = React.useRef(null)

	React.useEffect(() => {
		setWPMarker(p_waypoint)
	}, [p_waypoint])

	const eventHandlers = React.useMemo(
		() => ({
			drag() {
				// Continuously update the position during the drag
				const marker = markerRef.current;
				if (marker != null) {
					const newMarkerProps = {
						coord: {
							lat: marker.getLatLng().lat,
							lng: marker.getLatLng().lng
						},
						altitude: wpMarker.altitude,
						speed_ias: wpMarker.speed_ias 
					}
					setPosition(marker.getLatLng());
					p_routePlanner.modifyMarker(p_id, newMarkerProps)
				}
			},
			dragend() {
				const marker = markerRef.current
				if (marker != null) {
					const newMarkerProps = {
						coord: {
							lat: marker.getLatLng().lat,
							lng: marker.getLatLng().lng
						},
						altitude: p_waypoint.altitude,
						speed_ias: p_waypoint.speed_ias
					}
					setPosition(marker.getLatLng())
					p_routePlanner.modifyMarker(p_id, newMarkerProps)
				}
			},
		}),
		[wpMarker],
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
				<div style={{ textAlign: 'center' }}>
					{ p_id === 0 ?
						<div>
							<a style={{ fontWeight: 'bold' }}>Takeoff</a><br />
						</div>
						:
						<div>
							<a style={{ fontWeight: 'bold' }}>{p_id}</a><br />
							<a>{Math.round(p_waypoint.altitude) + ' ' + altitudeUnit}</a><br />
							<a>{`${Math.round(p_waypoint.speed_ias)} ${speedUnit}`}</a><br />
						</div>
					}
				</div>
			</Popup>
		</Marker>
	)
}

export default WaypointMarker;
