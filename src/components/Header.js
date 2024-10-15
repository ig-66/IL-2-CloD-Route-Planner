import React, { useEffect, useState } from 'react'; // Importing Modules

const Header = ({ onMapSelect, onUnitSelect }) => {

	const [map, setMap] = useState('channel')
	const [unit, setUnit] = useState('metric')
	
	const handleMapChange = (event) => {
		setMap(event.target.value)
	};

	const handleUnitChange = (event) => {
		setUnit(event.target.value)
	};

	useEffect(() => {
		onMapSelect(map)
	}, [map])

	useEffect(() => {
		onUnitSelect(unit)
	}, [unit])

	return (
		<header style={{position:'absolute', zIndex:10, padding: 5}}>
			<select value={map} onChange={handleMapChange}>
				<option value="channel">Channel</option>
				<option value="tobruk">Tobruk</option>
			</select>
			<select value={unit} onChange={handleUnitChange}>
				<option value="metric">Metric</option>
				<option value="imperial">Imperial</option>
			</select>
		</header>
	);
}
export default Header;
