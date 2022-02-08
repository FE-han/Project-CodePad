interface getPresetReducerState {
  key: string;
}

interface getPresetReducerAction<T> {
  type: string;
  payload: T;
}

interface presetValue {
  presetId: string;
  presetName: string;
}

const initialState: getPresetReducerState = {
  key: "value",
};

export const getPresetReducer = (
  state = initialState,
  action: getPresetReducerAction<presetValue>
) => {
  switch (action.type) {
    case "pending":
      const newState = {
        ...state,
        key: "newValue",
      };
      return newState;

    default:
      return state;
  }
};

export default getPresetReducer;
