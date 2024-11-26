import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";

function FlightLegs({ leg, id, distanceUnit, speedUnit, altitudeUnit }) {

	const createLabelIcon = (leg) => {
		const style = `
			background-color: rgba(255, 255, 255, 0.9);
			padding: 5px 10px;
			border: 1px solid #ccc;
			border-radius: 5px;
			font-size: 12px;
			text-align: center;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
			pointer-events: none;
			user-select: none;
			position: absolute;
			transform: translate(-50%, 15%);
			white-space: nowrap;
	`;

	const labelContent = `
		<div style="${style}">
			<strong>${id + 1}</strong><br/>
			${Math.round(leg.heading) % 360}°<br/>
			${Math.round(leg.altitude)} ${altitudeUnit}<br/>
			${Math.round(leg.distance)} ${distanceUnit}<br/>
			${Math.round(leg.speed)} ${speedUnit}<br/>
			${leg.time}
		</div>
	`;

		return L.divIcon({
			className: "flight-leg-label",
			html: labelContent,
			iconSize: [0, 0], // No intrinsic size
		});
	};

	return (
		<Marker
			position={[leg.coord.end.lat, leg.coord.end.lng]}
			icon={createLabelIcon(leg)} // Custom label icon
		/>
	);
}

export default FlightLegs;
