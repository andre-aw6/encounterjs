import { quickSearchs, anserwQuestion } from "../../graphql";

export const SET_QUICK_SEARCHS = "SET_QUICK_SEARCHS";
export const REMOVE_QUICK_SEARCHS = "REMOVE_QUICK_SEARCHS";

function setQuickSearchs(quickSearchs) {
  return {
    type: SET_QUICK_SEARCHS,
    quickSearchs,
  };
}
function removeQuickSearchs(key) {
  return {
    type: REMOVE_QUICK_SEARCHS,
    key,
  };
}

export function handleSetQuickSearchs() {
  return async (dispatch, getState) => {
    const { user } = getState();

    if (!user.isLogged) return;
    const searchs = await quickSearchs();

    if (searchs && searchs.length > 0) dispatch(setQuickSearchs(searhcs));
  };
}

export function handleAnswer(key, value) {
  return (dispatch) => {
    dispatch(removeQuickSearchs(key));
    anserwQuestion(key, value);
  };
}
