import React, { use } from 'react'
import { useContext } from 'react'
import { DataProvider } from './context/DataContext'  
import { FaMobileAlt, FaTabletAlt, FaDesktop } from 'react-icons/fa'
const Header = ({title}) => {
  return (
    <header className="Header">
      <h1>{title}</h1>
      {/* {width < 768 ? <FaMobileAlt /> : width < 1024 ? <FaTabletAlt /> : <FaDesktop />} */}
    </header>
  );
}

export default Header