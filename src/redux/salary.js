import { ADD_SALARIES, SALARIES_LOADING, SALARIES_FAILED } from "./ActionTypes";

export const Salaries = (
  state = { isLoading: true, errMess: null, salaries: [] },
  action
) => {
  switch (action.type) {
    case ADD_SALARIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        salaries: action.payload,
      };

    case SALARIES_LOADING:
      return { ...state, isLoading: true, errMess: null, salaries: [] };

    case SALARIES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
