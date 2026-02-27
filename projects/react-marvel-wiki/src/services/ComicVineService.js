import {useHttp} from '../hooks/http.hook';

const useComicVineService = () => {
  const _apiBase = 'https://cors-anywhere.com/comicvine.gamespot.com/api/';
  const _apiKey = process.env.REACT_APP_API_KEY;
  const _baseOffset = 0;

  const {loading, error, request, clearError} = useHttp();

  // Gets one random character
  const getRandomCharacter = async () => {
    try {
      const countParams = new URLSearchParams({
        api_key: _apiKey,
        format: 'json',
        limit: 1,
        field_list: 'id'
      });

      const countRes = await request(`${_apiBase}characters/?${countParams.toString()}`);
      const total = countRes.number_of_total_results;

      const randomOffset = Math.floor(Math.random() * total);

      const charParams = new URLSearchParams({
        api_key: _apiKey,
        format: 'json',
        limit: 1,
        offset: randomOffset,
        field_list: 'id,name,image,deck,site_detail_url,count_of_issue_appearances'
      });

      const res = await request(`${_apiBase}characters/?${charParams.toString()}`);

      return _transformCharacter(res.results[0]);

    } catch (error) {
      throw error;
    }
  };

  const getObjectById = async (id) => {
    const params = new URLSearchParams({
      api_key: _apiKey,
      format: 'json'
    });
    const res = await request(`${_apiBase}character/4005-${id}/?${params.toString()}`);
    return res.results;
  };

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

  // Normalizes the data
  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      deck: char.deck,
      thumbnail: char.image ? char.image.small_url : 'http://via.placeholder.com/250x250',
      homepage: char.site_detail_url,
      wiki: char.site_detail_url,
      issue_credits: char.issue_credits || []
    };
  };

// Gets a list of comics (issues)
  const getAllComics = async (offset = _baseOffset) => {
    const params = new URLSearchParams({
      api_key: _apiKey,
      format: 'json',
      limit: 8,
      offset: offset,
      field_list: 'id,name,issue_number,image,site_detail_url'
    });

    const res = await request(`${_apiBase}issues/?${params.toString()}`);
    return res.results.map(_transformComics);
  };

  // Normalizes the comics data
  const _transformComics = (comics) => {
    return {
      id: comics.id,
      // Sometimes an issue doesn't have a specific name, so we fallback to its issue number
      title: comics.name || `Issue #${comics.issue_number}`,
      thumbnail: comics.image ? comics.image.small_url : 'http://via.placeholder.com/250x250',
      url: comics.site_detail_url
    };
  };

  return {
    loading,
    error,
    clearError,
    getCharacter,
    getAllCharacters,
    getRandomCharacter,
    getAllComics,
    getObjectById
  };
};

export default useComicVineService;