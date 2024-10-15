import React, { useRef, useEffect } from 'react';
import FlightMath from '../utils/FlightMath';

const Route = ({ p_position, p_zoomScale, p_waypoints, p_flightLegs, p_mapRatio, p_unit }) => {
	const position = p_position;
	const zoom = p_zoomScale;
	const waypoints = [...p_waypoints];
	const flightLegs = [...p_flightLegs];

	const canvasRef = useRef(null);

	var headings = [];

	useEffect(() => {
		console.log(`Route.js > Unit: ${p_unit}`);
	}, [p_unit]);

	const drawFlightLegs = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		// Clear previous drawings
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the first waypoint separatel
		if (waypoints.length >= 1)
		{
			const scaledX = position.x + waypoints[0].x * zoom;
			const scaledY = position.y + waypoints[0].y * zoom;
			drawWaypoint(ctx, scaledX, scaledY, 5, `0`);
		}

		// Loop through flight legs and draw each arrow, along with watpoints
		flightLegs.forEach(({ x0, y0, x1, y1 }, index) => {
			const scaledX0 = position.x + x0 * zoom;
			const scaledY0 = position.y + y0 * zoom;
			const scaledX1 = position.x + x1 * zoom;
			const scaledY1 = position.y + y1 * zoom;

			drawArrow(ctx, scaledX0, scaledY0, scaledX1, scaledY1);

			var legDistance = FlightMath.getLegDistance(x0, y0, x1, y1, p_mapRatio);
			var legHeading = FlightMath.getLegHeading(x0, y0, x1, y1);
			
			var waypointText;
			if (p_unit == 'metric')
				waypointText = `${index+1}\n${legHeading.toFixed(0)}°\n${legDistance.toFixed(0)} km`; 
			else
				waypointText = `${index+1}\n${legHeading.toFixed(0)}°\n${(legDistance/1.60934).toFixed(0)} mi`; 

			drawWaypoint(ctx, scaledX1, scaledY1, 5, `${waypointText}`);
		});
	};

	const drawWaypoint = (ctx, x, y, radius, text) => {
		// Draw the circle
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fillStyle = 'lightblue';
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'blue';
		ctx.stroke();

		drawWaypointLabel(ctx, x, y, text)
	};

	const drawWaypointLabel = (ctx, x, y, text) => {
		const lines = text.split('\n'); // Split the text by new line character
		const textHeight = 14; // Approximate text height for each line
		const padding = 3;
		const radius = 5;

		// Calculate the width of the longest line for the background rectangle
		const maxWidth = Math.max(...lines.map(line => ctx.measureText(line).width));

		// Draw the background rectangle for the text
		ctx.fillStyle = 'white';
		ctx.fillRect(x - maxWidth / 2 - padding, y + radius + 5, maxWidth + 2 * padding, textHeight * lines.length);
		ctx.strokeStyle = 'black';
		ctx.strokeRect(x - maxWidth / 2 - padding, y + radius + 5, maxWidth + 2 * padding, textHeight * lines.length);

		// Draw each line of text
		ctx.fillStyle = 'black';
		lines.forEach((line, index) => {
			ctx.fillText(line, x - ctx.measureText(line).width / 2, y + radius + 5 + textHeight * (index + 1) - 4);
		});
	};

	const drawArrow = (ctx, x0, y0, x1, y1) => {
		const headlen = 12; // Length of arrowhead
		const angle = Math.atan2(y1 - y0, x1 - x0);

		// Draw line
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.lineTo(x1, y1);
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2.5;
		ctx.stroke();

		// Draw arrowhead
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x1 - headlen * Math.cos(angle - Math.PI / 6), y1 - headlen * Math.sin(angle - Math.PI / 6));
		ctx.lineTo(x1 - headlen * Math.cos(angle + Math.PI / 6), y1 - headlen * Math.sin(angle + Math.PI / 6));
		ctx.lineTo(x1, y1);
		ctx.fillStyle = 'red';
		ctx.fill();
	};

	useEffect(() => {
		drawFlightLegs();
	}, [p_position, p_zoomScale, p_waypoints, p_flightLegs, p_unit]);

	return (
		<div>
			<canvas
				ref={canvasRef}
				width={window.innerWidth}
				height={window.innerHeight}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					pointerEvents: 'none', // Allows mouse events to pass through the canvas
				}}
			/>
		</div>
	);
};

export default Route;
