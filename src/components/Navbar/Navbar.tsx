// src/components/Navbar/Navbar.tsx

import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import arrow_icon from "../../assets/arrow_icon.png";
import Image from 'next/image';
import { CoinContext } from '../../context/CoinContext';

const Navbar = () => {
  const coinContext = useContext(CoinContext);

  if (!coinContext) {
    throw new Error('CoinContext must be used within a CoinProvider');
  }

  const { setCurrency } = coinContext;

  const currencyHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  }

  return (
    <div className='navbar'>
      <Image src={logo} alt="logo" className='logo' />
      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className='nav-right'>
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EURO</option>
          <option value="inr">INR</option>
        </select>
        <button>Sign up <Image src={arrow_icon} alt="arrow icon" /></button>
      </div>
    </div>
  );
}

export default Navbar;
