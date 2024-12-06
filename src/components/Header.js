import React from 'react';
import AppStyle from '../AppStyle';

const Header = ({ currentMap, isMagnetic, 
	speedUnit, altitudeUnit, distanceUnit, 
	speedUnitOptions, altitudeUnitOptions, distanceUnitOptions, mapOptions,
	onMapSelect, onSpeedUnitSelect, onAltitudeUnitSelect, 
	onDistanceUnitSelect, onHeadingTypeChange, onRemoveAllWaypoints,
	onRouteExport, onRouteImport,  windSpeedOptions, wind }) => {
	
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
				width: 1700,
				maxWidth: '80%',
				marginInline: 15,
				transform: 'translateX(-50%)',
				display: 'flex',
				flexWrap: 'wrap',
				alignItems: 'center',
				justifyContent: 'center',
				overflowX: 'auto',
				whiteSpace: 'nowrap',
				rowGap: 10,
			}}
		>
			{/* MAP SELECT */}
			<select value={currentMap} onChange={handleMapChange} style={{ marginRight: 5 }}>
				{
					mapOptions.map((mapOption, index) => (
						<option key={index} value={mapOption.name}>{mapOption.displayName}</option>
					))
				}
			</select>

			{/* HEADING */}
			<select value={isMagnetic} onChange={handleHeadingChange} style={{ marginInline: 5 }}>
				<option value={false}>True HDG</option>
				<option value={true}>Magnetic HDG</option>
			</select>

			{/* UNITS */}
			<div>
				<select value={speedUnit} onChange={handleSpeedUnitChange} style={{ marginLeft: 5, marginRight: 1 }}>
					{
						speedUnitOptions.map((unit, index) => (
							<option key={index} value={unit}>Speed {unit}</option>
						))
					}
				</select>
				<select value={altitudeUnit} onChange={handleAltUnitChange} style={{ marginInline: 1 }}>
					{
						altitudeUnitOptions.map((unit, index) => (
							<option key={index} value={unit}>Altitude {unit}</option>
						))
					}
				</select>
				<select value={distanceUnit} onChange={handleDistanceUnitChange} style={{ marginInline: 1 }}>
					{
						distanceUnitOptions.map((unit, index) => (
							<option key={index} value={unit}>Distance {unit}</option>
						))
					}				
				</select>
			</div>

			{/* WIND SPEED */}
			<div style={{ marginInline: 5 }}>
				<a>Wind Speed: </a>
				{/* <input 
					type='number'
					onChange={(e) => wind.setSpeed(e.target.value >= 0 ? e.target.value : 0)}
					placeholder={0}
					value={wind.speed}
					size={1}
				/> */}
				<input
					type="number"
					onChange={(e) => wind.setSpeed(e.target.value >= 0 ? e.target.value : 0)}
					placeholder="0"
					value={wind.speed}
					min="0"
					step="1"
					style={{ width: 35 }}
				/>
				
				<select onChange={(e) => wind.setUnit(e.target.value)}>
					{
						windSpeedOptions.map((unit, index) => (
							<option key={index} value={unit}>{unit}</option>
							))
						}	
				</select>
			</div>
			
			{/* WIND HEADING */}
			<div style={{ marginInline: 5 }}>
				<a> Wind from: </a>
				<input 
					type='number'
					onChange={(e) => wind.setHeading(e.target.value >= 0 ? e.target.value % 360 : 359)}
					placeholder={0}
					value={wind.heading}
					// size={2}
					min="0"
					step="1"
					style={{ width: 35 }}
				/>
			</div>

			{/* REMOVE ALL WAYPOINTS */}
			<button 
				style={{ ...AppStyle.button.cancel, marginInline: 10 }}
				onClick={onRemoveAllWaypoints}
			>Remove All Waypoints</button>

			{/* SAVE/LOAD ROUTE */}
			<div style={{ marginLeft: 10 }}>

				<button 
					style={{ ...AppStyle.button.blue }}
					onClick={onRouteExport}
				>Save File</button>

				<div style={{ display: 'inline-block', position: 'relative' }}>
					<input
						type="file"
						accept=".json"
						onChange={onRouteImport}
						style={{
							position: 'absolute',
							opacity: 0,
							width: '100%',
							height: '100%',
							cursor: 'pointer',
						}}
					/>
					<button style={AppStyle.button.green}>Load File</button>
				</div>
			</div>

		</header>
	);
}
export default Header;
