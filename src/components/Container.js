import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SortablePane, Pane } from 'react-sortable-pane';

import { removeShop } from './../actions/actionCreators';

import Header from './Header';

class Container extends Component {
  constructor(props) {
    super(props);

    this.createNewShop = this.createNewShop.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.onHandleRemoveShop = this.onHandleRemoveShop.bind(this);
  }

  createNewShop() {
    this.context.router.history.push('/newshop');
  }

  showDetails(val) {
    const shop = this.props.shopList.filter(shop => shop.shopName === val)[0];
    this.context.router.history.push(`/${val}`);
  }
  
  onHandleRemoveShop(shopId) {
    this.props.handleRemoveShop(shopId);
  }

  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12'>
              <h2>Shop List</h2>
              <button
                type='button'
                className='btn btn-primary'
                onClick={this.createNewShop}
              >Add Shop</button>
              <hr />
            </div>
          </div>
          <div className='row'>
            {this.props.shopList.map(shop =>
              <div className='col-sm-6 col-md-4' key={shop.shopID}>
                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <strong>{shop.shopName}</strong>
                    <button type="button" className='btn btn-link btn-xs pull-right' onClick={() => this.onHandleRemoveShop(shop.shopID
                    )}>Remove</button>
                  </div>
                  <div className='panel-body'>
                    <p>{shop.shopAddress}</p>
                    <p><strong>{shop.workingHours}</strong></p>
                    <button
                      type='button'
                      className='btn btn-success btn-sm'
                      onClick={() => this.showDetails(shop.shopName)}
                    >Check out Details</button>
                  </div>
                </div>
              </div>)
            }
          </div>
        </div>
      </div>
    );
  }
}

Container.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    shopList: state.handleShopList.shopList,
    shop: state.handleShopList.shop
  };
};

const mapDispatchToProps = dispatch => ({
  handleRemoveShop(val) {
    dispatch(removeShop(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
