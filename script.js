document.addEventListener('DOMContentLoaded', () => {
    const loginScreen = document.getElementById('loginScreen');
    const atmScreen = document.getElementById('atmScreen');
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('passwordInput');
    const loginError = document.getElementById('loginError');
    const operationSelect = document.getElementById('operation');
    const amountInput = document.getElementById('amountInput');
    const performOperationBtn = document.getElementById('performOperation');
    const resultParagraph = document.getElementById('result');
    let balance = 1000;
    const correctPassword = '1234';  // Senha fixa para simulação

    function showLoginScreen() {
        loginScreen.classList.remove('hidden');
        atmScreen.classList.add('hidden');
    }

    function showAtmScreen() {
        loginScreen.classList.add('hidden');
        atmScreen.classList.remove('hidden');
    }

    function handleLogin() {
        const enteredPassword = passwordInput.value;
        if (enteredPassword === correctPassword) {
            showAtmScreen();
        } else {
            loginError.classList.remove('hidden');
        }
    }

    function handleOperationChange() {
        const operation = operationSelect.value;
        if (operation === 'consultar') {
            amountInput.classList.add('hidden');
        } else {
            amountInput.classList.remove('hidden');
        }
    }

    function performOperation() {
        const operation = operationSelect.value;
        const amount = parseFloat(amountInput.value);

        if (operation === 'consultar') {
            resultParagraph.textContent = `Saldo atual: R$ ${balance.toFixed(2)}`;
            resultParagraph.classList.remove('error');
        } else {
            if (isNaN(amount) || amount <= 0) {
                resultParagraph.textContent = 'Valor inválido.';
                resultParagraph.classList.add('error');
                return;
            }

            if (operation === 'sacar') {
                if (amount > balance) {
                    resultParagraph.textContent = 'Saldo insuficiente.';
                    resultParagraph.classList.add('error');
                } else {
                    balance -= amount;
                    resultParagraph.textContent = `Saque de R$ ${amount.toFixed(2)} realizado. Saldo atual: R$ ${balance.toFixed(2)}`;
                    resultParagraph.classList.remove('error');
                }
            } else if (operation === 'depositar') {
                balance += amount;
                resultParagraph.textContent = `Depósito de R$ ${amount.toFixed(2)} realizado. Saldo atual: R$ ${balance.toFixed(2)}`;
                resultParagraph.classList.remove('error');
            }
        }
    }

    loginBtn.addEventListener('click', handleLogin);
    performOperationBtn.addEventListener('click', performOperation);
    operationSelect.addEventListener('change', handleOperationChange);

    showLoginScreen();
});
