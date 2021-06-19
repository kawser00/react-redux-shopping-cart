import React, { Component } from "react";
import formatCurrency from "../util";

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems
    }
    this.props.createOrder(order)
  }

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        <div className="cart cart--header">
          {cartItems.length === 0 ? (
            "Cart is empty"
          ) : (
            <>You have {cartItems.length} in the cart </>
          )}
        </div>
        <div className="cart">
          <ul className="cart__items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <button
                      className="button"
                      onClick={() => this.props.removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length !== 0 && (
          <>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                  {/* reduce(accumulator, currentValue) => accumulator(total/result) + currentValue.price * currentValue.count, then if not have any value, return default value 0 */}
                </div>
                <button
                  onClick={() => this.setState({ showCheckout: true })}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            {this.state.showCheckout && (
              <div className="cart">
                <form onSubmit={this.createOrder}>
                  <ul className="form-container">
                    <li>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={this.handleInput}
                        required
                      />
                    </li>
                    <li>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={this.handleInput}
                        required
                      />
                    </li>
                    <li>
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={this.handleInput}
                        required
                      />
                    </li>
                    <li>
                      <button type="submit" className="button primary">Checkout</button>
                    </li>
                  </ul>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
