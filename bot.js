const bot = {
	delay: 1,

	confirDialog(button) {
		const { innerText } = button || {}
		if (!innerText) return console.warn('[@] Dialogo inexistente.')

		if (innerText == 'Cancelar envio') {
			button.click()
			bot.cancelMessage()
		}
	},

	clickDialog() {
		const dialog = document.querySelector('div[role="dialog"]')
		const buttons = dialog.querySelectorAll('button')
		buttons.forEach(this.confirDialog)
		return true
	},

	clickMenu(button) {
		const getButton = button.querySelector('svg[aria-label="Cancelar envio"]')
		if (getButton) getButton.parentNode.click()
	},

	clickOption(button) {
		const buttons = Array.from(document.querySelectorAll('div'))
		const btn = buttons.find(element => element.innerText === 'Cancelar envio')

		if (!btn) return console.warn('[@] Botão de cancelar envio não foi encontrado.')
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
		if (!message) return console.warn('[@] Sem menssagens legiveis.')

		const mouseover = new MouseEvent('mouseover', { view: window, bubbles: true, cancelable: true })
		if (!message.dispatchEvent(mouseover)) return console.warn('[@] Não foi possivel abrir o menu.')

		this.clickMenu(message)
		this.clickOption(message)
	}
}

bot.cancelMessage()
