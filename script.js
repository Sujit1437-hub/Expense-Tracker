// Get HTML Elements
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

const addBtn = document.getElementById("addBtn");

const list = document.getElementById("list");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

// Array to Store Transactions
let transactions = [];

// ================================
// Add Transaction
// ================================
addBtn.addEventListener("click", addTransaction);

function addTransaction() {

    const desc = description.value.trim();
    const amt = Number(amount.value);
    const transactionType = type.value;

    // Validation
    if (desc === "" || amt <= 0) {
        alert("Please enter valid description and amount.");
        return;
    }

    // Create Object
    const transaction = {
        id: Date.now(),
        description: desc,
        amount: amt,
        type: transactionType
    };

    // Store Data
    transactions.push(transaction);

    // Save Data
    saveTransactions();

    // Display Data
    displayTransactions();

    // Clear Inputs
    description.value = "";
    amount.value = "";
}

// ================================
// Display Transactions
// ================================
function displayTransactions() {

    // Clear List
    list.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function (transaction) {

        const li = document.createElement("li");

        // Add Border Color
        if (transaction.type === "Expense") {
            li.classList.add("expense-item");
            totalExpense += transaction.amount;
        } else {
            totalIncome += transaction.amount;
        }

        // Create Transaction Row
        li.innerHTML = `
            <span>
                <strong>${transaction.description}</strong>
                <br>
                ${transaction.type} - ₹${transaction.amount}
            </span>

            <button class="delete-btn"
                onclick="deleteTransaction(${transaction.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });

    // Calculate Balance
    const totalBalance = totalIncome - totalExpense;

    // Update Screen
    income.innerText = "₹" + totalIncome;
    expense.innerText = "₹" + totalExpense;
    balance.innerText = "₹" + totalBalance;
}

// ================================
// Delete Transaction
// ================================
function deleteTransaction(id) {

    transactions = transactions.filter(function (transaction) {
        return transaction.id !== id;
    });

    saveTransactions();

    displayTransactions();
}

// ================================
// Save to Local Storage
// ================================
function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

// ================================
// Load from Local Storage
// ================================
function loadTransactions() {

    const data = localStorage.getItem("transactions");

    if (data) {

        transactions = JSON.parse(data);

        displayTransactions();

    }

}

// ================================
// Load Data When Page Opens
// ================================
loadTransactions();