import map_tobruk from '../assets/maps/map_tobruk.jpg'
import map_channel from '../assets/maps/map_channel.jpg'

import React, { useState, useEffect, useRef } from 'react';
import Route from './Route';

const Map = ({ p_map, onNewWaypoints, onNewFlightLegs }) => {

	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState({ x: -800, y: -300 });
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(0.5);
	const [flightLegs, setFlightLegs] = useState([]);
	const [waypoints, setWaypoints] = useState([]);
	const [transformedWP, setTransformedWP] = useState([]);

	const [map, setMap] = useState(map_channel)
	
	useEffect(() => {
		if (p_map === 'channel')
		{
			setMap(map_channel)
			setPosition({x:-800, y:-300})
			setZoom(0.5)
		} 
		else 
		{
			setPosition({x:-150, y:-650})
			setMap(map_tobruk)
			setZoom(0.2)
		}

		setWaypoints([])
		setFlightLegs([])

	}, [p_map]);

	// Update waypoint positions in window coordinates
	useEffect(() => {
		const transformedWaypoints = waypoints.map(({ x, y }) => ({
			x: position.x + x * zoom,
			y: position.y + y * zoom,
		}));

		var legs = [];

		if (transformedWaypoints.length > 1){
			transformedWaypoints.forEach(({x, y}, index) => {
				if (index == 0)
					;// nothing
				else 
				{
					let lastWP = transformedWaypoints[index-1];
					
					let newLeg = {						
							x0: lastWP.x,
							y0: lastWP.y,
							x1: x,
							y1: y
					}

					legs = [...legs, newLeg];
				}
			})
		} 
		
		setTransformedWP([...transformedWaypoints]);
		setFlightLegs(legs);

		onNewWaypoints(transformedWaypoints);
	}, [waypoints, position, zoom]);

	useEffect(() => {
		onNewFlightLegs([...flightLegs])
	}, [flightLegs])

	const handleMouseDown = (e) => {
		e.preventDefault();

		if (e.button === 0) { // Left mouse button
			const offsetX = e.clientX - position.x;
			const offsetY = e.clientY - position.y;
	
			setOffset({ x: offsetX, y: offsetY });
			setIsDragging(true);
		}
		else if (e.button === 1) // MMB
		{
			if (flightLegs.length === 1)
				setWaypoints([]);

			if (waypoints.length > 0)
				setWaypoints((prevClickList) => [...prevClickList.slice(0, -1)]);
		}
		else if (e.button === 2) // RMB
		{
			const newClick = {
				x: (e.clientX - position.x) / zoom,
				y: (e.clientY - position.y) / zoom
			};

			setWaypoints([...waypoints, newClick]);
		}
	}

	const handleMouseMove = (e) => {
		if (!isDragging) return;

		const newX = e.clientX - offset.x;
		const newY = e.clientY - offset.y;
		setPosition({ x: newX, y: newY });
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleWheel = (e) => {
		e.preventDefault();

		// Calculate the mouse position relative to the image
		const mouseX = e.clientX - position.x;
		const mouseY = e.clientY - position.y;

		// Calculate the zoom change
		const zoomChange = e.deltaY < 0 ? 0.1 : -0.1;

		var newZoom;

		if (p_map === 'tobruk')
			newZoom = Math.max(0.15, Math.min(zoom + zoomChange, 3));
		else
			newZoom = Math.max(0.25, Math.min(zoom + zoomChange, 3));

		// Calculate the new position to keep the image centered around the mouse pointer
		const newX = position.x - mouseX * (newZoom / zoom - 1);
		const newY = position.y - mouseY * (newZoom / zoom - 1);

		setZoom(newZoom);
		setPosition({ x: newX, y: newY });
	};

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				position: 'absolute',
				overflow: 'hidden',
			}}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onWheel={handleWheel}
			onContextMenu={(e) => e.preventDefault()}
		>
			<img
				src={map}
				alt="draggable"
				onMouseDown={handleMouseDown}
				onDragStart={(e) => e.preventDefault()}
				style={{
					position: 'relative',
					left: `${position.x}px`,
					top: `${position.y}px`,
					transform: `scale(${zoom})`,
					transformOrigin: '0 0',
					cursor: isDragging ? 'grabbing' : 'grab',
				}}
			/>
			<Route p_flightLegs={flightLegs} p_waypoints={transformedWP}/>
		</div>
	);
};

export default Map;
