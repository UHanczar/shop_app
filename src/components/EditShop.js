import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editShop, addEditShopItem, removeEditShopItem, addshopItem, removeEditingShop } from './../actions/actionCreators';
import Header from './Header';

class EditShop extends Component {
  constructor(props) {
    super(props);

    this.handleEditShop = this.handleEditShop.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleAddShopItem = this.handleAddShopItem.bind(this);
  }

  componentDidMount() {
    this.shopName.value = this.props.shopEditing.shopName;
    this.shopAddress.value = this.props.shopEditing.shopAddress;
    this.shopWorkingHours.value = this.props.shopEditing.workingHours;
  }
  
  handleEditShop() {
    const editedShop = {
      shopID: this.props.shopEditing.shopID,
      shopName: this.shopName.value,
      shopAddress: this.shopAddress.value,
      workingHours: this.shopWorkingHours.value,
      shopItemsList: this.props.shopEditing.shopItemsList
    };

    this.shopName.value = '';
    this.shopAddress.value = '';
    this.shopWorkingHours.value = '';

    this.props.startEditShop(editedShop);
    this.props.clearShopEditing();
    this.context.router.history.push(`/${editedShop.shopName}`);
  }
  
  handleAddShopItem() {
    const newShopItem = {
      shopItemName: this.shopItemName.value,
      shopItemDescription: this.shopItemDescription.value
    };

    this.shopItemName.value = '';
    this.shopItemDescription.value = '';
    console.log(newShopItem);
    this.props.startAddEditedShopItem(newShopItem);
  }
  
  handleRemoveItem(item) {
    console.log(item);
    this.props.handleEditShopItems(item);
  }

  render() {

    return (
      <div>
        <Header />
        
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='row'>
                <div className='col-xs-6'>
                  <h3>Shops</h3>
                </div>
                <div className='col-xs-6 text-right'>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleEditShop}
                  >
                  Save Changes</button>
                </div>
              </div>
              <hr />
            </div>
          </div>

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
                  <label htmlFor="shop-working-hours">Shop Address</label>
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
                        <input className="form-control" id="item-name" type='text' placeholder='Enter item Name' ref={name => this.shopItemName = name} required />
                      </div>
                      <div className="form-group">
                        <textarea id="item-decription" className="form-control col-xs-12" placeholder='Enter Item Description'ref={name => this.shopItemDescription = name} required ></textarea>
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
                        <td>№</td>
                        <td>Item Name</td>
                        <td>Item Description</td>
                        <td>Edit</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Array.isArray(this.props.shopEditing.shopItemsList) ?
                        this.props.shopEditing.shopItemsList.map((item, i) => (
                          <tr key={item.shopItemName}>
                            <td className="col-xs-1">{i+=1}</td>
                            <td className="col-xs-3">{item.shopItemName}</td>
                            <td className="col-xs-7">{item.shopItemDescription}</td>
                            <td className="col-xs-2"><button type="button" className="btn btn-danger btn-xs" onClick={() => this.handleRemoveItem(item.shopItemName)}>Remove</button></td>
                          </tr>))
                    :
                        <tr><td className='col-xs-12'>There is no items</td></tr>
                    }
                      {/* {this.props.shopEditing.shopItems.map((item, i) => (
                        <tr key={item.shopItemName}>
                          <td className="col-xs-1">{i}</td>
                          <td className="col-xs-3">{item.shopItemName}</td>
                          <td className="col-xs-7">{item.shopItemDescription}</td>
                          <td className="col-xs-2"><button type="button" className="btn btn-danger btn-xs" onClick={() => this.handleRemoveItem(item.shopItemName)}>Remove</button></td>
                        </tr>))} */}
                    </tbody>
                  </table>
                
              </div>
          </div>
        </div>
        
        
        
        
        
        {/* <input type='text' placeholder='Enter shop Name' ref={name => this.shopName = name} />
        <input type='text' placeholder='Enter shop Adress' ref={adress => this.shopAddress = adress} />
        <input type='text' placeholder='Enter shop working hours' ref={workingHours => this.shopWorkingHours = workingHours} />
        <button type="button" className="btn btn-primary" onClick={this.handleEditShop}>Edit Shop</button> */}
      </div>
    );
  }
}

EditShop.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    // shopList: state.handleShopList,
    shopEditing: state.handleShopList.shopEditing
  };
};

const mapDispatchToProps = dispatch => ({
  startEditShop(val) {
    console.log(val);
    dispatch(editShop(val));
  },
  startAddEditedShopItem(val) {
    console.log(val);
    dispatch(addEditShopItem(val));
  },
  handleEditShopItems(val) {
    dispatch(removeEditShopItem(val));
  },
  clearShopEditing() {
    dispatch(removeEditingShop());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditShop);
