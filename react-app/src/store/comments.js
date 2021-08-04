const SET_COMMENTS = 'comments/SET_COMMENTS';
const SET_NEW_COMMENT = 'comments/SET_NEW_COMMENT';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';
const UNLOAD_COMMENTS = 'comments/UNLOAD_COMMENTS';

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments
});

export const unloadComments = () => ({
  type: UNLOAD_COMMENTS
});

const setNewComment = (comment) => ({
  type: SET_NEW_COMMENT,
  comment
});

const removeComment = (id) => ({
  type: REMOVE_COMMENT,
  id
});

export const postComment = (comment) => async (dispatch) => {
  const res = await fetch('/api/comments/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setNewComment(data));
  }
}

export const editComment = (comment) => async (dispatch) => {
  const res = await fetch(`/api/comments/${comment.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setNewComment(data));
  }
}

export const deleteComment = (id) => async (dispatch) => {
  const res = await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.ok) {
    await res.json();
    dispatch(removeComment(id));
  }
}

const initialState = {};

const reducer = (state = initialState, action) => {
  let newObj;
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, ...action.comments }
    case SET_NEW_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    case REMOVE_COMMENT:
      newObj = { ...state };
      delete newObj[action.id];
      return newObj;
    case UNLOAD_COMMENTS:
      return { ...initialState }
    default:
      return state;
  }
}

export default reducer;
