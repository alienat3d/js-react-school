// 170.0 Здесь мы попрактикуемся в создании кастомных хуков для нашего "Комикс Вики" проекта. И начнём с хука, который стандартно для такой задачи (работа с запросами HTTP) называется "http.hook". Итак, вспомним, что у нас много где повторяются такие стейты как "loading" & "error" и их было бы удобнее вынести в хук, чтобы сократить и не повторять код.
// ? К слову, есть разные плагины и сниппеты для типовых кастомных хуков, как тот, который мы здесь напишем, но важно разобраться как они пишутся.
import {useCallback, useState} from 'react';

// 170.1 Для начала, добавим стейты флажков загрузки и ошибки. Они будут менять значение во время запросов, поэтому логично добавить сюда и сам запрос.
// 170.2 Для запроса создадим функцию "request" и сразу обернём её в хук «useCallback», т.к. предполагается, что она будет использоваться где-то в нашем приложении и внутри дочерних компонентов. И, чтобы не вызывать лишних запросов на сервер, при определённых обстоятельствах, то сразу обернём её в хук. А ещё она будет асинхронной, ведь мы работаем с запросами на сервер. Она также будет иметь четыре параметра — ссылку (url), метод (method (со знач. по умолчанию "get")), "тело запроса" (body) и "заголовки" (headers)
export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // 170.11 Итак, у нас всё ещё остаётся следующая проблема: иногда запросы на сервер API проходят не с первого раза и тогда приложение выдаёт ошибку. Хотелось бы этого избежать и отправлять запрос снова, чтобы улучшить UX. Потому мы добавим простой цикл, который будет запускать метод fetch некоторое кол-во раз, пока не выкинет ошибку.
  /* (Go to [/src/components/charList/CharList.js]) */
  // 170.14.0 Кое что нас всё ещё не устраивает — если умышленно допустить ошибку в ссылке запроса на сервер, то приходится ждать около минуты, прежде, чем мы увидим индикацию об ошибке на странице. Кроме того мы не получаем никакой ошибки в консоль и сейчас мы это исправим с помощью таймаута и "контроллера отмены запроса". ↓
  const request = useCallback(async (
    url,
    method = 'GET',
    body = null,
    headers = {
      'Content-Type': 'application/json', // todo Не факт, что обязательно нужен (нужно потестить)
      'User-Agent': 'MyComicApp/1.0' // ComicVine requires an User-Agent
    },
    retries = 3 // <-- количество попыток установить соединение
  ) => {
    setLoading(true);

    // 170.3.0 Дальше нам нужно обернуть функцию fetch в конструкцию "try...catch", чтобы обработать возможные ошибки.
    // Цикл для попыток установить соединение
    for (let i = 0; i < retries; i++) {
      // 170.14.1 Создадим контроллер, а также строгий таймаут на 5 с для ожидания запроса.
      const controller = new AbortController();

      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        // 170.14.2 Также добавим контроллер сигнал отмены в опции fetch.
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: controller.signal
        });

        clearTimeout(timeoutId); // Не забудем очистить таймер, чтобы он не запускался

        // 170.3.1 Между этими функциями нужна проверка по статусу.
        if (!response.ok) throw new Error(`Could not fetch ${url}, status: ${response.status}`);

        // ? 170.3.2 В этом проекте мы предполагаем, что работа будет вестись только с JSON, хотя в других проектах можно было бы тип получаемых данных передать как ещё один параметр для универсализации функции.
        const data = await response.json();
        setLoading(false);
        return data;
      } catch (error) {
        clearTimeout(timeoutId); // И также очистим таймер здесь, в случае ошибки

        // 170.14.3 Если контроллер отмены (AbortController) прекратил запрос, то он выкинет "ошибку отмены" (AbortError)
        const isTimeout = error.name === 'AbortError';
        const errorMessage = isTimeout ? `Request timed out after 5s` : error.message;

        if (i === retries - 1) {
          setLoading(false);
          setError(errorMessage);
          console.error(`Fetch failed after ${retries} attempts. Reason:`, errorMessage);
          throw error;
        }

        // 170.14.4 Ожидаем секунду, прежде, чем начать новый цикл.
        // (Go to [/src/components/charInfo/CharInfo.js])
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }, []);

  // 170.4 Нам понадобится также функция clearError для очистки предыдущих ошибок перед новым запросом.
  const clearError = useCallback(() => setError(false), []);

  return {loading, error, request, clearError};
};

// (Go to [src/services/ComicVineService.js])