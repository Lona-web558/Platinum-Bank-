const API = "/api";

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

document.getElementById("username").innerHTML = user.fullName;

document.getElementById("balance").innerHTML =
    "R" + Number(user.balance).toFixed(2);

document.getElementById("accountNumber").innerHTML =
    user.accountNumber || "N/A";

loadTransactions();

document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "login.html";
});

async function depositMoney() {

    const input = prompt("Enter amount to deposit:");
    if (input === null) return;

    const amount = Number(input);
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        const response = await fetch(API + "/transactions/deposit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user._id, amount })
        });

        const data = await response.json();

        if (data.success) {
            user.balance = data.balance;
            localStorage.setItem("user", JSON.stringify(user));
            location.reload();
        } else {
            alert(data.message || "Deposit failed.");
        }
    } catch (err) {
        alert("Network error. Please try again.");
    }
}

async function withdrawMoney() {

    const input = prompt("Enter amount to withdraw:");
    if (input === null) return;

    const amount = Number(input);
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        const response = await fetch(API + "/transactions/withdraw", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user._id, amount })
        });

        const data = await response.json();

        if (data.success) {
            user.balance = data.balance;
            localStorage.setItem("user", JSON.stringify(user));
            location.reload();
        } else {
            alert(data.message || "Withdrawal failed.");
        }
    } catch (err) {
        alert("Network error. Please try again.");
    }
}

async function transferMoney() {

    const recipientAccount = prompt("Enter recipient's account number:");
    if (recipientAccount === null) return;

    const input = prompt("Enter amount to transfer:");
    if (input === null) return;

    const amount = Number(input);
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        const response = await fetch(API + "/transactions/transfer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senderId: user._id, recipientAccount, amount })
        });

        const data = await response.json();

        if (data.success) {
            user.balance = data.balance;
            localStorage.setItem("user", JSON.stringify(user));
            alert("Transfer successful.");
            location.reload();
        } else {
            alert(data.message || "Transfer failed.");
        }
    } catch (err) {
        alert("Network error. Please try again.");
    }
}

async function loadTransactions() {
    try {
        const response = await fetch(API + "/transactions/history/" + user._id);
        const transactions = await response.json();

        let html = "";
        transactions.forEach(transaction => {
            html += `
            <tr>
                <td>${new Date(transaction.createdAt).toLocaleDateString()}</td>
                <td>${transaction.type}</td>
                <td>R${transaction.amount}</td>
            </tr>
            `;
        });

        document.getElementById("transactionTable").innerHTML = html;
    } catch (err) {
        console.error("Failed to load transactions", err);
    }
}
