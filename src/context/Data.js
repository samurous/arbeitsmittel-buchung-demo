import {createContext, useEffect, useState} from "react";
import config from "../appConfig.json";
import dayjs from "dayjs";
import {dateIsBetween} from "../helper/dates";
import {useNotifications} from "@mantine/notifications";

const DataContext = createContext();

function DataProvider(props) {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState({start: '', end: '', itemIds: []});
  const [bookings, setBookings] = useState([]);
  const [augmentedItems, setAugmentedItems] = useState([]);
  const notifications = useNotifications();

  const fetchAPI = async (resource) => {
    const response = await fetch(`${config.BACKEND_URL}/${resource}`)

    if (response.ok) {
      return await response.json()
    } else {
      throw response.statusText
    }
  }

  const callAPI = async (resource, data, method) => {
    const response = await fetch(`${config.BACKEND_URL}/${resource}`, {
      method: method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      return await response.json()
    } else {
      throw response.statusText
    }
  }

  const addItemToCart = async (itemId) => {
    callAPI(
      'cart',
      {...cart, itemIds: [...cart.itemIds, itemId]},
      "PUT"
    ).then(result => {
      setCart(result)
      notifications.showNotification({title: "Inventar zu Warenkorb hinzugefügt."})
    }).catch(e => {
      notifyConnectionError(e.toString())
    });
  }

  const deleteItemFromCart = async (itemId) => {
    callAPI(
      'cart',
      {...cart, itemIds: cart.itemIds.filter(id => id !== itemId)},
      "PUT"
    ).then(result => {
      setCart(result);
      notifications.showNotification({title: "Inventar entfernt."})
    }).catch(e => {
      notifyConnectionError(e.toString())
    });
  }

  const emptyCart = async () => {
    callAPI(
      'cart',
      {...cart, itemIds: []},
      'POST'
    ).then(result => {
      setCart(result);
      notifications.showNotification({title: "Warenkorb geleert."})
    }).catch(e => {
      notifyConnectionError(e.toString())
    });
  }

  const addItemToInventory = async (item) => {
    callAPI(
      'items',
      item,
      'POST'
    ).then(result => {
      setItems([...items, result])
      notifications.showNotification({title: `${result.name} in Inventar aufgenommen.`})
    }).catch(e => {
      notifyConnectionError(e.toString())
    });
  }

  const addBooking = async (booking) => {
    callAPI(
      'bookings',
      booking,
      'POST'
    ).then(result =>  {
      setBookings([...bookings, result])
      notifications.showNotification({title: "Buchung aufgenommen."})
      emptyCart()
    }).catch(e => {
      notifyConnectionError(e.toString())
    });
  }

  function notifyConnectionError(msg) {
    notifications.showNotification(
      {title: "Verbindung zum Backend fehlgeschlagen", message: msg, color: "red"}
    )
  }

  useEffect(() => {  // Load data from backend
    Promise.all([
      fetchAPI('cart'),
      fetchAPI('items'),
      fetchAPI('bookings')
    ]).then(([cart, items, bookings]) => {
      setCart(cart)
      setItems(items)
      setBookings(bookings)
    }).catch((e) => {
      notifyConnectionError(e.toString())
    });
  }, []);

  useEffect(() => {  // Join bookings and items into augmentedItems.
    let result = items.map((item) => ({...item, status: 'frei', bookings: [], lendPeriods: []}))

    for (const booking of bookings) {
      for (const itemId of booking.itemIds) {
        const idx = result.findIndex(x => x.id === itemId);
        if (idx >= 0) {
          result[idx].bookings.push(booking.id)
          const start = dayjs(booking.start)
          const end = dayjs(booking.end)
          result[idx].lendPeriods.push({start: start, end: end})
          if (dateIsBetween(dayjs(), start, end)) {
            result[idx].status = "ausgeliehen"
          }
        }
      }
    }

    setAugmentedItems(result)
  }, [items, bookings]);

  return (
    <DataContext.Provider value={{
      cart,
      items,
      bookings,
      augmentedItems,
      addItemToInventory,
      addItemToCart,
      deleteItemFromCart,
      addBooking
    }}>
      {props.children}
    </DataContext.Provider>
  )
}

export {DataProvider, DataContext}
