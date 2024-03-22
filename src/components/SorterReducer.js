export const initialState = {
  elements: [],
  Green: [],
  Orange: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setElements":
      return { ...state, elements: action.payload };
    case "setGreen":
      return { ...state, Green: action.payload };
    case "setOrange":
      return { ...state, Orange: action.payload };
    default:
      throw new Error("Unhandled action type");
  }
};


