export const setShopList = (shops) => {
  if (Array.isArray(shops)) {
    localStorage.setItem('shopList', JSON.stringify(shops));
    return shops;
  }
};

export const getShopList = () => {
  const stringShops = localStorage.getItem('shopList');
  let shops = [];

  try {
    shops = JSON.parse(stringShops);
  } catch (e) {

  }

  return Array.isArray(shops) ? shops : [];
};
