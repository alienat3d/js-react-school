// 170.5.0 Теперь нам нужно связать наш новый кастомный хук с сервисом. Мы превратим этот файл сервиса также в хук, но при этом не будем менять название и перемещать в папку хуков, т.к. это не глобальная функция, а специализированная настроенная на работу с определённым API.

import {useHttp} from '../hooks/http.hook';

const useComicVineService = () => {
  const _apiBase = 'https://cors-anywhere.com/comicvine.gamespot.com/api/';
  const _apiKey = process.env.REACT_APP_API_KEY;
  const _baseOffset = 0;

  // 170.5.1 Вытаскиваем из хука его составляющие деструктуризацией.
  const {loading, error, request, clearError} = useHttp();

  // 170.5.2 Заменяем на функцию "request" из хука "useHttp". ↓
  /*  // Reusable fetcher with required ComicVine headers
    getResource = async (url) => {
      let res = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'MyComicApp/1.0' // ComicVine requires a User-Agent
        }
      });

      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      return await res.json();
    }*/

  /*const getMaxCharacterId = async () => {
    // We use JSON format, sort by newest first, and only grab 1 result
    const url = `${_apiBase}characters/?api_key=${_apiKey}&format=json&sort=date_added:desc&limit=1&field_list=id,name`;
    const data = await request(url);
    if (data.results && data.results.length > 0) {
      const latestCharacter = data.results[0];
      console.log(`Current Max ID: ${latestCharacter.id}`);
      return latestCharacter.id;
    }
  };*/

  const getRandomCharacter = async () => {
    try {
      // Step 1: Get the total number of characters (lightweight call)
      const countParams = new URLSearchParams({
        api_key: _apiKey,
        format: 'json',
        limit: 1,
        field_list: 'id' // We only need the metadata, not the character
      });

      const countRes = await request(`${_apiBase}characters/?${countParams.toString()}`);
      const total = countRes.number_of_total_results;

      // Step 2: Generate a random offset based on that total
      const randomOffset = Math.floor(Math.random() * total);

      // Step 3: Fetch the specific character at that offset
      const charParams = new URLSearchParams({
        api_key: _apiKey,
        format: 'json',
        limit: 1,
        offset: randomOffset,
        field_list: 'id,name,image,deck,site_detail_url,count_of_issue_appearances'
      });

      const res = await request(`${_apiBase}characters/?${charParams.toString()}`);

      // IMPORTANT: The 'characters' list endpoint returns an array in `results`.
      // We must pick the first (and only) item: res.results[0]
      return _transformCharacter(res.results[0]);

    } catch (error) {
      throw error;
    }
  };

/*  const getObjectById = async (id) => {
    const params = new URLSearchParams({
      api_key: _apiKey,
      format: 'json'
    });
    const res = await request(`${_apiBase}character/4005-${id}/?${params.toString()}`);
    return res.results;
  };*/

  // Gets a list of characters
  const getAllCharacters = async (offset = _baseOffset) => {
    const params = new URLSearchParams({
      api_key: _apiKey,
      format: 'json',
      limit: 9,
      offset: offset,
      field_list: 'id,name,image,deck,site_detail_url' // Optimization: Fetch only what we need
    });

    const res = await request(`${_apiBase}characters/?${params.toString()}`);
    return res.results.map(_transformCharacter);
  };

  // Gets a single character by ID
  const getCharacter = async (id) => {
    const params = new URLSearchParams({
      api_key: _apiKey,
      format: 'json',
      field_list: 'id,name,deck,image,description,site_detail_url,issue_credits, issue_number'
    });

    // ComicVine uses "character/4005-ID" format for detail endpoints
    const res = await request(`${_apiBase}character/4005-${id}/?${params.toString()}`);
    return _transformCharacter(res.results);
  };

  // Normalizes the data to match your Marvel app's schema
  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      // ComicVine provides a 'deck' (short bio) or 'description' (full HTML)
      deck: char.deck,
      // description: char.deck || (char.description ? "Detailed description available." : "No description available."),
      thumbnail: char.image ? char.image.small_url : 'http://via.placeholder.com/250x250',
      homepage: char.site_detail_url,
      wiki: char.site_detail_url,
      issue_credits: char.issue_credits || []
    };
  };

  // 170.6 Так как это функция, то вернём из неё несколько сущностей, которые нам пригодятся. На заметку: Мы можем прокинуть также и стейты "loading" и "error", которые мы сначала приняли из другого хука "http.hook.js".
  // (Go to [/src/components/randomChar/RandomChar.js])
  return {
    loading,
    error,
    clearError,
    getCharacter,
    getAllCharacters,
    getRandomCharacter
  };
};

export default useComicVineService;