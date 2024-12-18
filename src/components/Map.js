import React, { useEffect, useRef } from "react";
import { MapContainer, ImageOverlay, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import WaypointMarker from "./WaypointMarker";
import FlightLegs from "./FlightLegs";
import FlightLegLabel from "./FlightLegLabel";

const Map = ({ mapObj, p_flightLegs, p_markers, p_routePlanner, speedUnit, altitudeUnit, distanceUnit, useMagneticHDG }) => {
	const [mapBounds, setBounds] = React.useState(null);
	const [mapCenter, setMapCenter] = React.useState(null);
	const [currentZoom, setCurrentZoom] = React.useState(null);
	const [currentPosition, setCurrentPosition] = React.useState({ lat: 0, lng: 0 })

	const mapRef = useRef();

	useEffect(() => {
		if (!mapObj || mapObj === null) return;

		const img = new Image();
		img.src = mapObj.map;

		img.onload = () => {
			const width = img.width;
			const height = img.height;
			setMapCenter(mapObj.center)
			flyTo(mapObj.zoom.default, mapObj.center.lat, mapObj.center.lng)			
			setBounds([
				[0, 0],
				[height, width]
			]);
		};
	}, [mapObj])

	useEffect(() => {
		// Can be used to get the best zoom options for the map
		// console.log("Current map position:", currentPosition);
	}, [currentPosition])
	
	useEffect(() => {
		// Can be used to get where to place the maps' center
		// console.log("Current map zoom:", currentZoom);
	}, [currentZoom])

	function flyTo(zoom, lat, lng) {
		const map = mapRef.current; // Access the map instance
		if (map) {
			map.flyTo([lat, lng], zoom); // Smooth transition to coordinates and zoom level
		}
	}

	if (!mapBounds || !mapCenter || !mapObj) return <a>Loading map ...</a>

	return (
		<MapContainer
			ref={mapRef}
			bounceAtZoomLimits={true}
			center={mapCenter}
			zoom={mapObj.zoom.default}
			maxZoom={mapObj.zoom.max}
			minZoom={mapObj.zoom.min}
			crs={L.CRS.Simple}
			style={{ height: "100vh", width: "100vw", zIndex: 1 }}
			bounds={mapBounds}
		>
			<ImageOverlay url={mapObj.map} bounds={mapBounds} />
			<WaypointAdder p_routePlanner={p_routePlanner}/>
			<WaypointRemover p_routePlanner={p_routePlanner}/>
			<ZoomListener setZoom={setCurrentZoom} />
			<PositionListener setPosition={setCurrentPosition} />
			{p_markers.map((marker, index) => (
				<WaypointMarker key={index} 
					p_waypoint={marker}
					p_id={index}
					p_routePlanner={p_routePlanner}
					speedUnit={speedUnit}
					altitudeUnit={altitudeUnit}/>
			))}
			<FlightLegs p_flightLegs={p_flightLegs} zoom={currentZoom}/>
			{p_flightLegs.map((leg, index) => (
				<FlightLegLabel 
					key={index} 
					id={index} 
					leg={leg} 
					speedUnit={speedUnit} 
					distanceUnit={distanceUnit} 
					altitudeUnit={altitudeUnit}
					mapVariation={useMagneticHDG ? mapObj.magVariation : 0}/>
			))}
		</MapContainer>
	);
};

const WaypointAdder = ({ p_routePlanner }) => {
	const map = useMap();
	let longPressTimeout;

	useEffect(() => {
		// RMB
		const handleRightClick = (e) => {
			e.originalEvent.preventDefault(); // Disable context menu
			const { lat, lng } = e.latlng;
			p_routePlanner.addMarker(lat, lng)
		};

		// smartphone longpress (500 ms)
		const handleTouchStart = (e) => {
			const { latlng } = e;
			longPressTimeout = setTimeout(() => {
				p_routePlanner.addMarker(latlng.lat, latlng.lng)
			}, 500);
		};

		const handleTouchEnd = () => {
			clearTimeout(longPressTimeout); // Cancel long press
		};

		map.on("contextmenu", handleRightClick);
		map.on("touchstart", handleTouchStart);
		map.on("touchend", handleTouchEnd);

		return () => {
			map.off("contextmenu", handleRightClick);
			map.off("touchstart", handleTouchStart);
			map.off("touchend", handleTouchEnd);
		};
	}, [map]);

	return null;
};

const WaypointRemover = ({ p_routePlanner }) => {
	const map = useMap();
	let longPressTimeout;

	useEffect(() => {
		// MMB
		const handleMiddleClick = (e) => {
			if (e.originalEvent.button === 1) {
				e.originalEvent.preventDefault();
				p_routePlanner.removeLastMarker();
			}
		};

		// smartphone (really) longpress (2000 ms / 2 s)
		const handleTouchStart = (e) => {
			longPressTimeout = setTimeout(() => {
				p_routePlanner.removeLastMarker();
			}, 2000);
		};

		const handleTouchEnd = () => {
			clearTimeout(longPressTimeout); // Cancel longpress
		};

		map.on("mousedown", handleMiddleClick);
		map.on("touchstart", handleTouchStart);
		map.on("touchend", handleTouchEnd);

		return () => {
			map.off("mousedown", handleMiddleClick);
			map.off("touchstart", handleTouchStart);
			map.off("touchend", handleTouchEnd);
		};
	}, [map]);

	return null;
};

const ZoomListener = ({ setZoom }) => {
	const map = useMap()

	useEffect(() => {
		setZoom(map.getZoom())

		const handleZoom = () => setZoom(map.getZoom())
		map.on("zoomend", handleZoom)

		return () => {
			map.off("zoomend", handleZoom)
		}
	}, [map, setZoom])

	return null
}

const PositionListener = ({ setPosition }) => {
	const map = useMap()

	useEffect(() => {
		const handleMoveEnd = () => {
			const center = map.getCenter()
			setPosition({ lat: center.lat, lng: center.lng })
		}

		map.on("moveend", handleMoveEnd)

		return () => {
			map.off("moveend", handleMoveEnd)
		}
	}, [map, setPosition])

	return null
}

export default Map;
