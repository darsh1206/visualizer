export const initialState = {
  elements: [],
  Green: [],
  Orange: [],
  Red: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setElements":
      return { ...state, elements: action.payload };
    case "setGreen":
      return { ...state, Green: action.payload };
    case "setOrange":
      return { ...state, Orange: action.payload };
    case "setRed":
      return { ...state, Red: action.payload };
    default:
      throw new Error("Unhandled action type");
  }
};
