class ComicVineService {
  // FIXME: Hide _apiBase & _apiKey!
  // _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiBase = 'https://cors-anywhere.com/comicvine.gamespot.com/api/characters/';
  _apiKey = 'd715caaffa3348b2a2db351cf75f22f20f2adcf3';
  _baseOffset = 0;

  getCharacterData = async (characterName) => {
    // 1. Construct the URL with parameters
    // We use URLSearchParams to handle encoding (like spaces in names)
    const params = new URLSearchParams({
      api_key: this._apiKey,
      format: 'json',
      filter: `name:${characterName}`,
      limit: 1
    });

    const url = `${this._apiBase}?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // IMPORTANT: Comic Vine will block you without a custom User-Agent
          'User-Agent': 'MyMarvelApp/1.0 (zaplin.dev@gmail.com)'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        console.log(data.results);
        const character = data.results[0];
        console.log(`Character Found: ${character.name}`);
        console.log(`Bio: ${character.deck || 'No summary available.'}`);
        console.log(`Image: ${character.image.original_url}`);
      } else {
        console.log('No character found with that name.');
      }
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };

  /*getResource = async (url) => {
    let res = await fetch(url, {
      method: 'GET',
      headers: {
        // IMPORTANT: Comic Vine will block you without a custom User-Agent
        'User-Agent': 'MyMarvelApp/1.0 (zaplin.dev@gmail.com)'
      }
    });

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getCharacter = async (name) => {
    const res = await this.getResource(`${this._apiBase}characters/${name}?${this._apiKey}`);
    console.log(res);
    // return this._transformCharacter(res.data.results[0]);
  };*/

  /*getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
    return {
      id: char.id,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      name: char.name,
      description: char.description ? char.description : 'Sorry, but there is no description for this character in our database yet.',
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }*/
}

export default ComicVineService;