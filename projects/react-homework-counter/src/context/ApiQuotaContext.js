// 169.8.0 Задание: Отобразить также счётчик оставшихся запросов на random.org API в отдельном компоненте, причём чтобы он обновлял данные только по нажатию на кнопку рандомайзера компонентов Counter & RandomCounter.
// 169.8.1 Этот файл создаст обёртку, которая будет хранить в себе глобальный стейт API и отдавать его, связанным с ним компонентам.

// ? 169.9.0 Но, что отличает хорошее приложение от отличного, так это обработка сетевых запросов. Каждый раз, когда мы делаем запрос на сервер, то он может иметь 3 стадии: загрузка, успех и ошибка. Пока мы написали код только для успешных запросов, но если что-то произойдёт с сетью или сервер с API упадёт, то функционал тихо сломается.
// 169.9.1 Чтобы это исправить мы можем добавить стейты isLoading и error. И лучше поменять чейнинг с "then" на "async/await" связку, т.к. это сделает наши блоки обработки стадий загрузки, успеха и ошибки более читабельными. Начнём с того, что добавим состояния "isQuotaLoading" и "quotaError", чтобы приложение знало, что нужно показывать пользователю.
import {createContext, useState, useContext, useCallback, useMemo} from 'react';

import {mockFetch, USE_MOCK_API} from '../utils/mockFetch';

// 169.8.2 Создаём контекст.
const ApiQuotaContext = createContext();

// 169.8.3 Создаём компонент-провайдер
export const ApiQuotaProvider = ({children}) => {
  const [reqsLeft, setReqsLeft] = useState(null);
  const [isQuotaLoading, setIsQuotaLoading] = useState(false);
  const [quotaError, setQuotaError] = useState(null);

  const fetchReqsLeft = useCallback(async () => {
    setIsQuotaLoading(true); // переключения флажка загрузки в true
    setQuotaError(null); // очистка предыдущих ошибок

    try {
      const ip = process.env.REACT_APP_IP;
      const url = `https://www.random.org/quota/?ip=${ip}&format=plain`;

      // Toggle between real and mock fetch!
      const response = await (USE_MOCK_API ? mockFetch(url) : fetch(url));

      // 169.9.2 Метод fetch не выкинет ошибок при плохих HTTP-статусах (например 404 или 500), т.ч. нам нужно проверить их самостоятельно.
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setReqsLeft(data);
    } catch (error) {
      console.error('Failed to fetch quota:', error);
      setQuotaError('Failed to load quota.'); // Ловим и сохраняем возможную ошибку
    } finally {
      setIsQuotaLoading(false); // Останавливаем загрузку вне зависимости от успеха или ошибки запроса
    }
  }, []);

  const value = useMemo(() => ({
    reqsLeft,
    isQuotaLoading,
    quotaError,
    fetchReqsLeft
  }), [reqsLeft, isQuotaLoading, quotaError, fetchReqsLeft]);

  return (
    /* // 169.9.3 Добавим новые состояния и метод в провайдер. */
    <ApiQuotaContext.Provider value={value}>
      {children}
    </ApiQuotaContext.Provider>
  );
};
// (Go to [/src/components/ReqsCredit.js])

// 169.8.4 Создадим также самописный хук для простого использования контекста
// (Go to [/src/hooks/useCounterFunctions.js])
export const useApiQuota = () => useContext(ApiQuotaContext);