import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import { showDataForEditing, shopDetails } from './../actions/actionCreators';

import Header from './Header';

class ShopDetails extends Component {
  constructor(props) {
    super(props);

    this.editShop = this.editShop.bind(this);
  }

  editShop() {
    const shopID = this.props.match.params.id;
    const shop = this.props.shopList.filter(shop => shop.shopName === shopID)[0];
    this.props.handleEditShop(shop);
    this.context.router.history.push('/editshop');
  }

  componentWillMount() {
    const shopID = this.props.match.params.id;
    const shop = this.props.shopList.filter( shop => shop.shopName === shopID)[0];
    this.props.showShopDetails(shop);
  }

  render() {

    return (
      <div>
        <Header />
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='row'>
                <div className='col-xs-6'>
                  <h2>{this.props.shop.shopName}</h2>
                </div>
                <div className='col-xs-6 text-right'>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.editShop}
                  >Edit Shop</button>
                </div>
              </div>
              <hr />
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12'>{this.props.shop.shopAddress}</div>
            <div className='col-xs-12'>{this.props.shop.workingHours}</div>
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
                  </tr>
                </thead>
                <tbody>
                  {
                    Array.isArray(this.props.shop.shopItemsList) ?
                    this.props.shop.shopItemsList.map((item, i) => (
                      <tr key={item.shopItemName}>
                        <td className="col-xs-1">{i+=1}</td>
                        <td className="col-xs-3">{item.shopItemName}</td>
                        <td className="col-xs-7">{item.shopItemDescription}</td>
                      </tr>))
                :
                    <tr><td className='col-xs-12'>There is no items</td></tr>
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShopDetails.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    shopList: state.handleShopList.shopList,
    shop: state.handleShopList.shop
  };
};

const mapDispatchToProps = dispatch => ({
  showShopDetails(val) {
    dispatch(shopDetails(val));
  },
  handleEditShop(val) {
    dispatch(showDataForEditing(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetails);
