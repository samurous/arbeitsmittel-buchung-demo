import {Route, Routes} from "react-router-dom";
import Bookings from "./pages/Bookings";
import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import Layout from "./components/layout/Layout";
import Cart from "./pages/Cart";
import {DataProvider} from "./context/Data";
import { NotificationsProvider } from '@mantine/notifications';


function App() {
  return (
    <NotificationsProvider>
      <DataProvider>
          <Layout>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/items' element={<Items />} />
              <Route path='/bookings' element={<Bookings />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </Layout>
      </DataProvider>
    </NotificationsProvider>
  );
}

export default App;
