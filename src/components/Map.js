import React, { useEffect } from "react";
import { MapContainer, ImageOverlay, Popup, Marker } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import legicon from '../assets/icons/legicon.ico'

var flightLegObj = {
	coord: {
		lat: 100,
		lng: 100
	},
	distance: 78.2,
	heading: 45,
	altitude: 1000,
	speed_ias: 450
} 

const iconSize = 20
const icon = new Icon ({
	iconUrl: legicon,
	iconSize: [iconSize, iconSize],
	iconAnchor: [iconSize/2, iconSize/2], // Anchor point of the icon (middle bottom)
	popupAnchor: [0, iconSize*(-1)], // Anchor point for popups relative to the icon
})

const Map = ({p_mapObj}) => {
	const [mapObj, setMapObj] = React.useState(null);
	const [mapBounds, setBounds] = React.useState(null);
	const [mapCenter, setMapCenter] = React.useState(null);

	useEffect(() => {
		setMapObj(p_mapObj);
	}, [p_mapObj]);

	useEffect(() => {
		if (!mapObj) return;

		const img = new Image();
		img.src = mapObj.map;

		img.onload = () => {
			const width = img.width;
			const height = img.height;
			setMapCenter([height / 2, width / 2])
			setBounds([
				[0, 0],
				[height, width]
			]);
		};
	}, [mapObj])

	if (!mapBounds || !mapCenter || !mapObj) return <a>Loading map ...</a>

	function DraggableMarker({p_flightlLeg, p_deviation: bool,}) {
		const [position, setPosition] = React.useState(mapCenter)
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

		return (
			<Marker
				icon={icon}
				draggable={true}
				eventHandlers={eventHandlers}
				position={position}
				ref={markerRef}>
				<Popup minWidth={90}>
					<span>
						<a>{JSON.stringify(position)}</a><br />
						<a style={{ fontWeight: 'bold' }}>{1}</a><br />
						<a>{Math.round(95.2) % 360 + '°'}</a><br />
						<a>{Math.round(75) + ' ' + 'km'}</a><br />
						<a>{`${Math.round(350.1)} ${'km/h'}`}</a><br />
						<a>07:30</a><br />
					</span>
				</Popup>
			</Marker>
		)
	}

	return (
		<MapContainer
			bounceAtZoomLimits={true}
			center={mapCenter} // Center of the map, adjust as needed
			zoom={mapObj.zoom.default} // Set an initial zoom level
			maxZoom={mapObj.zoom.max}
			minZoom={mapObj.zoom.min} // Allows zooming out if the image is large
			crs={L.CRS.Simple} // Use Simple CRS for image coordinates
			style={{ height: "100vh", width: "100vw", zIndex: 1 }}
			bounds={mapBounds}
		>
			<ImageOverlay
				url={mapObj.map}
				bounds={mapBounds}
			/>
			<DraggableMarker />
		</MapContainer>
	);
};

export default Map;
