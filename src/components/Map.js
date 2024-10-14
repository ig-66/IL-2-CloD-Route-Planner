import map_tobruk from '../assets/maps/map_tobruk.jpg'
import map_channel from '../assets/maps/map_channel.jpg'

import React, { useState, useEffect, useRef } from 'react';
import Route from './Route';

const Map = () => {
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0});
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [legs, setLegs] = useState([]);
	const [clickList, setClickList] = useState([]);
	const canvasRef = useRef(null);

	const handleMouseDown = (e) => {
		e.preventDefault(); 

		if (e.button === 0) // LMB
		{
			// Calculate the offset of the click relative to the image's current position
			const offsetX = e.clientX - position.x;
			const offsetY = e.clientY - position.y;
	
			setOffset({ x: offsetX, y: offsetY });
			setIsDragging(true);
		}
		else if (e.button === 1) // MMB
		{
			if (legs.length === 1)
				setClickList([]);

			if (legs.length > 0)
				setLegs((prevLegs) => [...prevLegs.slice(0, -1)]);

			if (clickList.length > 0)
				setClickList((prevClickList) => [...prevClickList.slice(0, -1)]);
		}
		else if (e.button === 2) // RMB
		{
			const newClick = {
				x: (e.clientX - position.x) / zoom,
				y: (e.clientY - position.y) / zoom 
			};

			const newClickList = [...clickList, newClick];

			if (newClickList.length >= 2)
			{
				var newLeg = { 
					x0: newClickList[newClickList.length - 2].x,
					y0: newClickList[newClickList.length - 2].y,
					x1: newClickList[newClickList.length - 1].x,
					y1: newClickList[newClickList.length - 1].y,
				}
				setLegs((prevLegs) => [...prevLegs, newLeg]);
			}

			setClickList(newClickList);
		}	
		else 
			return;
	};

	const handleMouseMove = (e) => {
		if (!isDragging) return;

		const newX = e.clientX - offset.x;
		const newY = e.clientY - offset.y;

		setPosition({
			x: newX,
			y: newY,
		});
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
		const newZoom = Math.max(0.25, Math.min(zoom + zoomChange, 3)); // Limit zoom between 0.5 and 3

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
				position: 'relative',
				overflow: 'hidden',
			}}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onWheel={handleWheel}
			onContextMenu={(e) => e.preventDefault()}
			>
			<img
				src={map_channel}
				alt="draggable"
				onMouseDown={handleMouseDown}
				onDragStart={(e) => e.preventDefault()}
				style={{
					position: 'absolute',
					left: `${position.x}px`,
					top: `${position.y}px`,
					transform: `scale(${zoom})`,
					transformOrigin: '0 0', // Set the origin to top-left (0,0) for custom zoom
					cursor: isDragging ? 'grabbing' : 'grab',
				}}
			/>
			<Route p_position={position} p_zoom_scale={zoom} p_legs={legs} p_clickList={clickList} />
		</div>
	);
};

export default Map;
