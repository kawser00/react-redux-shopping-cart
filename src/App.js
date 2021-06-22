import React, { Component } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
export default class App extends Component {
  constructor(props) {
    super(props);
    
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
    this.state = {
      cartItems: itemsFromLocalStorage ? itemsFromLocalStorage : [],
      size: "",
      sort: "",
    };
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems;
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeFromCart = (id) => {
    const updatedCartItems = this.state.cartItems.filter((x) => x._id !== id);
    this.setState({ cartItems: updatedCartItems });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  createOrder = (order) => {
    alert("Need to save for" + order.name);
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                removeFromCart={this.removeFromCart}
                cartItems={this.state.cartItems}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}
