import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addShop, addshopItem, removeShopItem, clearShopItem } from './../actions/actionCreators';
import Header from './Header';

class NewShop extends Component {
  constructor(props) {
    super(props);

    this.handleAddShop = this.handleAddShop.bind(this);
    this.handleAddShopItem = this.handleAddShopItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleAddShop() {
    const newShop = {
      shopID: Date.now(),
      shopName: this.shopName.value,
      shopAddress: this.shopAddress.value,
      workingHours: this.shopWorkingHours.value,
      shopItemsList: this.props.shopItems
    };

    this.shopName.value = '';
    this.shopAddress.value = '';
    this.shopWorkingHours.value = '';
    
    this.props.startAddShop(newShop);
    this.props.clearShopItems();

    this.context.router.history.push(`/${newShop.shopName}`);
  }

  handleAddShopItem() {
    const newShopItem = {
      shopItemName: this.itemName.value,
      shopItemDescription: this.itemDescription.value
    };

    this.itemName.value = '';
    this.itemDescription.value = '';
    this.props.startAddShopItem(newShopItem);
  }

  handleRemoveItem(item) {
    this.props.removeShopItems(item);
  }

  render() {

    return (
      <div>
        <Header />
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
                <h3>Create New Shop</h3>
            </div>
            <div className='col-xs-12'>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleAddShop}
              >Add Shop</button>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-sm-12 col-md-6'>
              <form>
                <div className="form-group">
                  <label htmlFor="shop-name">Shop Name</label>
                  <input className="form-control" id="shop-name" type='text' placeholder='Enter shop Name' ref={name => this.shopName = name} required />
                </div>
                <div className="form-group">
                  <label htmlFor="shop-address">Shop Address</label>
                  <input className="form-control" id="shop-address" type='text' placeholder='Enter shop Adress' ref={adress => this.shopAddress = adress} required />
                </div>
                <div className="form-group">
                  <label htmlFor="shop-working-hours">Shop Working Hours</label>
                  <input className="form-control" id="shop-working-hours" type='text' placeholder='Enter shop working hours' ref={workingHours => this.shopWorkingHours = workingHours} required />
                </div>
              </form>
              <hr />
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='row'>
                    <div className='col-xs-6'>
                      <h3>Add Shop Items</h3>
                    </div>
                    <div className='col-xs-6 text-right'>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.handleAddShopItem}
                      >Add Shop Item </button>
                    </div>
                  </div>
                  <hr />

                  <form>
                    <div className="form-group">
                      <label htmlFor="item-name">Item Name</label>
                      <input className="form-control" id="item-name" type='text' placeholder='Enter item Name' ref={name => this.itemName = name} required />
                    </div>
                    <div className="form-group">
                      <textarea id="item-decription" className="form-control col-xs-12" placeholder='Enter Item Description'ref={name => this.itemDescription = name} required ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className='row'>
              <div className='col-xs-12'>
                <h4>Shop Items</h4>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Item Name</th>
                        <th>Item Description</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.shopItems.map((item, i) => (
                        <tr key={item.shopItemName}>
                          <td className="col-xs-1">{i+=1}</td>
                          <td className="col-xs-3">{item.shopItemName}</td>
                          <td className="col-xs-7">{item.shopItemDescription}</td>
                          <td className="col-xs-2"><button type="button" className="btn btn-danger btn-xs" onClick={() => this.handleRemoveItem(item.shopItemName)}>Remove</button></td>
                        </tr>))}
                    </tbody>
                  </table>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

NewShop.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    shopEditing: state.handleShopList.shopEditing,
    shopItems: state.handleShopList.shopItems
  };
};

const mapDispatchToProps = dispatch => ({
  startAddShop(val) {
    dispatch(addShop(val));
  },
  startAddShopItem(val) {
    dispatch(addshopItem(val));
  },
  removeShopItems(val) {
    dispatch(removeShopItem(val));
  },
  clearShopItems() {
    dispatch(clearShopItem());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewShop);