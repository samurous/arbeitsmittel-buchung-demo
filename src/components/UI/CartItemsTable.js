import {ActionIcon, Table} from "@mantine/core";
import {FaCalendarMinus} from "react-icons/fa";

function CartItemTableRow({item, onDeleteItem}) {
    return (
      <tr>
          <td>{item.name}</td>
          <td>{item.desc}</td>
          <td>
              <ActionIcon onClick={() => (onDeleteItem(item.id))} variant="outline" color="red">
                  <FaCalendarMinus />
              </ActionIcon>
          </td>
      </tr>
    )
}

function CartItemsTable({items, onDelete}) {
    const cartItemsTableRows = items.map(item => (
      <CartItemTableRow key={item.id} item={item} onDeleteItem={onDelete}/>)
    )

    return (
      <Table striped highlightOnHover>
          <thead>
          <tr>
              <th>Name</th>
              <th>Beschreibung</th>
              <th>Entfernen</th>
          </tr>
          </thead>
          <tbody>
          {cartItemsTableRows}
          </tbody>
      </Table>
    )
}

export default CartItemsTable
