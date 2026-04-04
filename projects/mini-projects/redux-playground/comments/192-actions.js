// 192.1.1 Здесь у нас будут находиться все "action creators", каждый из которых нужно экспортировать, чтобы потом использовать где-то ещё.
// (Go to [/src/reducer.js])
export const inc = () => ({type: 'INC'});
export const dec = () => ({type: 'DEC'});
export const rnd = (value) => ({type: 'RND', payload: value});