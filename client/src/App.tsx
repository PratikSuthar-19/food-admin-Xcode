import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import Layout from "./components/ui/Layout";
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/UsersList";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";

import CategoriesList from "./pages/CategoriesList";
import CreateCategory from "./pages/CreateCategory";
import EditCategory from "./pages/EditCategory";

import ProductList from "./pages/ProductsLits";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

import OrderList from "./pages/OrderList";
import OrderForm from "./components/ui/OrderForm";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected/Main Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/users" element={<UsersList />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />


          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/categories/create" element={<CreateCategory />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />

          <Route path="/products" element={<ProductList />} />
         <Route path="/products/create" element={<CreateProduct />} />
         <Route path="/products/edit/:id" element={<EditProduct />} />

         <Route path="/orders" element={<OrderList />} />
         <Route path="/orders/create" element={<OrderForm />} />

        </Route>
      </Routes>
    </Router>
  );
}




