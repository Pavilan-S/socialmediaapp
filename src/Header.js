const Header = ({title}) => {
  return (
    <header className="Header">
      <h1>{title}</h1>
      {/* {width < 768 ? <FaMobileAlt /> : width < 1024 ? <FaTabletAlt /> : <FaDesktop />} */}
    </header>
  );
}

export default Header