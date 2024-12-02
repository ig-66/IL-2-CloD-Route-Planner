import AppStyle from '../AppStyle.js';

const HowToUse = ({ onClose }) => {
	return (
		<div 
			style={{...AppStyle.screenCenterLabel, top: '60%'}}>
			<div
				style={{
					textAlign: 'left',
					fontSize: 12,
					zIndex: 15,
					lineHeight: 1.5,
				}}
			>
				<div style={{ textAlign: 'center', fontWeight: 'bold' }}>
					<a>ON DESKTOP:</a><br />
				</div>
				<a style={{ fontWeight: 'bold' }}>LMB(hold):</a><a> Map drag </a><br />
				<a style={{ fontWeight: 'bold' }}>RMB:</a><a> Add new waypoint </a><br />
				<a style={{ fontWeight: 'bold' }}>MMB:</a><a> Remove last waypoint </a><br />
				<a>To remove a mid-waypoint, click on it, and then on 'Remove Waypoint' button</a>
				<br /><br />
				<div style={{ textAlign: 'center', fontWeight: 'bold' }}>
					<a>ON SMARTPHONE/TABLET:</a><br />
				</div>
				<a style={{ fontWeight: 'bold' }}>Hold and drag:</a><a> Map drag </a><br />
				<a style={{ fontWeight: 'bold' }}>Long press:</a><a> Add new waypoint </a><br />
				<a>To remove a waypoint, click on it, and then on 'Remove Waypoint' button</a>
			</div>
			<br />
			<button style={AppStyle.button.cancel} onClick={onClose}>Close</button>
		</div>
	)
}

export default HowToUse;
