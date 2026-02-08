class MarvelService {
  // FIXME: Hide _apiBase & _apiKey!
  // _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=0856e08c6fd8cf6a102714f9dd77f559';
  /*   _apiBase = process.env.REACT_APP_API_BASE;
    _apiKey = process.env.REACT_APP_API_KEY; */
  _baseOffset = 0;

  getResource = async (url) => {
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
  }
}

export default MarvelService;