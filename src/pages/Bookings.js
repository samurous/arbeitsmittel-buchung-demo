import {Table, Badge} from '@mantine/core';
import {useContext} from "react";
import dayjs from "dayjs";
import {DataContext} from "../context/Data";

function BookingTableRow({booking, items}) {
  return (
    <tr>
      <td>{booking.user}</td>
      <td>{dayjs(booking.start).format('DD.MM.YYYY')}</td>
      <td>{dayjs(booking.end).format('DD.MM.YYYY')}</td>
      <td>
        {booking.itemIds.map(
          id => (<Badge variant="dot" key={id}>{items[items.findIndex(x => x.id === id)].name}</Badge>)
        )}
      </td>
    </tr>
  )
}

function Bookings() {
  const {bookings, items} = useContext(DataContext);

  const tableRows = bookings.map(
    (booking, idx) => (<BookingTableRow key={idx} booking={booking} items={items}/>)
  );

  return (
    <div>
      <h1>Buchungen</h1>
      <Table striped highlightOnHover>
        <thead>
        <tr>
          <th>Gebucht von</th>
          <th>Ausleihe</th>
          <th>Rückgabe</th>
          <th>Gebuchtes Inventar</th>
        </tr>
        </thead>
        <tbody>
        {tableRows}
        </tbody>
      </Table>
    </div>
  )
}

export default Bookings
