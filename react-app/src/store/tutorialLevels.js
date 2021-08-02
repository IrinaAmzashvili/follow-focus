const SET_LEVELS = 'tutorialLevels/SET_LEVELS';

const setLevels = (levels) => ({
  type: SET_LEVELS,
  levels
});

export const getTutorialLevels = () => async (dispatch) => {
  const res = await fetch('/api/tutorial-levels/');

  if (res.ok) {
    const data = await res.json();
    dispatch(setLevels(data));
  }
}

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEVELS:
      return {
        ...action.levels
      }
    default:
      return state;
  }
}

export default reducer;
