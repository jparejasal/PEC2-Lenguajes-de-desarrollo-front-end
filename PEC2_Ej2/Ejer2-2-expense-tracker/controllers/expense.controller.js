/**
 * @class Controladora 
 * 
 * Comunica con la capa vista y gestiona las operaciones lógicas a realizar.
 */

const addTransactionHandler = (e) => {
    e.preventDefault();
    const text = transactionView.text.value;
    const amount = transactionView.amount.value;
    const transaction = transactionModel.addTransaction(text, amount);
    transactionView.text.value = '';
    transactionView.amount.value = '';
    if (transaction) {
        transactionView.updateValues(transactionModel.transactions);
        transactionView.updateDOM(transactionModel.transactions);
    }
};

const removeTransactionHandler = (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        transactionModel.removeTransaction(id);
        transactionView.updateValues(transactionModel.transactions);
        transactionView.updateDOM(transactionModel.transactions);
    }
};

const editTransactionHandler = (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const transaction = transactionModel.getTransactionById(id);
        if (transaction) {
            transactionView.text.value = transaction.text;
            transactionView.amount.value = transaction.amount;
            // Actualiza el ID de la transacción actual en TransactionView
            transactionView.currentTransactionId = id;
            transactionView.save.style.display = 'block';
            transactionView.add.style.display = 'none';
        }
    }
};

const saveTransactionHandler = (e) => {
    if (e.target.classList.contains('save-btn')) {
        const id = transactionView.currentTransactionId; // Obtiene el ID de la transacción actual
        const text = transactionView.text.value;
        const amount = transactionView.amount.value;

        if (text.trim() === '' || amount.trim() === '') {
            alert('Please add a text and amount');
            return;
        } else {
            transactionModel.updateTransaction(id, text, amount);
            transactionView.updateValues(transactionModel.transactions);
            transactionView.updateDOM(transactionModel.transactions);
            // Limpia los campos de entrada y restablece el ID de la transacción actual
            transactionView.text.value = '';
            transactionView.amount.value = '';
            transactionView.currentTransactionId = null;
        }        
        transactionView.save.style.display = 'none';
        transactionView.save.style.display = 'block';
        alert("Cambio guardado exitosamente");
    }
};

transactionView.add.addEventListener('click', addTransactionHandler);
transactionView.save.addEventListener('click', saveTransactionHandler);
transactionView.list.addEventListener('click', removeTransactionHandler);
transactionView.list.addEventListener('click', editTransactionHandler);
