import Loader from './Loader.js';
import {useEffect} from 'react';
import {useApiQuota} from '../context/ApiQuotaContext';

// 169.8.7 Пропишем функционал обновления глобального стейта для оставшегося кредита запросов API, который должен запускаться 1 раз при первой загрузке приложения и затем всякий раз, когда будет нажата кнопка рандомайзера.
// (Go to [/src/App.js])

// 169.9.4 Теперь мы можем использовать новые переменные, чтобы дать пользователю немедленный отклик.
const ReqCredit = () => {
  const {reqsLeft, isQuotaLoading, quotaError, fetchReqsLeft} = useApiQuota();

  useEffect(() => {
    fetchReqsLeft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ранний возврат при ошибке:
  if (quotaError) {
    return <div className="req-credit error">{quotaError}</div>;
  }

  return (
    <div className="req-credit">
      API quota remaining for today: {isQuotaLoading ? <Loader /> : reqsLeft}
    </div>
  );
};

// (Go to [/src/hooks/useCounterFunctions.js])

export default ReqCredit;