import React from "react";
import AppStyle from '../AppStyle.js';

const Waypoints = ({ leg, distanceUnit, speedUnit }) => {

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
			<div
				className="Label"
				style={{
					... AppStyle.label,
					left: leg.coord.end.lng,
					top: leg.coord.end.lat,
					transform: 'translate(-50%, 15%)',
				}}
			>
				<a style={{ fontWeight: 'bold' }}>{index + 1}</a><br/>
				<a>{Math.round(leg.heading) % 360 + '°'}</a><br/>
				<a>{Math.round(leg.distance) + ' ' + distanceUnit}</a><br/>
				<a>{Math.round(leg.speed)} + ' ' + {speedUnit}</a><br/>
				<a>{leg.time}</a><br/>
			</div>
		</div>
	);
};

export default Waypoints;
