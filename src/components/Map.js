import React, { useEffect } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import WaypointMarker from "./WaypointMarker";

var waypoint0 = {
	coord: {
		lat: 2000,
		lng: 2000
	},
	altitude: 1000,
	speed_ias: 450
}

var waypoint1 = {
	coord: {
		lat: 2500,
		lng: 2500
	},
	altitude: 1000,
	speed_ias: 450
}

var waypoints = [waypoint0, waypoint1]

const Map = ({p_mapObj, p_flightLegs, p_Markers}) => {
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
			setMapCenter(mapObj.center)
			setBounds([
				[0, 0],
				[height, width]
			]);
		};
	}, [mapObj])

	if (!mapBounds || !mapCenter || !mapObj) return <a>Loading map ...</a>

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
			{
				waypoints.map((wp, index) => (
					<WaypointMarker p_waypoint={wp} p_id={index}/>
				))
			}
			{/* put the leg arrows in here! */}
		</MapContainer>
	);
};

export default Map;
