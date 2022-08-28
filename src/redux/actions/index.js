export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SAVE_WALLET_INFO = 'SAVE_WALLET_INFO';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const saveUserInfoAction = (payload) => ({
  type: SAVE_USER_INFO,
  payload,
});

export const saveWalletInfoAction = (payload) => ({
  type: SAVE_WALLET_INFO,
  payload,
});

export const requestCurrenciesAction = () => ({
  type: REQUEST_CURRENCIES,
});

export const getCurrenciesAction = (json) => ({
  type: GET_CURRENCIES,
  payload: json,
});

// export const failedRequest = (error) => ({
//   type: FAILED_REQUEST,
//   payload: error,
// });

export const fetchCurrencies = () => (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  dispatch(requestCurrenciesAction());
  return fetch(URL)
    .then((response) => response.json())
    .then((currencies) => {
      dispatch(getCurrenciesAction(currencies));
    });
};
