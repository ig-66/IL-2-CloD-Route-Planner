const JsonFile = {
	
	/**
	 * Export a object as a JSON file.
	 * 
	 * @param {string} fileName File name (without the file extention).
	 * @param {object} jsonObject JSON object to be exported.
	 */
	export(fileName, jsonObject)
	{
		const jsonString = JSON.stringify(jsonObject)

		const blob = new Blob([jsonString], { type: 'application/json' })
		const url = URL.createObjectURL(blob)

		const link = document.createElement('a')
		link.href = url
		link.download = `${fileName}.json`
		link.click()

		URL.revokeObjectURL(url)
	},

	/**
	 * Imports a object from a selected file.
	 * 
	 * @param {event} event Import event.
	 * @param {function} onLoadCallback Callback called when the object is loaded.
	 */
	async import(event, onLoadCallback)
	{
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onload = (e) => {
				try {
					const importedObject = JSON.parse(e.target.result)
					onLoadCallback(importedObject)
				} catch (err) {
					// 	wow! nothing :o
				}
			}
			reader.readAsText(file)
		}
	}
}

export default JsonFile
