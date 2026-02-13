class ComicVineService {
  _apiBase = 'https://cors-anywhere.com/comicvine.gamespot.com/api/';
  _apiKey = 'd715caaffa3348b2a2db351cf75f22f20f2adcf3';
  _baseOffset = 0;

  // Reusable fetcher with required ComicVine headers
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
  }

  getRandomCharacter = async () => {
    try {
      // Step 1: Get the total number of characters (lightweight call)
      const countParams = new URLSearchParams({
        api_key: this._apiKey,
        format: 'json',
        limit: 1,
        field_list: 'id' // We only need the metadata, not the character
      });

      const countRes = await this.getResource(`${this._apiBase}characters/?${countParams.toString()}`);
      const total = countRes.number_of_total_results;

      // Step 2: Generate a random offset based on that total
      const randomOffset = Math.floor(Math.random() * total);

      // Step 3: Fetch the specific character at that offset
      const charParams = new URLSearchParams({
        api_key: this._apiKey,
        format: 'json',
        limit: 1,
        offset: randomOffset,
        field_list: 'id,name,image,deck,site_detail_url,count_of_issue_appearances'
      });

      const res = await this.getResource(`${this._apiBase}characters/?${charParams.toString()}`);

      // IMPORTANT: The 'characters' list endpoint returns an array in `results`.
      // We must pick the first (and only) item: res.results[0]
      return this._transformCharacter(res.results[0]);

    } catch (error) {
      throw error;
    }
  }

  getObjectById = async (id) => {
    const params = new URLSearchParams({
      api_key: this._apiKey,
      format: 'json'
    });
    const res = await this.getResource(`${this._apiBase}character/4005-${id}/?${params.toString()}`);
    return res.results;
  }

  // Gets a list of characters
  getAllCharacters = async (offset = this._baseOffset) => {
    const params = new URLSearchParams({
      api_key: this._apiKey,
      format: 'json',
      limit: 9,
      offset: offset,
      field_list: 'id,name,image,deck,site_detail_url' // Optimization: Fetch only what we need
    });

    const res = await this.getResource(`${this._apiBase}characters/?${params.toString()}`);
    return res.results.map(this._transformCharacter);
  }

  // Gets a single character by ID
  getCharacter = async (id) => {
    const params = new URLSearchParams({
      api_key: this._apiKey,
      format: 'json',
      field_list: 'id,name,deck,image,description,site_detail_url,volume_credits'
    });

    // ComicVine uses "character/4005-ID" format for detail endpoints
    const res = await this.getResource(`${this._apiBase}character/4005-${id}/?${params.toString()}`);
    return this._transformCharacter(res.results);
  }

  // Normalizes the data to match your Marvel app's schema
  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      // ComicVine provides a 'deck' (short bio) or 'description' (full HTML)
      deck: char.deck,
      // description: char.deck || (char.description ? "Detailed description available." : "No description available."),
      thumbnail: char.image ? char.image.small_url : 'http://via.placeholder.com/250x250',
      homepage: char.site_detail_url,
      wiki: char.site_detail_url,
      volume_credits: char.volume_credits || []
    }
  }
}

export default ComicVineService;