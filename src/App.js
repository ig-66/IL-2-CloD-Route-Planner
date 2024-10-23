import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import Waypoints from './components/Waypoints';
import Keybinds from './components/Keybinds';
import TASCalculator from './components/TASCalculator';

function App() {
	const [map, selectMap] = useState('channel');
	const [distanceUnit, selectDistanceUnit] = useState('km');
	const [baseSpeed, setBaseSpeed] = useState(400);
	const [isMagneticHeading, setMagneticHeading] = useState(false);
	const [waypoints, setWaypoints] = useState([]);
	const [flightLegs, setFlightLegs] = useState([]);

	return (
		<div className="App">
			<Header 
				p_speed={baseSpeed}
				p_isMagnetic={isMagneticHeading}
				onMapSelect={selectMap} 
				onDistanceUnitSelect={selectDistanceUnit}
				onSpeedChange={setBaseSpeed}
				onHeadingTypeChange={(isMag) => setMagneticHeading(isMag)}
				/>
			<Keybinds/>
			<TASCalculator 
				p_speed={baseSpeed}
				p_unit={distanceUnit}
				onSetTAS={(tas) => {console.log(`App.js > TAS: ${Math.round(tas)}`); setBaseSpeed(tas)}}
				/>
			<Map 
				p_map={map}
				p_unit={distanceUnit}
				p_baseSpeed={baseSpeed}
				p_flightLegs={flightLegs}
				p_isMagneticHeading={isMagneticHeading}
				onNewWaypoints={setWaypoints}
				onNewFlightLegs={setFlightLegs}
				/>
			<Waypoints p_waypoints={waypoints} p_flightLegs={flightLegs} p_distanceUnit={distanceUnit}/>
		</div>
	);
}

export default App;
