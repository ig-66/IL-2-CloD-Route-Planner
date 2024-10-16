import React from "react";

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
						backgroundColor: 'white',
						padding: '4px 8px',
						borderRadius: '4px',
						transform: 'translate(-50%, 15%)',
						pointerEvents: 'none',
						whiteSpace: 'nowrap',
						zIndex: 10,
						fontSize: 10,
					}}
				>
					<a>{index + 1}</a><br/>
					<a>{Math.round(leg.heading) + '°'}</a><br/>
					<a>{Math.round(leg.distance) + ' ' + p_distanceUnit}</a><br/>
					<a>{`${Math.round(leg.speed)} ${p_distanceUnit === 'km' ? 'km/h' : 'mph'}`}</a><br/>
					<a>{leg.time}</a><br/>
				</div>
			))}
		</div>
	);
};

export default Waypoints;
