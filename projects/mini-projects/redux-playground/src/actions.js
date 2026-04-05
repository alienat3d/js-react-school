export const inc = () => ({type: 'INC'});
export const dec = () => ({type: 'DEC'});
// 194.6.1 Теперь мы поместим метод генерации случайного числа сюда в свойство payload.
// export const rnd = (value) => ({type: 'RND', payload: value});
// (Go to [/src/components/Counter.js])
export const rnd = () => ({type: 'RND', payload: Math.floor(Math.random() * 10)});