/**
 * @class Modelo 
 * 
 * Gestiona los datos de la aplicación
 */

class TransactionModel {
    constructor() {
        this.transactions = this.loadTransactions();
    }

    loadTransactions() {
        const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
        return localStorageTransactions || [];
    }

    addTransaction(text, amount) {
        if (text.trim() === '' || amount.trim() === '') {
            alert('Please add a text and amount on model');
            return;
        }
        const transaction = {
            id: this.generateID(),
            text,
            amount: + amount
        };
        this.transactions.push(transaction);
        this.updateLocalStorage();
        return transaction;
    }

    generateID() {
        return Math.floor(Math.random() * 100000000);
    }

    removeTransaction(id) {
        this.transactions = this.transactions.filter(transaction => transaction.id !== id);
        this.updateLocalStorage();
    }

    updateLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }

    getTransactionById(id) {
        return this.transactions.find(transaction => transaction.id === id);
    }

    updateTransaction(id, text, amount) {
        const transaction = this.transactions.find(transaction => transaction.id === id);

        if (transaction) {
            transaction.text = text;
            transaction.amount = + amount;
            this.updateLocalStorage();
        }
    }
}
const transactionModel = new TransactionModel();
