const SET_TIERS = 'tiers/SET_TIERS';

const setTiers = (tiers) => ({
  type: SET_TIERS,
  tiers
});

export const getTiers = () => async (dispatch) => {
  const res = await fetch('/api/tiers');

  if (res.ok) {
    const data = await res.json();
    dispatch(setTiers(data));
  }
}

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIERS:
      return {
        ...action.tiers
      }
    default:
      return state;
  }
}

export default reducer;
