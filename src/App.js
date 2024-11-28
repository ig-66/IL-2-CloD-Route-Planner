import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import Keybinds from './components/Keybinds';
import TASCalculator from './components/TASCalculator';
import RoutePlanner from './utils/RoutePlanner';
import FuelCalculator from './components/FuelCalculator';

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

	function changeMap(mapName)
	{
		routePlanner.removeAllMarkers()
		setMapObj(routePlanner.getMapObj(mapName))
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

				onMapSelect={(mapName) => changeMap(mapName)}

				onRemoveAllWaypoints={() => routePlanner.removeAllMarkers()}

				onHeadingTypeChange={(isMag) => setUseMagneticHeading(isMag)}
				/>
			<TASCalculator 
				initialSpeed={baseSpeed}
				speedUnit={speedUnit}
				initialAltitude={baseAltitude}
				altitudeUnit={altitudeUnit}
				/>
			<FuelCalculator flightTime={totalFlightTime}/>
			<Keybinds/>
			<Map 
				p_mapObj={mapObj}
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
