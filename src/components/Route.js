
import React, { useRef, useEffect } from 'react';

const Route = ({p_position, p_zoomScale, p_waypoints, p_flightLegs, p_mapRatio}) => {
	
	var position = p_position
	var zoom = p_zoomScale
	var waypoints = [...p_waypoints]
	var flightLegs = [...p_flightLegs]

	const canvasRef = useRef(null);


	const drawArrows = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		// Clear previous drawings
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Loop through arrows array and draw each arrow
		flightLegs.forEach(({ x0, y0, x1, y1 }) => {
			const scaledX0 = position.x + x0 * zoom;
			const scaledY0 = position.y + y0 * zoom;
			const scaledX1 = position.x + x1 * zoom;
			const scaledY1 = position.y + y1 * zoom;
			drawArrow(ctx, scaledX0, scaledY0, scaledX1, scaledY1);
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
		drawArrows();
	}, [flightLegs]);

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
	)
}

export default Route;