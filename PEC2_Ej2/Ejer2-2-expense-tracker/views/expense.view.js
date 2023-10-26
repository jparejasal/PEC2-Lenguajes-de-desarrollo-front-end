/**
 * @class Vista 
 * 
 * Representacion visual de la capa modelo.
 */
class TransactionView {
    constructor() {
        this.currentTransactionId = null; // Agrega una propiedad para rastrear el ID de la transacción actual
        this.balance = document.getElementById('balance');
        this.moneyPlus = document.getElementById('money-plus');
        this.moneyMinus = document.getElementById('money-minus');
        this.list = document.getElementById('list');
        this.form = document.getElementById('form');
        this.text = document.getElementById('text');
        this.amount = document.getElementById('amount');
        this.save = document.getElementById('save');
        this.add = document.getElementById('add');
        this.total = 0;
        this.amounts = 0;
        this.income = 0;
        this.expense = 0;
        this.ids;
    }

    updateDOM(transactions) {
        this.list.innerHTML = '';
        transactions.forEach(transaction => this.addTransactionDOM(transaction));
        this.updateValues(transactions);
    }

    addTransactionDOM(transaction) {
        const sign = transaction.amount < 0 ? '-' : '+';
        const item = document.createElement('li');
        item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
        item.innerHTML = `
  ${
            transaction.text
        } <span>${sign}${
            Math.abs(transaction.amount)
        }</span>
  <button class="edit-btn" data-id="${
            transaction.id
        }">Edit</button>
  <button class="delete-btn" data-id="${
            transaction.id
        }">x</button>
`;
        this.list.appendChild(item);
    }

    updateValues(transactions) {
        if (Array.isArray(transactions)) { // Si es una lista de transacciones
            this.amounts = transactions.map(transaction => transaction.amount);
            this.ids = transactions.map(transaction => transaction.id);
        } else { // Si es una única transacción
            this.amounts = [transactions.amount];
            this.ids = [transactions.id];
        }

        this.total = this.amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
        this.income = this.amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
        this.expense = (this.amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

        this.balance.innerText = `$${
            this.total
        }`;
        this.moneyPlus.innerText = `$${
            this.income
        }`;
        this.moneyMinus.innerText = `$${
            this.expense
        }`;
    }
}
const transactionView = new TransactionView();
