const bot = {
	confirDialog(button) {
		const { innerText } = button || {}
		if (!innerText) return

		if (innerText == 'Cancelar envio') {
			button.click()
			bot.cancelMessage()
		}
	},

	clickDialog() {
		const dialog = document.querySelector('div[role="dialog"]')
		const buttons = dialog.querySelectorAll('button')
		buttons.forEach(this.confirDialog)
	},

	clickMenu(button) {
		const getButton = button.querySelector('svg[aria-label="Cancelar envio"]')
		if (getButton) button.click()
	},

	clickOption(button, index, array) {
		const findOptino = () => {
			const { innerText } = button.querySelector('div') || {}
			if (!innerText) return

			if (innerText == 'Cancelar envio') {
				button.click()
				bot.clickDialog()
				return clearTimeout(search)
			}

			if (array.lenght-1 == index) {
				bot.cancelMessage()
				return clearTimeout(search)
			}
		}

		const search = setTimeout(findOptino, index * 120)
	},

	cancelMessage() {
		const [message] = document.querySelectorAll('div[role="listbox"]')
		if (!message) return

		const mouseover = new MouseEvent('mouseover', { view: window, bubbles: true, cancelable: true })
		if (!message.dispatchEvent(mouseover)) return

	    const buttons = message.querySelectorAll('button')
	    buttons.forEach(this.clickMenu)
	    buttons.forEach(this.clickOption)
	}
}

bot.cancelMessage()
