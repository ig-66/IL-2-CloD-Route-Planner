import AppStyle from "../AppStyle"

const HelperButtons = ({ onTASCalculatorToggle, onFuelCalculatorToggle, onHowToUseToggle }) => {
	return (
		<div
			style={{
				position: 'absolute',
				zIndex: 20,
				justifyContent: 'center',
				bottom: 10,
				transform: 'translateX(-50%)',
				left: '50%',
				maxWidth: '100%',
				width: 500,
			}}
		>
			<button
				style={{...AppStyle.button.blue, margin: 5}}
				onClick={(e) => onTASCalculatorToggle()}
			>TAS Calculator
			</button>
			<button
				style={{...AppStyle.button.blue, margin: 5}}
				onClick={(e) => onFuelCalculatorToggle()}
			>Fuel Calculator
			</button>
			<button
				style={{...AppStyle.button.blue, margin: 5}}
				onClick={(e) => onHowToUseToggle()}
			>How to use
			</button>
		</div>
	)
}

export default HelperButtons
