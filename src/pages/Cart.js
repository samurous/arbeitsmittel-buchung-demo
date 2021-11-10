import {useContext, useEffect, useState} from "react";
import {DataContext} from "../context/Data";
import CartForm from "../components/UI/CartForm";

function Cart() {
  const {augmentedItems, cart, deleteItemFromCart, addBooking} = useContext(DataContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(
      augmentedItems.filter(item => (cart.itemIds.indexOf(item.id) > -1))
    );
  }, [cart, augmentedItems])

  const onAddBooking = (formValues) => {
    addBooking({...formValues, itemIds: cart.itemIds})
  }

  return (
    <div>
      <h1>Warenkorb</h1>
      {
        cart.itemIds.length > 0
        ? <CartForm items={cartItems} onAddBooking={onAddBooking} onDeleteItem={deleteItemFromCart}/>
        : <p>Keine Inventargegenstände im Warenkorb.</p>
      }
    </div>
  )
}

export default Cart
