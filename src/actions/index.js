export const SAVE_EMAIL = 'SAVE_EMAIL';
export const API_FETCH = 'API_FETCH';
export const API_FETCH_SUCCESS = 'API_FETCH_SUCCESS';
export const SUBMIT_STATE = 'SUBMIT_STATE';
export const CLEAR_EXPENSE = 'CLEAR_EXPENSE';
// Coloque aqui suas actions
export const user = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const submitState = (payload) => ({
  type: SUBMIT_STATE,
  payload,
});

export const clearAction = (id) => ({
  type: CLEAR_EXPENSE,
  id,
});

// essa parte foi feita com ajuda de meus colegas Marcos Siqueira e Erick Silva
export function fetchCurrent(state) {
  return async (dispatch) => {
    const fetchApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await fetchApi.json();
    const exchange = { exchangeRates: response };
    Object.assign(state, exchange);
    dispatch(submitState(state));
  };
}
