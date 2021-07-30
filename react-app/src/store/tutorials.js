const SET_TUTORIALS = 'tutorials/SET_TUTORIALS';
const SET_ONE_TUTORIAL = 'tutorials/SET_ONE_TUTORIAL';

const setTutorials = (tutorials) => ({
  type: SET_TUTORIALS,
  tutorials
});

const setOneTutorial = (tutorial) => ({
  type: SET_ONE_TUTORIAL,
  tutorial
});

const updateTutorial = (tutorial) => ({
  type: SET_ONE_TUTORIAL,
  tutorial
})

export const getTutorials = () => async (dispatch) => {
  const res = await fetch('/api/tutorials');

  if (res.ok) {
    const data = await res.json();
    dispatch(setTutorials(data.tutorials))
    return data;
  }
}

export const getOneTutorial = (id) => async (dispatch) => {
  const res = await fetch(`/api/tutorials/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(setOneTutorial(data));
    return data;
  }
}

export const editTutorial = (tutorial) => async (dispatch) => {
  const res = await fetch(`api/tutorials/${tutorial.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tutorial)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(updateTutorial(data));
    return data;
  }
}

const initialState = {};

const tutorialsReducer = (state = initialState, action) => {
  let newObj = {};
  switch (action.type) {
    case SET_TUTORIALS:
      action.tutorials.forEach(tutorial => {
        newObj[tutorial.id] = tutorial
      });
      return newObj;
      case SET_ONE_TUTORIAL:
        return {
          ...state,
          [action.tutorial.id]: action.tutorial
        }
    default:
      return state;
  }
}

export default tutorialsReducer;
