import React from "react";
import AppStyle from '../AppStyle.js';

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
		<div style={AppStyle.nonInteractableFullscreenComp}>
			{p_flightLegs.map((leg, index) => (
				<div
					key={index}
					className="Label"
					style={{
						... AppStyle.label,
						left: leg.coord.x1,
						top: leg.coord.y1,
						transform: 'translate(-50%, 15%)',
					}}
				>
					<a style={{ fontWeight: 'bold' }}>{index + 1}</a><br/>
					<a>{Math.round(leg.heading) % 360 + '°'}</a><br/>
					<a>{Math.round(leg.distance) + ' ' + p_distanceUnit}</a><br/>
					<a>{`${Math.round(leg.speed)} ${p_distanceUnit === 'km' ? 'km/h' : 'mph'}`}</a><br/>
					<a>{leg.time}</a><br/>
				</div>
			))}
		</div>
	);
};

export default Waypoints;
