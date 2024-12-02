import { useEffect, useState } from "react"
import AppStyle from "../AppStyle"
import FlightMath from "../utils/FlightMath"
import UnitConversion from "../utils/UnitConversion"

const FuelCalculator = ({ flightTime, onClose }) => {

	const [formatedTime, setFormatedTime] = useState(null)

	const [additionalTime, setAdditionalTime] = useState(10)

	const [planeFuelConsuption, setPlaneFuelConsumption] = useState(500)
	const [consumptionUnit, setConsumptionUnit] = useState('L/h')
	
	const [requiredFuelAmount, setRequiredFuelAmount] = useState(null)
	const [fuelUnit, setFuelUnit] = useState('litres')

	useEffect(() => {
		let formatedTimeStr = FlightMath.getLegTimeString(flightTime + (additionalTime * 60))

		let fuelRequiredUnconverted = planeFuelConsuption * ((flightTime + (additionalTime * 60)) / 3600)

		setRequiredFuelAmount(fuelRequiredUnconverted * UnitConversion.getVolumeConversionValue(fuelUnit, consumptionUnit === 'L/h' ? 'l' : 'gal'))
		
		setFormatedTime(formatedTimeStr)
	}, [flightTime, additionalTime, planeFuelConsuption])

	const onAdditionalTime = (e) => {
		const additionalTimeMinutes = e.target.value
		
		if (additionalTimeMinutes < 0) return

		setAdditionalTime(additionalTimeMinutes)
	}

	const onConsumptionUnitChange = (e) => {
		let newConsumptionUnit = e.target.value
		if (newConsumptionUnit === consumptionUnit)
			return

		setPlaneFuelConsumption(planeFuelConsuption * UnitConversion.getVolumeConversionValue(
			newConsumptionUnit === 'L/h' ? 'l' : 'gal',
			newConsumptionUnit === 'L/h' ? 'gal' : 'l'
		))
		setConsumptionUnit(newConsumptionUnit)
	}

	const onFuelUnitChange = (e) => {
		let newFuelUnit = e.target.value
		
		if (newFuelUnit === fuelUnit)
			return
		
		setRequiredFuelAmount(requiredFuelAmount * UnitConversion.getVolumeConversionValue(newFuelUnit, fuelUnit))
		setFuelUnit(newFuelUnit)
	}

	if (formatedTime === null || requiredFuelAmount === null || flightTime === null) return

	return (
		<div style={{
			...AppStyle.screenCenterLabel,
			top: '60%',
			fontSize: 15,
			width: 200,
			paddingInline: 10,
			lineHeight: 2,
		}}>
			<a style={{ textAlign: 'center', fontWeight: 'bold' }}>Fuel Calculator</a><br />
			<div style={{ textAlign: 'left' }}>
				<a>Flight Time: {formatedTime}</a><br/>
				<a>Additional flight time: </a><br/>
				<input 
					type="number"
					placeholder={additionalTime}
					size={2}
					onChange={onAdditionalTime}
					value={additionalTime}
				/><a> minutes</a><br/>
				<a>Plane Fuel Consump.:</a><br/>
				<input 
					type="number"
					placeholder={Math.round(planeFuelConsuption)}
					size={3}
					onChange={(e) => setPlaneFuelConsumption(e.target.value)}
					value={Math.round(planeFuelConsuption)}
				/>
				<select value={consumptionUnit} onChange={onConsumptionUnitChange}>
					<option value={'L/h'}>L/h</option>
					<option value={'gal/h'}>gal/h</option>
				</select><br />
				<a>Required fuel amount:</a><br />
				<a>{Math.round(requiredFuelAmount)} </a>
				<select value={fuelUnit} onChange={onFuelUnitChange}>
					<option value={"litres"}>Litres</option>
					<option value={"gallons"}>Gallons</option>
				</select>
			</div>
			<button style={AppStyle.button.cancel} onClick={onClose}>Close</button>
		</div>
	)
}

export default FuelCalculator
