export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const APPLY_EDITION = 'APPLY_EDITION';

export const saveUserInfoAction = (payload) => ({
  type: SAVE_USER_INFO,
  payload,
});

export const requestCurrenciesAction = () => ({
  type: REQUEST_CURRENCIES,
});

export const getCurrenciesAction = (json) => ({
  type: GET_CURRENCIES,
  payload: json,
});

export const addExpenseAction = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

// export const failedRequest = (error) => ({
//   type: FAILED_REQUEST,
//   payload: error,
// });

export const deleteExpenseAction = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const editExpenseAction = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const applyEditionAction = (payload) => ({
  type: APPLY_EDITION,
  payload,
});

export const fetchCurrencies = () => (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  dispatch(requestCurrenciesAction());
  return fetch(URL)
    .then((response) => response.json())
    .then((currencies) => {
      delete currencies.USDT;
      dispatch(getCurrenciesAction(currencies));
    });
};
