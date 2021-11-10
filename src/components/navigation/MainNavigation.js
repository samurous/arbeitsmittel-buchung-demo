import classes from './MainNavigation.module.css';
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {DataContext} from "../../context/Data";

function NavLi({label, to}) {
  return (
    <li>
      <NavLink to={to} className={navData => navData.isActive ? classes.active : '' }>
        {label}
      </NavLink>
    </li>
  )
}

function MainNavigation() {
  const {cart} = useContext(DataContext);

  const navLinks = [
    {label: 'Dashboard', to: '/'},
    {label: 'Inventar', to: '/items'},
    {label: 'Buchungen', to: '/bookings'},
    {label: `Warenkorb (${cart.itemIds.length})`, to: '/cart'}
  ]

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Arbeitsmittel Buchungen</div>
      <nav className={classes.nav}>
        <ul>
          {navLinks.map((link, idx) => <NavLi key={idx} to={link.to} label={link.label}/>)}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation
