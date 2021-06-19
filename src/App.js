import React, { Component } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
export default class App extends Component {
  constructor(props) {
    super(props);

    //make all products by latest order(higher _id that means add product that add at last will appear always in top)
    const allProducts = data.products;
    const latestOrder = allProducts.sort((a, b) => (a._id < b._id ? 1 : -1));

    this.state = {
      products: latestOrder,
      size: "",
      sort: "",
    };
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
    // +1 = accept and -1 = reject
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
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart Details</div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}
