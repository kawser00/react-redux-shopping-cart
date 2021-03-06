import React, { Component } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
export default class App extends Component {
  constructor(props) {
    super(props);

    //make all products by latest order(higher _id that means add product that add at last will appear always in top)
    const allProducts = data.products;
    const latestOrder = allProducts.sort((a, b) => (a._id < b._id ? 1 : -1));
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem('cartItems'));

    this.state = {
      products: latestOrder,
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
    alert('Need to save for' + order.name)
  }

  sortProducts = (e) => {
    const sort = e.target.value;
    this.setState({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price - b.price
            : sort === "highest"
            ? b.price - a.price
            : a._id < b._id
            ? 1
            : -1
        ),

      //another way

      // .sort((a, b) =>
      //   sort === "lowest"
      //     ? a.price > b.price
      //     ? 1 : -1
      //     : sort === "highest"
      //     ? a.price < b.price
      //     ? 1 : -1
      //     : a._id < b._id
      //     ? 1
      //     : -1
      // ),
    });

    // a = 1st val, b = 2nd val...
    // +1 = return accept and -1 = return reject
    // a - b means lowest to highest
    // b - a means highest to lowest
  };

  filterProducts = (e) => {
    const sizeVal = e.target.value;

    if (sizeVal === "") {
      this.setState({
        size: sizeVal,
        products: data.products,
      });
    } else {
      this.setState({
        size: sizeVal,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(sizeVal) >= 0
        ),
      });
    }

    // if sizeVal == "" then size in state should be sizeVal and products: should be all products,

    // else if, sizeVal exist then for products it should be filtered,

    // all product(data.products) ke filter korle je single product paoya jabe setar moddhe availableSizes er moddhe e.target theke je size paoya geche setar index melate hobe ache kina, jodi thake tahole tar index 0 or 0 er theke beshi kono ekta hobe, tarpor seta return kore products er moddhe rakhbe.
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
              <Filter
                count={this.state.products.length}
                filterProducts={this.filterProducts}
                size={this.state.size}
                sort={this.state.sort}
                sortProducts={this.sortProducts}
              />
              <Products
                addToCart={this.addToCart}
                products={this.state.products}
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
