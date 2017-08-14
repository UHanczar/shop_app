import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/style.scss';

import store from './store/store';
import { setShopList, getShopList } from './helpers/helpers';
import { addInitialShopList } from './actions/actionCreators';

import Container from './components/Container';
import NewShop from './components/NewShop';
import EditShop from './components/EditShop'
import ShopDetails from './components/ShopDetails';

store.subscribe(() => {
  const state = store.getState();
  console.log('New State', state);
  setShopList(state.handleShopList.shopList);
});

const initialShopList = getShopList();
store.dispatch(addInitialShopList(initialShopList));
console.log(initialShopList);

ReactDOM.render(
  <BrowserRouter history={history}>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Container} />
        <Route path='/newshop' component={NewShop} />
        <Route path='/editshop' component={EditShop} />
        <Route path='/:id' component={ShopDetails} />
      </Switch>
    </Provider>
  </BrowserRouter>, document.getElementById('root'));
