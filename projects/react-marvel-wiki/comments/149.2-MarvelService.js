// ? [149.2]
// ? 1.5.0 Итак, если наше приложение взаимодействует с сервером (а это происходит почти всегда), то следует отделять сетевые компоненты от основного кода (как в случае с этим компонентом MarvelService). Т.о. мы можем использовать его в совершенно разных частях приложения и код будет намного чище. Эта же сетевая часть кода отвечает за трансформацию данных в более конкретный компактный формат. А в других частях (например RandomChar) мы уже используем результаты работы этого компонента.
// ? 1.5.1 Трансформация данных не всегда нужна, данные могут приходить и сразу в нужном формате. Но если, как в этом случае, к нам приходит большой объект, где масса ненужных нам данных, то мы знаем как его трансформировать в более сокращённую версию.
class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=0856e08c6fd8cf6a102714f9dd77f559';

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could’nt fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }
  // * 1.3 Также имеет смысл поступить и с методом getAllCharacters(). "res" - это большой объект, в котором есть массив с нужными нам данными. Он находится в res.data.results, и т.к. это массив, то мы можем применить к нему метод map(), чтобы сформировать массив с новыми объектами. И туда вставляем уже созданный нами _transformCharacter. Т.о. мы передаём туда коллбэк-функцию, которая будет что-то делать с элементами, которые приходят к ней по очереди. Т.е. как "char" будет переходить в методе map() каждый отдельный объект по порядку и возвращаться трансформированный объект. В итоге формируется массив с трансформированными объектами.
  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=1500&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  }
  // * 1.2.5 Теперь здесь, где мы получаем конкретного персонажа по id, мы будем его не возвращать, а помещать в промежуточный результат — переменную res.
  // 1.2.6 Также помним, что getResource — асинхронная функция. Т.ч. нужно это учесть и не забыть написать async await.
  // 1.2.7 Теперь, когда метод будет запускаться, он подождёт ответа сервера и потом результат запишет в res. А далее мы передаём большой объект, который прислал нам сервер и возвращаем его после трансформации методом _transformCharacter().
  // ↓
  // todo [теперь вернёмся в RandomChar.js]
  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  // todo (начало в RandomChar.js)
  // * 1.2.1 Итак, создадим новый метод для заполнения стейта данными, полученными из API.
  // ? 1.2.2 Обратите внимание, что название начинается с "_". Таким образом мы предостерегаем любого, кто откроет этот файл и захочет внести изменения в эту функцию, чтобы он был предельно аккуратен, т.к. изменения могут критически повлиять на всё приложение или даже сломать его.
  // * 1.2.3 В этой функции мы будем получать данные и возвращать уже трансформированный объект. Когда мы получаем из API огромный объект каких-то данных, где далеко не все из них нам нужны, то мы их можем трансформировать в то, что нас действительно интересует. В этом и будет задача метода _transformCharacter.
  // ? 1.2.4 Мы будем получать объект и возвращать также объект, но уже только с нужными нам данными. Это и называется «трансформация данных».
  // ↑
  // * 1.2.9 Но и здесь мы видим, что у нас всюду повторяется "res.data.results[0]", мы можем это также отдельно вынести вверху в функции getCharacter(). И теперь передавать char (от character), сильно этим сокращая код.
  // ↑
  _transformCharacter = (char) => {
    return {
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      name: char.name,
      description: char.description,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url
    }
  }
}

export default MarvelService;