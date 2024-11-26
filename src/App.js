import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import Keybinds from './components/Keybinds';
import TASCalculator from './components/TASCalculator';
import RoutePlanner from './utils/RoutePlanner';

function App() {

	const [mapObj, setMapObj] = useState(null);
	// const [distanceUnit, selectDistanceUnit] = useState('km');
	const [baseSpeed, setBaseSpeed] = useState(400);
	const [isMagneticHeading, setMagneticHeading] = useState(false);
	
	const [implementedMaps, setImplementedMaps] = useState(null)

	// Units:
	const [speedUnit, setSpeedUnit] = useState('kph')
	const [altitudeUnit, setAltitudeUnit] = useState('m')
	const [distanceUnit, setDistanceUnit] = useState('km')

	// Markers and Flight Legs:
	const [flightLegs, setFlightLegs] = useState([]);
	const [markers, setMarkers] = useState([]);
	
	const routePlannerRef = useRef(null);

	if (!routePlannerRef.current) {
		routePlannerRef.current = new RoutePlanner(setFlightLegs, setMarkers, setSpeedUnit, setAltitudeUnit, setDistanceUnit, 'metric', 1000, baseSpeed);
	}
	const routePlanner = routePlannerRef.current;

	useEffect(() => {
		setMapObj(routePlanner.getMapObj()) // Get the default map object
		console.log('Implemented maps: ' + JSON.stringify(routePlanner.getMaps()))
		setImplementedMaps(routePlanner.getMaps())
	}, [routePlanner]);

	function changeMap(mapName)
	{
		routePlanner.removeAllMarkers()
		setMapObj(routePlanner.getMapObj(mapName))
	}

	if (mapObj === null || implementedMaps === null) return <div>Loading ...</div>

	return (
		<div className="App">
			<Header 
				baseSpeed={baseSpeed}
				currentMap={mapObj.name}
				isMagnetic={isMagneticHeading}
				
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

				onSpeedChange={setBaseSpeed}
				onHeadingTypeChange={(isMag) => setMagneticHeading(isMag)}
				/>
			{/* <TASCalculator 
				p_speed={baseSpeed}
				p_unit={distanceUnit}
				onSetTAS={(tas) => setBaseSpeed(tas)}
				/> */}
			<Keybinds/>
			<Map 
				p_mapObj={mapObj}
				p_flightLegs={flightLegs}
				p_markers={markers}
				p_routePlanner={routePlanner}
				speedUnit={speedUnit}
				altitudeUnit={altitudeUnit}
				distanceUnit={distanceUnit}
				/>
		</div>
	);
}

export default App;
