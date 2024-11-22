import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import Keybinds from './components/Keybinds';
import TASCalculator from './components/TASCalculator';
import RoutePlanner from './utils/RoutePlanner';

function App() {

	const [mapObj, setMapObj] = useState(null);
	const [distanceUnit, selectDistanceUnit] = useState('km');
	const [baseSpeed, setBaseSpeed] = useState(400);
	const [isMagneticHeading, setMagneticHeading] = useState(false);
	
	const [flightLegs, setFlightLegs] = useState([]);
	const [markers, setMarkers] = useState([]);
	
	const routePlannerRef = useRef(null);

	if (!routePlannerRef.current) {
		routePlannerRef.current = new RoutePlanner(setFlightLegs, setMarkers, 'metric', 1000, baseSpeed);
	}
	const routePlanner = routePlannerRef.current;

	useEffect(() => {
		setMapObj(routePlanner.getMapObj()) // Get the default map object
	}, [routePlanner]);

	function changeMap(mapName)
	{
		routePlanner.removeAllMarkers()
		setMapObj(routePlanner.getMapObj(mapName))
	}

	if (mapObj === null) return <div>Loading ...</div>

	return (
		<div className="App">
			<Header 
				p_speed={baseSpeed}
				p_isMagnetic={isMagneticHeading}
				onMapSelect={(mapName) => changeMap(mapName)} 
				onDistanceUnitSelect={selectDistanceUnit}
				onSpeedChange={setBaseSpeed}
				onHeadingTypeChange={(isMag) => setMagneticHeading(isMag)}
				/>
			<TASCalculator 
				p_speed={baseSpeed}
				p_unit={distanceUnit}
				onSetTAS={(tas) => setBaseSpeed(tas)}
				/>
			<Keybinds/>
			<Map p_mapObj={mapObj} p_flightLegs={flightLegs} p_markers={markers} p_routePlanner={routePlanner}/>
			{/* <Waypoints p_waypoints={waypoints} p_flightLegs={flightLegs} p_distanceUnit={distanceUnit}/> */}
		</div>
	);
}

export default App;
