import { useEffect, useState } from 'react';
import AppStyle from '../AppStyle.js';
import FlightMath from '../utils/FlightMath.js';

const TASCalculator = ({ p_unit, p_speed, onSetTAS }) => {

	const [speed, setSpeed] = useState(p_speed);
	const [TAS, setTAS] = useState()
	const [altitude, setAltitude] = useState(1000);
	const [altitudeUnit, setAltitudeUnit] = useState('m');
	const [speedUnit, setSpeedUnit] = useState('km/h');

	function handleAltitudeChange(event) {
		setAltitude(event.target.value);
	}

	function handleSpeedChange(event) {
		setSpeed(event.target.value);
		setTAS(event.target.value);
	}

	useEffect(() => {
		if (p_unit === 'km' && altitudeUnit === 'ft')
		{
			setAltitude(FlightMath.convertFeetToMeter(altitude))
			setSpeed(FlightMath.convertMphToKph(speed))
			setAltitudeUnit('m');
		}
		else if (p_unit === 'mi' && altitudeUnit === 'm')
		{
			setAltitude(FlightMath.convertMeterToFeet(altitude))
			setSpeed(FlightMath.convertKphToMph(speed))
			setAltitudeUnit('ft');
		}
	}, [p_unit])

	useEffect(() => {
		let isMetric = p_unit === 'km' ? true : false;
		setTAS(FlightMath.calculateTAS(altitude, speed, isMetric));
	}, [altitude, speed])

	return (
		<div style={{
			...AppStyle.label,
			width: '150px',
			pointerEvents: 'auto',
			position: 'absolute',
			right: '7px',
			top: '7px',
			fontSize: 15,
			lineHeight: '1.5',
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
					size={6}
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
					size={4}
				/><a> {p_unit === 'km' ? 'km/h' : 'mph'}</a>
				<br/>
				<a>TAS: {Math.round(TAS)} {p_unit === 'km' ? 'km/h' : 'mph'}</a>
				<br/>
			</div>
			<button style={{marginBottom: '5px' }} onClick={() => onSetTAS(Math.round(TAS))}>Set Speed</button>
		</div>
	)
}

export default TASCalculator;
