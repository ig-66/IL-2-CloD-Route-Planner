import { useEffect, useState } from 'react';
import AppStyle from '../AppStyle.js';
import FlightMath from '../utils/FlightMath.js';
import UnitConversion from '../utils/UnitConversion.js';

const TASCalculator = ({ initialSpeed, speedUnit, initialAltitude, altitudeUnit, onClose }) => {
	const [speed, setSpeed] = useState(initialSpeed)
	const [altitude, setAltitude] = useState(initialAltitude);
	
	const [currentAltitudeUnit, setCurrentAltitudeUnit] = useState(null)
	const [currentSpeedUnit, setCurrentSpeedUnit] = useState(null)

	const [TAS, setTAS] = useState(null)

	function handleAltitudeChange(event) {
		let newAltitude = event.target.value;
		if (newAltitude >= 0)
			setAltitude(newAltitude);
	}

	function handleSpeedChange(event) {
		let newSpeed = event.target.value;
		if (newSpeed > 0)
		{
			setSpeed(newSpeed);
			setTAS(newSpeed);
		}
	}

	useEffect(() => {
		if (!currentAltitudeUnit)
		{
			setCurrentAltitudeUnit(altitudeUnit)
			return
		}

		if (altitudeUnit === currentAltitudeUnit)
			return
		
		setAltitude(altitude * UnitConversion.getAltitudeConversionValue(altitudeUnit, currentAltitudeUnit))
		setCurrentAltitudeUnit(altitudeUnit)

	}, [altitudeUnit])

	useEffect(() => {
		if (!currentSpeedUnit)
		{
			setCurrentSpeedUnit(speedUnit)
			return
		}

		if (speedUnit === currentSpeedUnit)
			return
		
		setSpeed(speed * UnitConversion.getSpeedConversionValue(speedUnit, currentSpeedUnit))
		setCurrentSpeedUnit(speedUnit)

	}, [speedUnit])

	useEffect(() => {
		setTAS(FlightMath.calculateTAS(altitude, altitudeUnit, speed));
	}, [altitude, speed])

	return (
		<div style={{
			...AppStyle.screenCenterLabel,
			width: '150px',
			top: '60%',
			pointerEvents: 'auto',
			position: 'absolute',
			fontSize: 15,
			lineHeight: 2,
		}}>
			<a style={{ textAlign: 'center', fontWeight: 'bold'}}>TAS Calculator</a><br/>
			<div style={{textAlign: 'left'}}>
				<a>Alt.: </a>
				<input
					type="number"
					id="numberInput"
					value={Math.round(altitude)}
					onChange={handleAltitudeChange}
					placeholder={altitude}
					min="0"
					step="1"
					style={{ width: 60 }}
				/>
				<a> {altitudeUnit}</a>
				<br/>
				<a>IAS: </a>
				<input
					type="number"
					id="numberInput"
					value={Math.round(speed)}
					onChange={handleSpeedChange}
					placeholder={speed}
					min="0"
					step="1"
					style={{ width: 60 }}
				/><a> {speedUnit}</a>
				<br/>
				<a>TAS: {Math.round(TAS)} {speedUnit}</a>
				<br/>
			</div>
			<button style={AppStyle.button.cancel} onClick={onClose}>Close</button>
		</div>
	)
}

export default TASCalculator;
