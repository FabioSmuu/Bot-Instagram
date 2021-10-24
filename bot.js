const bot = {
	delay: 1,

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
		return dialog
	},

	clickMenu(button) {
		const getButton = button.querySelector('svg[aria-label="Cancelar envio"]')
		if (getButton) getButton.parentNode.click()
	},

	clickOption(button) {
		const buttons = Array.from(document.querySelectorAll('div'))
		const btn = buttons.find(element => element.innerText === 'Cancelar envio')

		if (!btn) return
		const [element] = btn.childNodes
		element.click()

		setTimeout(() => {
			const dialog = this.clickDialog()
			if (dialog) return clearTimeout(this)
		}, this.delay)
	},

	cancelMessage() {
		const messages = Array.from(document.querySelectorAll('div[role="listbox"]'))//.entries()
		const message =	messages.find(message => Array.from(message.querySelectorAll('button')).length < 7)
		if (!message) return

		const mouseover = new MouseEvent('mouseover', { view: window, bubbles: true, cancelable: true })
		if (!message.dispatchEvent(mouseover)) return

		this.clickMenu(message)
		this.clickOption(message)
	}
}

bot.cancelMessage()
