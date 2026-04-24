// import { useCallback } from "react";

export const useHttp = () => {
    // 208.4 Осталась лишь ошибка с загрузкой списка героев. Это происходит, что у нас здесь функция request обёрнута в хук "useCallback" и мемоизированная функция внутри слайса с методом "createAsyncThunk" работать не будет. Чтобы исправить ошибку, нам нужно этот хук отсюда удалить.
    // const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    // (Go to [/src/actions/index.js])
    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
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

    return {request}
}