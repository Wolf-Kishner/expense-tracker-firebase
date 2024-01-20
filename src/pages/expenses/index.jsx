import React, { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useDeleteTransactions } from "../../hooks/useDeleteTransactions";
import { useTheme} from  "./ThemeContext"

export const ExpenseTracker = () => {
  const { theme, toggleTheme } = useTheme();

  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotal } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();
  const { balance, income, expenses } = transactionTotal;

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const deleteTransaction = useDeleteTransactions();

  const onDelete = (documentId) => {
    deleteTransaction(documentId);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setTransactionAmount(0);
    setDescription("");
  };

  const signUserOut = async () => {
    try {
      localStorage.clear();
      navigate("/");
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`main-${theme}`}>
      <div className="expense-tracker-container">
        <div className={`expense-tracker container-${theme}`}>
          <h1 className={`${theme}`}>Hello, {name}!</h1>
          <div className={`balance-${theme}`}>
            <h3>Your Balance</h3>
            <h2 className={`${theme}`}>{balance >= 0 ? `$${balance}` : `-$${-1 * balance}`}</h2>
          </div>
          <div className="summary">
            <div className={`income-${theme}`}>
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div className={`expenses-${theme}`}>
              <h4>Expenses</h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              required
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <button type="submit">Add Transaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img className="profile-photo" src={profilePhoto} />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
            <button onClick={toggleTheme} className="theme-btn">Toggle Theme</button>
          </div>
        )}
        <div className={`transactions-${theme}`}>
          <h3 className={`${theme}`}>Transactions</h3>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <div className="transaction-info">
                  <h4 className={`${theme}`}>{transaction.description}</h4>
                  <p className={`${theme}`}>
                    ${transaction.transactionAmount}{" "}
                    <label
                      style={{
                        color:
                          transaction.transactionType === "expense"
                            ? "red"
                            : "green",
                      }}
                    >
                      {transaction.transactionType}
                    </label>
                  </p>
                </div>
                <button onClick={() => onDelete(transaction.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
