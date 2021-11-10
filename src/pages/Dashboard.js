import {useContext} from "react";
import {DataContext} from "../context/Data";
import {Link} from "react-router-dom";

function Dashboard() {
  const {items, bookings} = useContext(DataContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Herzlich wilkommen zu unserem Arbeitsmittel Buchungssystem.</p>
      <p>
        Wir haben aktuell {items.length} <Link to="/items">Inventargegenstände</Link> zur Ausleihe
        und {bookings.length} aktive <Link to="/bookings">Buchungen</Link>.
      </p>
      <h2>Anleitung</h2>
      <p>
        Füge zunächst im <Link to="/items">Inventar</Link> Gegenstände zu
        deinem <Link to="/cart">Warenkorb</Link> hinzu.
      </p>
      <p>
        Wähle im <Link to="/cart">Warenkorb</Link> einen Zeitraum
        für die Ausleihe und gebe deinen Namen an.
      </p>
      <p>
        Über den "Buchen" Button kann die Buchung abgeschlossen werden.
      </p>
    </div>
  )
}

export default Dashboard
