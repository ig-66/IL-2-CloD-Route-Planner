import React, { useEffect } from "react";

const Waypoints = ({ p_waypoints, p_flightLegs, p_distanceUnit }) => {

	// var waypointObj = {
	// 		x: 10,
	// 		y: 10
	// }

	// var legObj = {
	// 	coords: 
	// 	{
	// 		x1: 100,
	// 		y1: 100
	// 	},
	// 	heading: 90,
	// 	distance: 60,
	// 	speed: null
	// }

	return (
		<div style={{ position: 'absolute' }}>
			{p_flightLegs.map((leg, index) => (
				<div
					key={index}
					style={{
						position: 'absolute',
						left: leg.coord.x1,
						top: leg.coord.y1,
						backgroundColor: 'white', // Ensuring only one background color is applied
						border: '2px solid black',
						padding: '4px 8px',
						borderRadius: '4px',
						transform: 'translate(-50%, 25%)', // Center horizontally, position above the point
						// whiteSpace: 'pre-wrap', // Allow line breaks in the text
						pointerEvents: 'none', // Make the labels non-interactive
						zIndex: 10,
						fontSize: 10,
					}}
				>
					{`${index + 1}\n${leg.heading.toFixed(0)}°\n${Math.round(leg.distance)}${p_distanceUnit}\n${Math.round(leg.speed)}${p_distanceUnit === 'km' ? 'kph' : 'mph'}\n${leg.time}`} {/* Show actual text or a fallback if empty */}
				</div>
			))}
		</div>
	);
};

export default Waypoints;
