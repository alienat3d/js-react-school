import { useCallback } from "react";

// 197.2.1 Итак, это хук, из названия которого следует, что он отвечает за отправку запросов серверу. Пока что некоторые его части закомментированы, чтобы не создавать дополнительные переменные и экспортируется лишь функция "request". Чуть позже узнаем зачем это так.
// (Go to [/src/index.js])

export const useHttp = () => {
    // const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        // setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            // setProcess('error');
            throw e;
        }
    }, []);

    // const clearError = useCallback(() => {
        // setProcess('loading');
    // }, []);

    return {request, 
            // clearError, 
            // process, 
            // setProcess
        }
}