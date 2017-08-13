import { ADD_INITIAL_SHOP_LIST, ADD_SHOP, SHOW_DATA_FOR_EDITING, EDIT_SHOP, ADD_EDIT_SHOP_ITEM, REMOVE_EDIT_SHOP_ITEM, SHOP_DETAILS, REMOVE_EDITING_SHOP, ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM } from './actions';

export const addInitialShopList = (shopList) => {
  return {
    type: ADD_INITIAL_SHOP_LIST,
    payload: shopList
  };
};

export const addShop = (shop) => {
  return {
    type: ADD_SHOP,
    payload: shop
  };
};

export const showDataForEditing = (shop) => {
  return {
    type: SHOW_DATA_FOR_EDITING,
    payload: shop
  };
};

export const editShop = (shop) => {
  return {
    type: EDIT_SHOP,
    payload: shop
  };
};

export const addEditShopItem = (item) => {
  return {
    type: ADD_EDIT_SHOP_ITEM,
    payload: item
  };
};

export const removeEditShopItem = (item) => {
  return {
    type: REMOVE_EDIT_SHOP_ITEM,
    payload: item
  };
};

export const removeEditingShop = () => {
  return {
    type: REMOVE_EDITING_SHOP
  };
}

export const shopDetails = (shop) => {
  return {
    type: SHOP_DETAILS,
    payload: shop
  };
};

// shop Items
export const addshopItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};

export const removeShopItem = (item) => {
  return {
    type: REMOVE_ITEM,
    payload: item
  };
};

export const clearShopItem = () => {
  return {
    type: CLEAR_ITEM
  };
};
