import React from 'react';
import AppStyle from '../AppStyle';

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
				width: 980,
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
				style={AppStyle.button.cancel}
				onClick={onRemoveAllWaypoints}
			>Remove All Waypoints</button>
			<a style={{ paddingInlineStart: '20px' }}></a> {/** spacing */}
			<button 
				style={AppStyle.button.blue}
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
				<button style={AppStyle.button.green}>Import Route</button>
			</div>
		</header>
	);
}
export default Header;
