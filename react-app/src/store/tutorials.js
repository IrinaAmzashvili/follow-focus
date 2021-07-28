const SET_TUTORIALS = 'tutorials/SET_TUTORIALS';

const setTutorials = (tutorials) => ({
  type: SET_TUTORIALS,
  tutorials
});

export const getTutorials = () => async (dispatch) => {
  const res = await fetch('/api/tutorials');

  if (res.ok) {
    const data = await res.json();
    console.log('--->', data)
    dispatch(setTutorials(data.tutorials))
    return res
  }
}

const initialState = {};

const tutorialsReducer = (state = initialState, action) => {
  let newObj;
  switch (action.type) {
    case SET_TUTORIALS:
      action.tutorials.forEach(tutorial => {
        newObj[tutorial.id] = tutorial
      });
      return newObj;
    default:
      return state;
  }
}

export default tutorialsReducer;
