import React from 'react';

const Header = ({ currentMap, isMagnetic, 
	speedUnit, altitudeUnit, distanceUnit, 
	speedUnitOptions, altitudeUnitOptions, distanceUnitOptions, mapOptions,
	onMapSelect, onSpeedUnitSelect, onAltitudeUnitSelect, 
	onDistanceUnitSelect, onHeadingTypeChange, onRemoveAllWaypoints,
	onRouteExport, onRouteImport }) => {
	
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
				display: 'flex',
				flexWrap: 'nowrap',
				alignItems: 'center',
				overflowX: 'auto',
				whiteSpace: 'nowrap',
			}}
		>
			<select value={currentMap} onChange={handleMapChange} style={{ marginInline: '3px' }}>
				{
					mapOptions.map((mapOption, index) => (
						<option key={index} value={mapOption.name}>{mapOption.displayName}</option>
					))
				}
			</select>
			<a style={{ paddingInlineStart: '20px' }}></a> {/** spacing */}
			<select value={isMagnetic} onChange={handleHeadingChange} style={{ marginInline: '3px' }}>
				<option value={false}>True HDG</option>
				<option value={true}>Magnetic HDG</option>
			</select>
			<a style={{ paddingInlineStart: '20px' }}></a> {/** spacing */}
			<select value={speedUnit} onChange={handleSpeedUnitChange} style={{ marginInline: '3px' }}>
				{
					speedUnitOptions.map((unit, index) => (
						<option key={index} value={unit}>Speed {unit}</option>
					))
				}
			</select>
			<select value={altitudeUnit} onChange={handleAltUnitChange} style={{ marginInline: '3px' }}>
				{
					altitudeUnitOptions.map((unit, index) => (
						<option key={index} value={unit}>Altitude {unit}</option>
					))
				}
			</select>
			<select value={distanceUnit} onChange={handleDistanceUnitChange} style={{ marginInline: '3px' }}>
				{
					distanceUnitOptions.map((unit, index) => (
						<option key={index} value={unit}>Distance {unit}</option>
					))
				}				
			</select>
			<a style={{ paddingInlineStart: '20px' }}></a> {/** spacing */}
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
			<a style={{ paddingInlineStart: '20px' }}></a> {/** spacing */}
			<button 
				style={{
					backgroundColor: 'blue',
					color: 'white',
					fontWeight: 'bolder',
					borderRadius: 5,
					padding: 2,
					paddingInline: 7,
				}}
				onClick={onRouteExport}
			>Export Route</button>
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
				<button
					style={{
						backgroundColor: 'green',
						color: 'white',
						fontWeight: 'bolder',
						borderRadius: 5,
						padding: 2,
						paddingInline: 7,
					}}
				>
					Import Route
				</button>
			</div>
		</header>
	);
}
export default Header;
