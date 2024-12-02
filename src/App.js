import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import HowToUse from './components/HowToUse';
import TASCalculator from './components/TASCalculator';
import RoutePlanner from './utils/RoutePlanner';
import FuelCalculator from './components/FuelCalculator';
import JsonFile from './utils/JsonFile';
import FileName from './components/FileName';
import HelperButtons from './components/HelperButtons';

const baseSpeed = 350
const baseAltitude = 1000

function App() {

	const [mapObj, setMapObj] = useState(null);
	const [useMagneticHeading, setUseMagneticHeading] = useState(false);
	const [implementedMaps, setImplementedMaps] = useState(null)

	// Units:
	const [speedUnit, setSpeedUnit] = useState('kph')
	const [altitudeUnit, setAltitudeUnit] = useState('m')
	const [distanceUnit, setDistanceUnit] = useState('km')

	// Markers and Flight Legs:
	const [flightLegs, setFlightLegs] = useState([]);
	const [markers, setMarkers] = useState([]);

	const [totalFlightTime, setTotalFlightTime] = useState(null)
	
	const routePlannerRef = useRef(null);

	// Dynamic components
	const [showFileNameInput, setShowFileNameInput] = useState(false)
	const [showTASCalculator, setShowTASCalculator] = useState(false)
	const [showFuelCalculator, setShowFuelCalculator] = useState(false)
	const [showHowToUse, setShowHowToUse] = useState(false)

	if (!routePlannerRef.current) {
		routePlannerRef.current = new RoutePlanner(setFlightLegs, setMarkers, setSpeedUnit, setAltitudeUnit, setDistanceUnit, baseAltitude, baseSpeed);
	}
	const routePlanner = routePlannerRef.current;

	useEffect(() => {
		setMapObj(routePlanner.getMapObj()) // Get the default map object
		setImplementedMaps(routePlanner.getMaps())
	}, [routePlanner]);

	useEffect(() => {
		let flightTime = 0
		flightLegs.forEach((leg) => flightTime += leg.time)

		setTotalFlightTime(flightTime)

	}, [flightLegs])

	function onChangeMap(mapName)
	{
		routePlanner.removeAllMarkers()
		setMapObj(routePlanner.getMapObj(mapName))
	}

	function onRouteImport (importedRoute)
	{
		let wasSuccessful = routePlanner.applyRouteImportObject(importedRoute)
		
		if (!wasSuccessful)
			return

		setMapObj(routePlanner.getMapObj(importedRoute.map))
		setUseMagneticHeading(importedRoute.useMagneticHDG)
	}

	function openRouteExport()
	{
		if (markers.length < 2)
			return

		setShowFileNameInput(true)
		
		setShowTASCalculator(false)
		setShowFuelCalculator(false)
		setShowHowToUse(false)
	}

	function openTASCalculator()
	{
		setShowTASCalculator(true)

		setShowFuelCalculator(false)
		setShowHowToUse(false)
		setShowFileNameInput(false)
	}
	
	function openFuelCalculator()
	{
		setShowFuelCalculator(true)

		setShowTASCalculator(false)
		setShowHowToUse(false)
		setShowFileNameInput(false)
	}
	
	function openHowToUse()
	{
		setShowHowToUse(true)

		setShowTASCalculator(false)
		setShowFuelCalculator(false)
		setShowFileNameInput(false)
	}

	if (mapObj === null || implementedMaps === null) return <div>Loading ...</div>

	return (
		<div className="App">
			<Header 
				currentMap={mapObj.name}
				isMagnetic={useMagneticHeading}
				
				speedUnitOptions={['kph', 'mph', 'knots']}
				altitudeUnitOptions={['m', 'ft']}
				distanceUnitOptions={['km', 'mi', 'nm']}
				mapOptions={implementedMaps}

				speedUnit={speedUnit}
				onSpeedUnitSelect={(unit) => routePlanner.changeSpeedUnit(unit)}
				
				altitudeUnit={altitudeUnit}
				onAltitudeUnitSelect={(unit) => routePlanner.changeAltitudeUnit(unit)}

				distanceUnit={distanceUnit}
				onDistanceUnitSelect={(unit) => routePlanner.changeDistanceUnit(unit)}

				onMapSelect={(mapName) => onChangeMap(mapName)}

				onRemoveAllWaypoints={() => routePlanner.removeAllMarkers()}

				onHeadingTypeChange={(isMag) => setUseMagneticHeading(isMag)}

				onRouteExport={openRouteExport}
				onRouteImport={(e) => JsonFile.import(e, onRouteImport)}
				/>
			{ showTASCalculator ?
				<TASCalculator 
					initialSpeed={baseSpeed}
					speedUnit={speedUnit}
					initialAltitude={baseAltitude}
					altitudeUnit={altitudeUnit}
					onClose={() => setShowTASCalculator(false)}
					/>
				: null
			}
			{ showFuelCalculator ?
				<FuelCalculator flightTime={totalFlightTime} onClose={() => setShowFuelCalculator(false)}/>
				: null
			}
			{ showHowToUse ?
				<HowToUse onClose={() => setShowHowToUse(false)}/>
				: null
			}
			<HelperButtons 
				onTASCalculatorToggle={openTASCalculator}
				onFuelCalculatorToggle={openFuelCalculator}
				onHowToUseToggle={openHowToUse}
			/>
			{ showFileNameInput ?
				<FileName
					onSaveFile={(fileName) => JsonFile.export(fileName, routePlanner.getRouteExportObject(mapObj.name, useMagneticHeading))}
					onCancel={() => setShowFileNameInput(false)} 
					/>
				: null
			}
			<Map 
				mapObj={mapObj}
				p_flightLegs={flightLegs}
				p_markers={markers}
				p_routePlanner={routePlanner}
				speedUnit={speedUnit}
				altitudeUnit={altitudeUnit}
				distanceUnit={distanceUnit}
				useMagneticHDG={useMagneticHeading}
				/>
		</div>
	);
}

export default App;
