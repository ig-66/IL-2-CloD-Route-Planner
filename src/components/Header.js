import React, { useState } from 'react'; // Importing Modules

const Header = ({ onMapSelect, onDistanceUnitSelect, onSpeedChange }) => {

	const [map, setMap] = useState('channel')
	const [unit, setUnit] = useState('km')
	const [speed, setSpeed] = useState(400)
	
	const handleMapChange = (event) => {
		setMap(event.target.value)
		onMapSelect(event.target.value)
	};

	const handleUnitChange = (event) => {
		let newUnit = event.target.value;

		if (newUnit === 'km')
		{
			let newSpeed = speed * 1.60934;
			setSpeed(newSpeed);
			onSpeedChange(newSpeed);
		}
		else
		{
			let newSpeed = speed / 1.60934;
			setSpeed(newSpeed);
			onSpeedChange(newSpeed);
		}
		
		setUnit(newUnit)
		onDistanceUnitSelect(newUnit)
	};

	const handleSpeedChange = (event) => {
		setSpeed(event.target.value);
		onSpeedChange(event.target.value);
	}

	return (
		<header style={{ position: 'absolute', zIndex: 15, backgroundColor: 'white', padding: 7, borderRadius: '0 0 10px 0' }}>
			<select value={map} onChange={handleMapChange}>
				<option value="channel">Channel</option>
				<option value="tobruk">Tobruk</option>
			</select>
			<select value={unit} onChange={handleUnitChange} style={{ marginInline: '7px' }}>
				<option value="km">Metric</option>
				<option value="mi">Imperial</option>
			</select>
			<label style={{paddingLeft: 10, paddingRight: 4}}>{unit === 'km' ? 'Speed (km/h):' : 'Speed (mph):'}</label>
			<input
				type="number"
				id="numberInput"
				value={Math.round(speed)}
				onChange={handleSpeedChange}
				placeholder={speed}
			/>
		</header>
	);
}
export default Header;
