	const bot = {
		messages: Array.from(document.querySelectorAll('div[role="listbox"]')),

		findElement(parent, query, text) {
			const component = Array.from(parent.querySelectorAll(query))
			const result = component.find(element => element.innerText === text)
			return result
		},

		getYouMessage(message) {
			const you = !this.findElement(message, 'button', 'Denunciar')
			if (you) return message
		},

		clickMenu(message) {
			const getButton = message.querySelector('svg[aria-label="Cancelar envio"]')
			if (getButton) getButton.parentNode.click()
			return message
		},

		showMessageDeleted(message) {
			const getMessage = Array.from(message.querySelectorAll('span'))
				.reduce((acc, { innerText }) => acc = `${innerText} ` || '', '')
			if (getMessage) console.log('%cDELETADA', 'background: #f02f01;padding:5px;', getMessage)

			return message
		},

		selectOption(message) {
			const btn = this.findElement(document, 'div', 'Cancelar envio')
			if (!btn) return

			const [element] = btn.childNodes
			element.click()
		
			return message
		},

		confirmDialog() {
			const dialog = document.querySelector('div[role="dialog"]')
			if (!dialog) return

			const btn = this.findElement(dialog, 'button', 'Cancelar envio')			
			if (btn) btn.click()

			return dialog
		},

		checkedRule(message, fn) {
			if (!message) return this.cancelMessage()
			//console.log(fn, message)
			return this[fn](message)
		},

		orderFunctions(message, ...fns) {
			const order = (message, fn) => message = this.checkedRule(message, fn)
			const result = fns.reduce(order, message) || 'cancelMessage'

			if (typeof this[result] !== 'function') return this.cancelMessage()
			return this[result]()
		},

		cancelMessage() {
			const message = this.messages.shift() || !![].length
			if (!message) return

			const mouseover = new MouseEvent('mouseover', { view: window, bubbles: true, cancelable: true })
			if (!message.dispatchEvent(mouseover)) return

			this.orderFunctions(message,
				'getYouMessage',
				'clickMenu',
				'selectOption',
				'showMessageDeleted',
				'confirmDialog'
			)
		}
	}

	bot.cancelMessage()
