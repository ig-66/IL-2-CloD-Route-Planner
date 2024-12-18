import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import FlightMath from "../utils/FlightMath";

function FlightLegs({ leg, id, distanceUnit, speedUnit, altitudeUnit, mapVariation }) {

	const createLabelIcon = (leg) => {
		const style = `
			background-color: rgba(255, 255, 255, 0.9);
			padding: 5px 10px;
			border: 1px solid #ccc;
			border-radius: 7px;
			font-size: 10px;
			text-align: center;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
			pointer-events: none;
			user-select: none;
			position: absolute;
			transform: translate(-50%, 15%);
			white-space: nowrap;
			line-height: 1.4;
	`;
		const textStyle = `
			color: black;
		`

		const labelContent = `
		<div style="${style}">
			<strong>${id + 1}</strong><br/>
			<a style="${textStyle}">${Math.round(leg.heading + mapVariation) % 360}°</a><br/>
			<a style="${textStyle}">${Math.round(leg.distance)} ${distanceUnit}</a><br/>
			<a style="${textStyle}">${Math.round(leg.altitude)} ${altitudeUnit}</a><br/>
			<a style="${textStyle}">${Math.round(leg.speed)} ${speedUnit}</a><br/>
			<a style="${textStyle}">${FlightMath.getLegTimeString(leg.time)}</a><br/>
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
