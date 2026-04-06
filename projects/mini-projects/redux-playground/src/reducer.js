const initialState = {count: 0};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INC':
      return {
        ...state,
        count: state.count + 1
      };
    case 'DEC':
      return {
        ...state,
        count: state.count - 1
      };
    case 'RND':
      return {
        ...state,
        count: state.count * action.payload
      };
    default:
      return state;
  }
};

export default reducer;