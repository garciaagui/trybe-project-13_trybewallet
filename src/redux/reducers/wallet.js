import {
  SAVE_WALLET_INFO,
  REQUEST_CURRENCIES,
  GET_CURRENCIES,
  // FAILED_REQUEST,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_WALLET_INFO:
    return {
      ...state,
      ...action.payload,
    };
  case REQUEST_CURRENCIES:
    return {
      ...state,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      // currencies: [...state.currencies, action.payload],
      currencies: Object.keys(action.payload).filter((key) => key !== 'USDT'),
    };
  // case FAILED_REQUEST:
  //   return {
  //     ...state,
  //   };
  default:
    return state;
  }
};

export default walletReducer;
