import {
  REQUEST_CURRENCIES,
  GET_CURRENCIES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  APPLY_EDITION,
  // FAILED_REQUEST,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  exchangeRates: {},
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload),
      exchangeRates: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  // case FAILED_REQUEST:
  //   return {
  //     ...state,
  //   };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case APPLY_EDITION:
    return {
      ...state,
      editor: false,
      expenses: state.expenses.reduce((acc, curr) => {
        if (curr.id === action.payload.id) acc.push(action.payload);
        else acc.push(curr);
        return acc;
      }, []),
    };
  default:
    return state;
  }
};

export default walletReducer;
