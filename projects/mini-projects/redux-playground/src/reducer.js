// 192.1.2 Также поступим и с функцией-редьюсером, не забывая и про initialState, т.к. он у нас используется.
// (Go to [/src/index.js])
const initialState = {value: 0};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INC':
      return {
        ...state,
        value: state.value + 1
      };
    case 'DEC':
      return {
        ...state,
        value: state.value - 1
      };
    case 'RND':
      return {
        ...state,
        value: state.value * action.payload
      };
    default:
      return state;
  }
};

export default reducer;