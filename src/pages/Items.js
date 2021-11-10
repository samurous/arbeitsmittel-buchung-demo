import {useContext, useState} from "react";
import {Button, Modal, Table, ActionIcon} from "@mantine/core";
import {FaCalendarPlus, FaPlusSquare} from "react-icons/fa";
import NewItemForm from "../components/UI/NewItemForm";
import {DataContext} from "../context/Data";

function ItemTableRow({item, cart, onAddToCart}) {
  const isInCart = cart.itemIds.indexOf(item.id) > -1;

  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.desc}</td>
      <td>{item.status}</td>
      <td>{item.bookings.length}</td>
      <td>
        <ActionIcon
          disabled={isInCart}
          onClick={() => (onAddToCart(item.id))}
          variant="outline"
          color="green"
        >
          <FaCalendarPlus />
        </ActionIcon>
      </td>
    </tr>
  )
}

function NewItemModal({opened, setOpened}) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Inventar hinzufügen"
      >
        <NewItemForm submitCallback={() => setOpened(false)}/>
      </Modal>
    </>
  )
}

function Items() {
  const {cart, augmentedItems, addItemToCart} = useContext(DataContext);
  const [modalOpen, setModalOpen] = useState(false);

  const tableRows = augmentedItems.map(
    (item, idx) => (<ItemTableRow key={idx} item={item} cart={cart} onAddToCart={addItemToCart}/>)
  );

  const onAddNewItem = () => {
    setModalOpen(true);
  }

  return (
    <>
      <h1>
        Inventar
        <Button onClick={onAddNewItem} style={{float: 'right'}} leftIcon={<FaPlusSquare/>}>
          Hinzufügen
        </Button>
      </h1>
      <Table striped highlightOnHover>
        <thead>
        <tr>
          <th>Name</th>
          <th>Beschreibung</th>
          <th>Status</th>
          <th>Buchungen</th>
          <th>Buchen</th>
        </tr>
        </thead>
        <tbody>
        {tableRows}
        </tbody>
      </Table>
      <NewItemModal opened={modalOpen} setOpened={setModalOpen}/>
    </>
  )
}

export default Items
