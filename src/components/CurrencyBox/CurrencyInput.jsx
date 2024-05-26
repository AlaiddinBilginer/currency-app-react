import React from 'react';

function CurrencyInput({ label, amount, currency, onAmountChange, onCurrencyChange, currencies }) {
  return (
    <div className="control">
      <label>{label}</label>
      <div className="input-group">
        <input
          type="number"
          className="amount"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
        <select
          className="currency-option"
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
        >
          {currencies.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CurrencyInput;
