import {useCallback, useEffect, useState} from 'react';

// 169.8.5 Теперь импортируем глобальный контекст в этот хук. Он будет запускать обновление глобального API стейта.
import {useApiQuota} from '../context/ApiQuotaContext';
import {mockFetch, USE_MOCK_API} from '../utils/mockFetch';

// 169.9.5 Ту же логику, что мы делали в ApiQuotaContext компоненте мы сделаем и здесь. Мы будем проверять, отправлен ли запрос на API для генерации случайного числа и предотвращать спам-клики, чтобы нельзя было отправлять слишком много запросов за раз.

// 169.10.0 Чтобы запускать рандомайзер при первом рендере нам нужно использовать хук "useEffect" и сделать это в нашем кастомном хуке, т.к. мы хотим это делать в обоих Counter-компонентах. Когда мы добавим "useEffect" здесь, то он запустится по всех компонентах при первом рендере, в котором используется.
export const useCounterFunctions = (initialCount) => {
  const [count, setCount] = useState(initialCount);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [randomizeError, setRandomizeError] = useState(null);

  const {fetchReqsLeft} = useApiQuota();

  const onIncreaseCount = () => {
    if (count < 50) setCount(count + 1);
  };
  const onDecreaseCount = () => {
    if (count > -50) setCount(count - 1);
  };
  const onResetCount = () => setCount(0);

  /* 169.10.1 Нам следует обернуть функцию-рандомайзер в хук useCallback, что предотвратит её срабатывание лишний раз, когда это не нужно. И запускаться будет только, когда будет меняться стейт "fetchReqsLeft". */
  const onRandomizeCount = useCallback(async () => {
    setIsRandomizing(true);
    setRandomizeError(null);

    try {
      const url = 'https://www.random.org/integers/?num=1&min=-50&max=50&col=1&base=10&format=plain&rnd=new';

      // Toggle between real and mock fetch!
      const response = await (USE_MOCK_API ? mockFetch(url) : fetch(url));

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setCount(data);

      // Обновляем данные ApiQuota только, если запрос был успешным
      fetchReqsLeft();
    } catch (error) {
      console.error('Failed to randomize:', error);
      setRandomizeError('API Error');
    } finally {
      setIsRandomizing(false);
    }
  }, [fetchReqsLeft]);

  useEffect(() => {
    onRandomizeCount();
  }, [onRandomizeCount]);

  return {count, isRandomizing, randomizeError, onIncreaseCount, onDecreaseCount, onRandomizeCount, onResetCount};
};

// (Go to [/src/components/ReqsCredit.js])
// (Go to [/src/components/Counter.js])