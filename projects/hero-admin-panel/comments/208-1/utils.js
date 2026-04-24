// [208] 0. Здесь, мы проведём небольшой рефакторинг, а именно: перенесём побочные эффекты, такие как сетевые запросы, из хуков React в Redux, что сделает наше приложение гораздо более предсказуемым и упростит его тестирование. И начнём с того, что превратим хук «useHttp» в стандартную утилитарную функцию на чистом JavaScript.
// 1. Создаём простую JS-утилиту (заменим http.hook.js). Вместо React-хука создадим стандартную асинхронную функцию.
// (Go to [/src/components/heroesList/heroesSlice.js])
export const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    try {
        const response = await fetch(url, {method, body, headers});

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch(error) {
        throw error;
    }
};