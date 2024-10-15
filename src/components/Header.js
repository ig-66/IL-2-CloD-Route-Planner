import React, { useEffect, useState } from 'react'; // Importing Modules

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

		if (newUnit == 'km')
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
		<header style={{position:'absolute', zIndex:15, padding: 5}}>
			<select value={map} onChange={handleMapChange}>
				<option value="channel">Channel</option>
				<option value="tobruk">Tobruk</option>
			</select>
			<select value={unit} onChange={handleUnitChange}>
				<option value="km">Metric</option>
				<option value="mi">Imperial</option>
			</select>
			<label style={{backgroundColor:'white'}}>{unit === 'km' ? 'Speed (kph):' : 'Speed (mph):'}</label>
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
