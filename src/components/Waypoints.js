import React, { useEffect } from "react";

const Waypoints = ({ p_waypoints, p_flightLegs }) => {

	var waypointObj = {
			x: 10,
			y: 10
	}

	var legObj = {
		coords: 
		{
			x1: 100,
			y1: 100
		},
		heading: 90,
		distance: 60,
		speed: null
	}

	useEffect(() => {
		console.log(`Waypoints > ${JSON.stringify(p_waypoints)}`);
	}, [p_waypoints]);

	useEffect(() => {
		// TODO: calculate distances headings and all ...
	}, [p_flightLegs])

	return (
		<div style={{ position: 'absolute' }}>
			{p_waypoints.map((waypoint, index) => (
				index === 0 ? null : // Does not add a label on the first WP
				<div
					key={index}
					style={{
						position: 'absolute',
						left: waypoint.x,
						top: waypoint.y,
						backgroundColor: 'white', // Ensuring only one background color is applied
						border: '2px solid black',
						padding: '4px 8px',
						borderRadius: '4px',
						transform: 'translate(-50%, 25%)', // Center horizontally, position above the point
						whiteSpace: 'pre-wrap', // Allow line breaks in the text
						pointerEvents: 'none', // Make the labels non-interactive
						zIndex: 10,
						fontSize: 10,
					}}
				>
					{waypoint.text || 'No Text'} {/* Show actual text or a fallback if empty */}
				</div>
			))}
		</div>
	);
};

export default Waypoints;
