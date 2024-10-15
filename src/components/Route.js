import React, { useRef, useEffect } from 'react';

const Route = ({ p_waypoints, p_flightLegs }) => {
	const waypoints = [...p_waypoints];
	const flightLegs = [...p_flightLegs];

	const canvasRef = useRef(null);

	useEffect(() => {
		drawFlightLegs();
	}, [waypoints, flightLegs]);

	const drawFlightLegs = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		// Clear previous drawings
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the first waypoint separatel
		if (waypoints.length >= 1)
			drawWaypoint(ctx, waypoints[0].x, waypoints[0].y, 5);

		// Loop through flight legs and draw each arrow, along with watpoints
		flightLegs.forEach(({ x0, y0, x1, y1 }, index) => {
			drawArrow(ctx, x0, y0, x1, y1);
			drawWaypoint(ctx, x1, y1, 5);
		});
	};

	const drawWaypoint = (ctx, x, y, radius) => {
		// Draw the circle
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fillStyle = 'lightblue';
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'blue';
		ctx.stroke();
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
