import { useEffect, useState } from "react"
import AppStyle from "../AppStyle"

const FileName = ({ onSaveFile, onCancel }) => {
	const [fileName, setFileName] = useState('il2_clod_route')

	const [message, setMessage] = useState(null)

	useEffect(() => {
		if (fileName.length < 3)
			setMessage('Error: the file name needs to be at least 3 characters long.')
		else 
			setMessage(null)

	}, [fileName])

	function onFileNameChange(e) {
		setFileName(e.target.value)
	}

	function onSavetry() {
		if (fileName.length > 2) {
			onSaveFile(fileName)
			onCancel()
		}
	}

	return (
		<div
			style={{
				...AppStyle.label,
				position: 'absolute',
				zIndex: 15,
				backgroundColor: 'white',
				padding: 7,
				borderRadius: '10px',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				pointerEvents: 'auto',
				alignItems: 'center',
				width: '400px',
				maxWidth: '80%',
			}}
		>
			<a style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Route Name</a><br /><br />
			{ message !== null ?
				<div>
					<a style={{ color: 'red', fontSize: 14}}>{message}</a><br /><br />
				</div>
				: null
			}
			<input 
				style={{ width: '97%' }}
				value={fileName} 
				onChange={onFileNameChange} /><br /><br />
			<button
				style={{ ...AppStyle.button.blue, width: '100%', padding: 7 }}
				onClick={onSavetry}>Download Route</button><br /><br />
			<button
				style={{ ...AppStyle.button.cancel, width: '100%', padding: 7 }}
				onClick={onCancel}
			>Cancel</button>
		</div>
	)
}

export default FileName
