import ls from 'local-storage';

export const fahrenheitToCelcius = f => (f - 30) / 2;

const key = "locations";

export const createLocationStore = (data) => {
  if (ls.get(key)) {
    // store already exists, should be updating
    return;
  } else {
    ls.set(key, JSON.stringify([data]));
  }
};

export const loadLocationStore = () => {
  if (ls.get(key)) {
    // store already exists, should be updating
    return JSON.parse(ls.get(key));
  } else {
    return;
  }
};


// pulls down the store and appends an item to it
export const appendToLocationStore = (data) => {
  if (!ls.get(key)) {
    // store doesn't exist, create it
    createLocationStore(data);
  } else {
    const array = JSON.parse(ls.get(key));
    if (array.some(x => x.city === data.city && x.country === data.country)) {
      // no duplicates
      return;
    } else {
      array.push(data);
      ls.set(key, JSON.stringify(array));
    }
  }
};

// pulls down the store and removes an item from it
export const removeFromLocationStore = (data) => {
  if (!ls.get(key)) {
    // store doesn't exist, ignore
    return;
  } else {
    const array = JSON.parse(ls.get(key));
    array.splice(array.indexOf(data), 1);
    ls.set(key, JSON.stringify(array));
  }
};