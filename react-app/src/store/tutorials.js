const SET_TUTORIALS = 'tutorials/SET_TUTORIALS';
const SET_ONE_TUTORIAL = 'tutorials/SET_ONE_TUTORIAL';
const UNLOAD_TUTORIALS = 'tutorials/UNLOAD_TUTORIALS';
const UNLOAD_CURRENT_TUTORIAL = 'tutorials/UNLOAD_CURRENT_TUTORIAL';

const setTutorials = (tutorials) => ({
  type: SET_TUTORIALS,
  tutorials
});

export const setOneTutorial = (tutorial) => ({
  type: SET_ONE_TUTORIAL,
  tutorial
});

const updateTutorial = (tutorial) => ({
  type: SET_ONE_TUTORIAL,
  tutorial
});

export const unloadTutorials = () => ({
  type: UNLOAD_TUTORIALS
});

export const unloadCurrentTutorial = () => ({
  type: UNLOAD_TUTORIALS
});

export const getTutorials = () => async (dispatch) => {
  const res = await fetch('/api/tutorials');

  if (res.ok) {
    const data = await res.json();
    dispatch(setTutorials(data))
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
  const res = await fetch(`/api/tutorials/${tutorial.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tutorial)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(updateTutorial(data));
    console.log(data)
    return data;
  }
}

const initialState = {
  all: {},
  current: null,
  loaded: false
};

const tutorialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TUTORIALS:
      return {
        ...state,
        all: {
          ...action.tutorials
        },
        loaded: true
      }
    case UNLOAD_TUTORIALS:
      return {
        ...initialState,
        all: {
          ...initialState.all
        }
      };
    case SET_ONE_TUTORIAL:
      return {
        ...state,
        current: action.tutorial,
        loaded: true
      }
    case UNLOAD_CURRENT_TUTORIAL:
      return {
        ...initialState,
        current: {
          ...initialState.current
        }
      }
    default:
      return state;
  }
}

export default tutorialsReducer;
