import React, { useEffect, useState } from 'react'; // Importing Modules

const Header = ({ p_speed, p_isMagnetic, onHeadingTypeChange, onMapSelect, onDistanceUnitSelect, onSpeedChange }) => {

	const [map, setMap] = useState('channel')
	const [unit, setUnit] = useState('km')
	const [speed, setSpeed] = useState(p_speed)
	const [isMagneticHeading, setMagneticHeading] = useState(p_isMagnetic)
	
	useEffect(() => {
		setSpeed(p_speed);
	}, [p_speed])

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
		let newSpeed = event.target.value;
		if (newSpeed > 0) {
			setSpeed(newSpeed);
			onSpeedChange(newSpeed);
		}
	}

	const handleHeadingChange = (event) => {
		const isMagnetic = event.target.value === "true"; // REQUIRED: ensures value is boolean
		setMagneticHeading(isMagnetic);
		onHeadingTypeChange(isMagnetic);
	}

	return (
		<header style={{ position: 'absolute', zIndex: 15, backgroundColor: 'white', padding: 7, borderRadius: '0 0 10px 0' }}>
			<select value={map} onChange={handleMapChange} style={{ marginInline: '3px' }}>
				<option value="channel">Channel</option>
				<option value="tobruk">Tobruk</option>
			</select>
			<select value={isMagneticHeading} onChange={handleHeadingChange} style={{ marginInline: '3px' }}>
				<option value={false}>True HDG</option>
				<option value={true}>Magnetic HDG</option>
			</select>
			<select value={unit} onChange={handleUnitChange} style={{ marginInline: '3px' }}>
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
				size={3}
			/>
		</header>
	);
}
export default Header;
