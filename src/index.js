import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import style from '../styles/style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: ['kale', 'squash', 'tomato', 'okra', 'chard'],
      quantity: [42, 10, 10, 4, 16],
      price: [2, 0.5, 1.50, 2, 1],
      strPrice: ['$2.00', '$0.50', '$1.50', '$2.00', '$1.00'],
      total: 0,
      basket: [],
      onhand: [],
      apiRes: '',
      inventoryList: [],
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.checkInventory = this.checkInventory.bind(this);

  }

  callAPI() {
    fetch("http://localhost:3000/inv")
      .then(res => res.json())
      .then(res => {
        console.log('response', res[0])
        this.setState({ apiRes: res})
        console.log('apiRes:', this.state.apiRes)
      })
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
    console.log('called API');
  }

  handleClick(ind) {
    // console.log('clicked', this.state.product[ind]);
    if (this.state.quantity[ind] > 0) {
      
      const newBasket = JSON.parse(JSON.stringify(this.state.basket));
      newBasket.push(this.state.product[ind]);
      
      const newQty = this.state.quantity;
      newQty[ind] -= 1;
      
      let newTotal = this.state.total + this.state.price[ind];
      
      this.setState((state) => {
        return {basket: newBasket, total: newTotal, quantity: newQty};
      });
    }
      
    return (
      <div>
        <h2>basket</h2>
        {/* <Basket text={this.state.basket[0]}></Basket>
        <Basket text={this.state.basket[1]}></Basket>
        <Basket text={this.state.basket[2]}></Basket> */}
      </div>
    )

  };

  checkInventory() {
    console.log(this.state.apiRes);
    for(let i = 0; i < this.state.apiRes.length; i++) {
      this.state.onhand.push(<Stockroom id={i} text={`${this.state.apiRes[i].product}: ${this.state.apiRes[i].quantity}`}></Stockroom>)
    }
  };

  render() {
    return (
      <div>
        <h1>market harvest</h1>
        <Harvest className='harvest' total={this.state.total} handleClick={this.handleClick} checkInventory={this.checkInventory} product={this.state.product} onhand={this.state.onhand} basket={this.state.basket} price={this.state.price} strPrice={this.state.strPrice}></Harvest>
      </div>
    );
  }
}

class Harvest extends Component {
  constructor(props) {
    super(props);
    // this.checkInventory = this.checkInventory.bind(this);

  }


  render() {
    const items = [];
    for (let i = 0; i < this.props.product.length; i++) {
      items.push(<Item key={i} index={i} text={this.props.product[i]} price={this.props.strPrice[i]} handleClick={this.props.handleClick}></Item>);
    }

    const basketReceipt = [];
    for (let i = 0; i < 20; i++) {
      basketReceipt.push(<Basket key={i} text={this.props.basket[i]}></Basket>);
    }
    
    const inventoryList = []
    for (let i = 0; i < this.props.onhand.length; i++) {
      inventoryList.push(<Stockroom key={i} text={`${this.props.apiRes[i][product]}: ${this.props.apiRes[i][quantity]}`}></Stockroom>)
    }

    return (
      <div>
        {items}
        <Inventory checkInventory={this.props.checkInventory}></Inventory>
        {inventoryList}
        <h2>basket</h2>
        <h4>{`$${this.props.total}`}</h4>
        {basketReceipt}
      </div>
    )

  }
}



class Item extends Component {
  render() {
    return (
      <button className="item" onClick={() => this.props.handleClick(this.props.index)} product={this.props.product} style={{boxShadow: '1px 2px #379683', height:'110px', width:'175px', margin:'20px'}}>
        <h3>{this.props.text}</h3>
        <p>{this.props.price}</p>
      </button>
    );
  }
} 



class Basket extends Component {
  render() {
    return (
      <div>
          <button className="basketButton" style={{color: '#edf5e1', backgroundColor:'#5cdb95', height:'20px', width:'100px'}}>{this.props.text}</button>
      </div>
    );
  }
}

class Inventory extends Component {
  render() {
    return (
      <div>
        <button className="inventory" onClick={() => this.props.checkInventory()} style={{margin: '20px 0 0 0', background: '#379683', width: '300px', height: '50px'}}>check inventory</button>
      </div>
    );
  }
}

class Stockroom extends Component {
  render() {
    return (
      <ul>
        <li>{this.props.onhand}</li>
        <li className="stockroom" style={{listStyleType: 'none'}}>{this.props.text}</li>
      </ul>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// render(<App/>, document.getElementById('root'));