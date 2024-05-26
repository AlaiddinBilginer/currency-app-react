import React, { useEffect, useState } from 'react';
import './styles.css';
import CurrencyInput from './CurrencyInput';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { LuArrowDownUp } from 'react-icons/lu';
import axios from 'axios';

const BASE_URL = 'https://api.freecurrencyapi.com/v1/';
const API_KEY = process.env.VITE_API_KEY;

function CurrencyBox() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrencyAmount, setFromCurrencyAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrencyAmount, setToCurrencyAmount] = useState(0);
  const [toCurrency, setToCurrency] = useState('TRY');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 830);

  const addCurrencies = async () => {
    const response = await axios.get(`${BASE_URL}currencies?apikey=${API_KEY}`);
    const currencyArray = Object.keys(response.data.data);
    setCurrencies(currencyArray);
  };

  const exchange = async () => {
    const response = await axios.get(
      `${BASE_URL}latest?apikey=${API_KEY}&base_currency=${fromCurrency}`
    );
    const result = response.data.data[toCurrency] * fromCurrencyAmount;
    setToCurrencyAmount(result.toFixed(2));
  };

  const handleExchangeClick = () => {
    const tempFromCurrency = fromCurrency;
    const tempFromCurrencyAmount = fromCurrencyAmount;

    setFromCurrency(toCurrency);
    setFromCurrencyAmount(toCurrencyAmount);
    setToCurrency(tempFromCurrency);
    setToCurrencyAmount(tempFromCurrencyAmount);
  };

  useEffect(() => {
    addCurrencies();
    exchange();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 830);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fromCurrency, toCurrency, fromCurrencyAmount, toCurrencyAmount]);

  return (
    <div className="currency-box">
      <CurrencyInput
        label="Miktar"
        amount={fromCurrencyAmount}
        currency={fromCurrency}
        onAmountChange={setFromCurrencyAmount}
        onCurrencyChange={setFromCurrency}
        currencies={currencies}
      />
      {isMobile ? (
        <div className="icon-box">
          <LuArrowDownUp onClick={handleExchangeClick} className="icon" />
        </div>
      ) : (
        <div className="icon-box">
          <FaArrowRightArrowLeft onClick={handleExchangeClick} className="icon" />
        </div>
      )}

      <CurrencyInput
        label="Karşılığı"
        amount={toCurrencyAmount}
        currency={toCurrency}
        onAmountChange={setToCurrencyAmount}
        onCurrencyChange={setToCurrency}
        currencies={currencies}
      />
    </div>
  );
}

export default CurrencyBox;
