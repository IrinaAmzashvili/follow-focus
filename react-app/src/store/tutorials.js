const SET_TUTORIALS = 'tutorials/SET_TUTORIALS';
const SET_CURRENT_TUTORIAL = 'tutorials/SET_CURRENT_TUTORIAL';
const UNLOAD_TUTORIALS = 'tutorials/UNLOAD_TUTORIALS';
const UNLOAD_CURRENT_TUTORIAL = 'tutorials/UNLOAD_CURRENT_TUTORIAL';
// const REMOVE_TUTORIAL = 'tutorials/REMOVE_TUTORIAL';

const setTutorials = (tutorials) => ({
  type: SET_TUTORIALS,
  tutorials
});

export const setOneTutorial = (tutorial) => ({
  type: SET_CURRENT_TUTORIAL,
  tutorial
});

export const unloadTutorials = () => ({
  type: UNLOAD_TUTORIALS
});

export const unloadCurrentTutorial = () => ({
  type: UNLOAD_CURRENT_TUTORIAL
});

// const removeTutorial = (id) => ({
//   type: REMOVE_TUTORIAL,
//   id
// });

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

export const createTutorial = (tutorial) => async (dispatch) => {
  console.log('in thunk')
  const res = await fetch('/api/tutorials/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tutorial)
  });

  if (res.ok) {
    const data = await res.json();
    // if there are no errors, set the tutorial
    if (!data.errors) dispatch(setOneTutorial(data));
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
    if (!data.errors) dispatch(setOneTutorial(data));
    return data;
  }
}

export const deleteTutorial = (id) => async (dispatch) => {
  const res = await fetch(`/api/tutorials/${id}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    const data = await res.json();
    // dispatch(removeTutorial(id))
    return data;
  }
}

const initialState = {
  all: {},
  current: null,
};

const tutorialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TUTORIALS:
      return {
        ...state,
        all: {
          ...action.tutorials
        }
      }
    case UNLOAD_TUTORIALS:
      return {
        ...initialState,
        all: {
          ...initialState.all
        }
      };
    case SET_CURRENT_TUTORIAL:
      return {
        ...state,
        current: action.tutorial,
      }
    case UNLOAD_CURRENT_TUTORIAL:
      return {
        ...initialState,
        current: {
          ...initialState.current
        }
      }
    // case REMOVE_TUTORIAL:
    //   const newObj = {
    //     ...state,
    //     all: {
    //       ...state.all
    //     }
    //   }
    //   console.log('--->', newObj['all'])
    //   // delete newObj[all][action.id]
    //   return newObj;
    default:
      return state;
  }
}

export default tutorialsReducer;
