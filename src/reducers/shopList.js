import { ADD_INITIAL_SHOP_LIST, ADD_SHOP, SHOW_DATA_FOR_EDITING, EDIT_SHOP, ADD_EDIT_SHOP_ITEM, REMOVE_EDIT_SHOP_ITEM, REMOVE_EDITING_SHOP, SHOP_DETAILS, ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM } from './../actions/actions';

const initialState = {
  shopList: [],
  shop: {},
  shopEditing: {},
  shopItems: []
};

export const handleShopList = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SHOP:
      return Object.assign({}, state, { shopList: state.shopList.concat(action.payload) });
    case SHOW_DATA_FOR_EDITING:
      // console.log('aaaaaaa', action.payload);
      return Object.assign({}, state, { shopEditing: action.payload });
    case EDIT_SHOP:
      let newShopList = state.shopList.filter(shop => shop.shopID !== action.payload.shopID);
      newShopList = newShopList.concat(action.payload);
      return Object.assign({}, state, { shopList: newShopList });
    case ADD_EDIT_SHOP_ITEM:
      const checkEditItem = state.shopEditing.shopItemsList.filter(item => item.shopItemName === action.payload.shopItemName);
      if (!checkEditItem.length) {
        let newItemsList = state.shopEditing.shopItemsList.concat(action.payload);
        const list = state.shopEditing;
        const newEditing = Object.assign({}, list, { shopItemsList: newItemsList });
        return Object.assign({}, state, { shopEditing: newEditing });
      }
      return state;
    case REMOVE_EDIT_SHOP_ITEM: {
      const list = state.shopEditing;
      const newShopItems = state.shopEditing.shopItemsList.filter(item => item.shopItemName !== action.payload);
      const newEditing = Object.assign({}, list, { shopItemsList: newShopItems });
      console.log('newShopItems', newShopItems);
      return Object.assign({}, state, { shopEditing: newEditing });
    }
    case REMOVE_EDITING_SHOP:
      return Object.assign({}, state, { shopEditing: {} });
    case SHOP_DETAILS:
      return Object.assign({}, state, { shop: action.payload });
    case ADD_INITIAL_SHOP_LIST:
      return Object.assign({}, state, { shopList: action.payload });
    case ADD_ITEM:
      const checkItem = state.shopItems.filter(item => item.shopItemName === action.payload.shopItemName);
      if (!checkItem.length) {
        return Object.assign({}, state, { shopItems: state.shopItems.concat(action.payload) });
      }
    case REMOVE_ITEM:
      const newShopItems = state.shopItems.filter(item => item.shopItemName !== action.payload);
      return Object.assign({}, state, { shopItems: newShopItems });
    case CLEAR_ITEM:
      return Object.assign({}, state, { shopItems: [] });
    default:
      return state;
  }
};
