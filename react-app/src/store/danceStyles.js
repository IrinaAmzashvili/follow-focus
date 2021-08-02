const SET_STYLES = 'danceStyles/SET_STYLES';

const setStyles = (styles) => ({
  type: SET_STYLES,
  styles
});

export const getDanceStyles = () => async (dispatch) => {
  const res = await fetch('/api/dance-styles/');

  if (res.ok) {
    const data = await res.json();
    dispatch(setStyles(data));
  }
}

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STYLES:
      return {
        ...action.styles
      }
    default:
      return state;
  }
}

export default reducer;
