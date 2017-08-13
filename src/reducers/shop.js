import { SHOP_DETAILS, REMOVE_EDITING_SHOP } from './../actions/actions';

const initialState = {
  shop: {},
  shopEditing: {}
};

export const handleShop = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_EDITING_SHOP:
      return Object.assign({}, state, { shopEditing: {} });
    case SHOP_DETAILS:
      return Object.assign({}, state, { shop: action.payload });
    default:
      return state;
  }
};