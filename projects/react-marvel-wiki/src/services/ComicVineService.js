import {useHttp} from '../hooks/http.hook';

const useComicVineService = () => {
  const _apiBase = '/api/';
  const _apiKey = process.env.REACT_APP_API_KEY;
  const _baseOffset = 0;

  const {processState, setProcessState, request, clearError} = useHttp();

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
      deck: char.deck || 'No description available for this character.',
      thumbnail: char.image ? char.image.small_url : 'http://via.placeholder.com/250x250',
      pic: char.image ? char.image.medium_url : 'http://via.placeholder.com/400x625',
      wiki: char.site_detail_url,
      issue_credits: char.issue_credits || []
    };
  };

  // Gets a character by name using filter
  const getCharacterByName = async (name) => {
    const params = new URLSearchParams({
      api_key: _apiKey,
      format: 'json',
      filter: `name:${name}`, // Use the filter parameter for exact or partial name matches
      field_list: 'id,name'
    });

    const res = await request(`${_apiBase}characters/?${params.toString()}`);

    // We return the map because filter might return multiple characters
    // (e.g., searching "Spider-Man" returns Peter Parker, Miles Morales, etc.)
    return res.results.map(_transformCharacter);
  };

  // Gets a list of comics (issues)
  const getAllComics = async (offset = _baseOffset) => {
    const params = new URLSearchParams({
      api_key: _apiKey,
      format: 'json',
      limit: 8,
      offset: offset,
      field_list: 'id,name,issue_number,image'
    });

    const res = await request(`${_apiBase}issues/?${params.toString()}`);
    return res.results.map(_transformComics);
  };

  // Gets a single comic (issue) by ID
  const getComic = async (id) => {
    const params = new URLSearchParams({
      api_key: _apiKey,
      format: 'json',
      field_list: `id,name,deck,description,image,issue_number,cover_date,page_count,volume,site_detail_url`
    });

    const res = await request(`${_apiBase}issue/4000-${id}/?${params.toString()}`);
    return _transformComic(res.results);
  };

  // Normalizes the comics data
  const _transformComics = (comics) => {
    return {
      id: comics.id,
      // Sometimes an issue doesn't have a specific name, so we fallback to its issue number
      title: comics.name || `Issue #${comics.issue_number}`,
      thumbnail: comics.image ? comics.image.small_url : 'http://via.placeholder.com/250x250'
    };
  };

  // Normalizes a single comic data
  const _transformComic = (comic) => {
    if (!comic) {
      return {
        id: null,
        title: 'Comic not found',
        description: 'No data available.',
        thumbnail: 'http://via.placeholder.com/250x250',
        issueNumber: '?',
        pageCount: 'Not specified',
        coverDate: 'Unknown',
        homepage: null
      };
    }

    const volumeName = comic.volume?.name || 'Unknown Series';
    const issueNumber = comic.issue_number || '?';

    return {
      id: comic.id,
      title: comic.name
        ? `${volumeName}: ${comic.name}`
        : `${volumeName} #${issueNumber}`,

      description:
        comic.description ||
        comic.deck ||
        'No description available for this issue.',

      thumbnail: comic.image?.medium_url ||
        'http://via.placeholder.com/250x250',

      issueNumber,
      pageCount: comic.page_count,
      coverDate: comic.cover_date || 'Unknown',
      comicVineUrl: comic.site_detail_url
    };
  };

  return {
    processState,
    setProcessState,
    clearError,
    getCharacter,
    getCharacterByName,
    getAllCharacters,
    getRandomCharacter,
    getComic,
    getAllComics,
    getObjectById
  };
};

export default useComicVineService;