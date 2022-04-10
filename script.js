document.addEventListener('DOMContentLoaded', () => {
	let phoneInputs = document.querySelectorAll('input[data-tel-input]');

	phoneInputs.forEach(input => {

		input.addEventListener('input', e => {

			let input = e.target;
			let inputNumbersValue = input.value.replace(/\D/g, '');
			let formattedInputValue = '';
			selectionStart = input.selectionStart;

			if(!inputNumbersValue) {

				return input.value = '';
			}

			if(input.value.length != selectionStart) {

				if(e.data && /\D/g.test(e.data)) {
					input.value = inputNumbersValue;
				}

				return;
			}

			if(['7', '8', '9'].includes(inputNumbersValue) > -1){

				if(inputNumbersValue[0] === '9') {
					inputNumbersValue = '7' + inputNumbersValue;
				}

				let firstSybmols = (inputNumbersValue[0] === '8') ? '8' : '+7';
				formattedInputValue = `${firstSybmols} `;

				if(inputNumbersValue.length > 1) {
					formattedInputValue += `(${inputNumbersValue.substring(1, 4)}`;
				}

				if(inputNumbersValue.length >= 5) {
					formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}`;
				}

				if(inputNumbersValue.length >= 8) {
					formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`;
				}

				if(inputNumbersValue.length >= 10) {
					formattedInputValue += `-${inputNumbersValue.substring(9, 11)}`;
				}

			} else {
				formattedInputValue	= '+' + inputNumbersValue.substring(0, 16);
			}

			input.value = formattedInputValue;
		});

		input.addEventListener('keydown', e => {
			let input = e.target;

			if(e.keyCode == 8 && input.value.replace(/\D/g, '').length == 1) {
				input.value = '';
			}

		});
		input.addEventListener('paste', e => {
			let pasted = e.clipboardData || window.clipboardData;
			input = e.target;
			inputNumbersValue = input.value.replace(/\D/g, '');

			if(pasted) {
				let pastedText = pasted.getData('Text');
				if(/\D/g.test(pastedText)) {
					input.value = inputNumbersValue;
				}
			}
		});

	});

});