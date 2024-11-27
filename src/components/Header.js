import React from 'react'; // Importing Modules

const Header = ({ currentMap, isMagnetic, 
	speedUnit, altitudeUnit, distanceUnit, 
	speedUnitOptions, altitudeUnitOptions, distanceUnitOptions, mapOptions,
	onMapSelect, onSpeedUnitSelect, onAltitudeUnitSelect, 
	onDistanceUnitSelect, onHeadingTypeChange, onRemoveAllWaypoints }) => {
	
	const handleMapChange = (event) => {
		onMapSelect(event.target.value)
	};

	const handleHeadingChange = (event) => {
		const isMagnetic = event.target.value === "true"; // REQUIRED: ensures value is boolean
		onHeadingTypeChange(isMagnetic);
	}

	const handleSpeedUnitChange = (event) => {
		let unit = event.target.value
		onSpeedUnitSelect(unit)
	}

	const handleAltUnitChange = (event) => {
		let unit = event.target.value
		onAltitudeUnitSelect(unit)
	}

	const handleDistanceUnitChange = (event) => {
		let unit = event.target.value
		onDistanceUnitSelect(unit)
	}

	return (
		<header 
			style={{
				position: 'absolute', 
				zIndex: 15, 
				backgroundColor: 'white', 
				padding: 7, 
				borderRadius: '0 0 10px 10px',
				top: 0,
				left: '50%',
				transform: 'translateX(-50%)',
			}}
		>
			<select value={currentMap} onChange={handleMapChange} style={{ marginInline: '3px' }}>
				{
					mapOptions.map((mapOption) => (
						<option value={mapOption.name}>{mapOption.displayName}</option>
					))
				}
			</select>
			<select value={isMagnetic} onChange={handleHeadingChange} style={{ marginInline: '3px' }}>
				<option value={false}>True HDG</option>
				<option value={true}>Magnetic HDG</option>
			</select>
			<select value={speedUnit} onChange={handleSpeedUnitChange} style={{ marginInline: '3px' }}>
				{
					speedUnitOptions.map((unit) => (
						<option value={unit}>Speed {unit}</option>
					))
				}
			</select>
			<select value={altitudeUnit} onChange={handleAltUnitChange} style={{ marginInline: '3px' }}>
				{
					altitudeUnitOptions.map((unit) => (
						<option value={unit}>Altitude {unit}</option>
					))
				}
			</select>
			<select value={distanceUnit} onChange={handleDistanceUnitChange} style={{ marginInline: '3px' }}>
				{
					distanceUnitOptions.map((unit) => (
						<option value={unit}>Distance {unit}</option>
					))
				}				
			</select>
			<button 
				style={{ 
					backgroundColor: 'red',
					color: 'white',
					fontWeight: 'bolder',
					borderRadius: 5,
					padding: 2,
					paddingInline: 7,
				}}
				onClick={onRemoveAllWaypoints}
			>Remove All Waypoints</button>
		</header>
	);
}
export default Header;
