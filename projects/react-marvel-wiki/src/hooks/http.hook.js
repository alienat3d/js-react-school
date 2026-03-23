import {useCallback, useState} from 'react';


export const useHttp = () => {
  // 187.11 Ну, и последним штрихом, теперь мы можем удалить из хука стейты loading & error, т.к. они больше не используются.
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

// 187.3.0 Создавать логику стейт-машины мы будем именно в этом хуке, т.к. она нам пригодится не в одном лишь компоненте. Тут нам понадобится ещё один стейт "processState" (стандартное название, т.к. туда будет помещаться название процесса внутри компонента) и по умолчанию запишем процесс "IDLE" (т.е. ожидание какого-то действия).
  // ? Следует обратить внимание, что состояния прописываемые в конечных автоматах (стейт-машинах) следует прописывать именно словами/строками. Это общепринятый стандарт и связанно с бэкендом и БД, в том числе и с возможным расширением кол-ва состояний.
  const [processState, setProcessState] = useState('IDLE');

  const request = useCallback(async (
    url,
    method = 'GET',
    body = null,
    headers = {
      'Content-Type': 'application/json', // Не факт, что обязательно нужен (нужно потестить)
      'User-Agent': 'MyComicApp/1.0' // ComicVine requires an User-Agent
    },
    retries = 3 // количество попыток установить соединение
  ) => {
    // setLoading(true);
    // 187.3.1 Когда начнётся процесс запроса на сервер, то процесс будет меняться на "loading".
    setProcessState('LOADING');

    for (let i = 0; i < retries; i++) {
      const controller = new AbortController();

      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`Could not fetch ${url}, status: ${response.status}`);

        const data = await response.json();
        // setLoading(false);
        // 187.3.2 Также меняем стейт, когда запрос завершён.
        // 187.5.1.0 Здесь мы меняем стейт на 'success' и только после этого возвращаем данные через return.
        // (Go to [\src\services\ComicVineService.js])
        // setProcessState('SUCCESS'); // 187.5.1.1 Эта строчка уже лишняя, т.к. мы будем менять этот стейт вручную в компоненте CharInfo.
        return data;
      } catch (error) {
        clearTimeout(timeoutId);

        const isTimeout = error.name === 'AbortError';
        const errorMessage = isTimeout ? `Request timed out after 5s` : error.message;

        if (i === retries - 1) {
          // setLoading(false);
          // setError(errorMessage);
          console.error(`Fetch failed after ${retries} attempts. Reason:`, errorMessage);
          // 187.3.3 И когда он выдал ошибку мы также меняем стейт на "error".
          setProcessState('ERROR');
          throw error;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }, []);

  const clearError = useCallback(() => {
    // setError(false);
    // 187.3.4 Ещё у нас тут есть функция очищающая ошибку и тогда мы тоже хотим поменять состояние на "загрузки".
    setProcessState('LOADING');
  }, []);

  // 187.3.5 Также надо не забыть экспортировать стейт processState.
  // (Go to [/src/services/ComicVineService.js])
  // return {loading, error, processState, setProcessState, request, clearError};
  return {processState, setProcessState, request, clearError};
};