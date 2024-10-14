import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';

function App() {
	const [map, selectMap] = useState('channel');

	return (
		<div className="App">
			<Header onMapSelect={selectMap}/>
			<Map p_map={map}/>
		</div>
	);
}

export default App;
