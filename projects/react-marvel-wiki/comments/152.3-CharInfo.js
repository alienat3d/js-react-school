import { Component } from 'react';

import Spinner from '../src/components/spinner/Spinner';
import ErrorMessage from '../src/components/errorMessage/ErrorMessage';
import Skeleton from '../src/components/skeleton/Skeleton'
import MarvelService from '../src/services/MarvelService';

import './charInfo.scss';

// ? [152.3]
// * 1.0.7 На самом деле многое у нас тут будет похожим на компонент RandomChar. Тот же спиннер и сообщение об ошибке, т.ч. скопируем это всё оттуда.
// 1.0.12 Однако нам нужно поставить базовым значением loading: false. Т.к. в отличии от RandomChar и CharList, когда пользователь только заходит в наше веб-приложение, то эти два компонента загружают данные с сервера Marvel API, а эта часть по ТЗ не должна загружаться. Изначально здесь будет стоять компонент Skeleton, который подставляется заглушкой, когда ни один из персонажей ещё не выбран, а загрузка пойдёт только после действия пользователя. ↓
class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  }
  // 1.0.8 Дальше создадим метод updateCharInfo, который будет обновлять по клику по какому-то персонажу этот компонент. Когда будет происходить запрос, то ориентироваться нужно уже на пропсы, потому что мы передаём пропс из App.js с нужным id, на которую нужно ориентироваться. Поместим внутрь деструктурированный charId.
  // 1.0.9 Сразу продумаем вариант, если id не пришёл и пропишем условие, что в таком случае метод просто остановится. Это условие должно срабатывать в самом начале, потому что изначально стоит значением null. Т.к. если у нас персонаж не выбран, то отображаться будет компонент-заглушка "Skeleton".
  // 1.0.10 Ну, а если id найден, то мы будем делать по нему запрос на сервер с помощью метода сервисного компонента MarvelService - getCharacter(), а аргументом помещать в него id из пропса charId. Также дальше обработаем ответ через then() и catch().
  // ? 1.0.11 А дальше у нас будет похоже на то, как это было в компонентах RandomChar и CharList: у нас будем метод, который отвечает за промежуточный (спиннер) и конечный результат (рендер персонажа), а также ошибку (вывод картинки-сообщение об ошибке). ↑
  marvelService = new MarvelService();
  // 1.0.13 А теперь сделаем стандартную операцию, используем хук жизненного цикла компонента componentDidMount, который срабатывает сразу после того, как компонент отрендерился. Ну и конечно метод updateCharInfo в первый раз просто остановит свою работу. Но сделать этот шаг всё равно нужно, на случай, если кто-то в базовый стейт всё таки подставит какое-то значение отличное от "null". ↓
  componentDidMount() {
    this.updateChar();
  }
  // 1.1.5 Теперь нам нужно, чтобы приложение реагировало на клики пользователя по персонажам. Из диаграммы жизненного цикла компонента мы помним, что при обновлении пропс компонента он перерендерится. Нам потребуется ещё один хук жизненного цикла компонента componentDidUpdate, который и будет вставлять вёрстку с данными, полученными от API внутрь этого компонента. 
  // ? 1.1.6 Данный хук срабатывает, когда у компонента изменяются пропсы, стейт или срабатывает редко используемая "принудительный рендер компонента" forcedUpdate(). Он принимает в себя 3 аргумента, 2 из которых (prevProps & prevState) мы рассмотрим, а третий snapshot, используется настолько редко, что пока даже смысла нет на нём останавливаться, да и для задачи он нам не нужен. Этот хук, когда вызывается может принимать аргументами предыдущие пропсы и стейты. Это нужно для того, чтобы можно было сравнить и взаимодействовать с предыдущими результатами.
  // ? 1.1.7 Итак, чаще всего нам понадобится именно prevProps, чтобы проверять — действительно ли изменились пропсы или просто снова запустился по какой-то причине рендер. Для этого запишем условие, которые сравнит текущее значение charId с предыдущим и только в случае несовпадения запустит метод updateCharInfo. Это не только избавит нас от проблемы бесконечного цикла, но и если пользователь будет много раз кликать по одному и тому же персонажу, то ничего не будет происходить. ↓
  componentDidUpdate(prevProps) {
    // this.updateCharInfo(); // ? [1.1.6] Чтобы лучше понять зачем нужны эти аргументы, то представим, если бы мы просто вызывали бы метод обновления персонажа вот так, тогда он бы он бесконечно начал бы вызываться, т.к. вызывая собой рендер он бы снова запускал componentDidUpdate(), что привело бы к infinity loop и скорее всего зависанию браузера.
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.onCharLoading();

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError)
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    })
  }

  onCharLoading = () => {
    this.setState({
      loading: true
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }
  // 1.1.2 В рендере нужно вытащить все сущности из стейта. И здесь же пишем условие, при которых будут подставляться либо контент, либо спиннер, либо сообщение об ошибки.
  // 1.1.3 Также запишем условие для начального состояния, т.е. у нас нет контента, не загрузка и не ошибка, то поместим в вёрстку Skeleton.
  // 1.1.4 Все остальные условия без изменений, кроме content - там мы в условие добавим !char, то есть исключим из списка того, чего не должно быть для рендеринга контента из компонента View. ↑
  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}
// * 1.1.0 Также применим ещё один стандартный приём разделение компонента на части с логикой и рендером. Для рендера у нас традиционно будет View. Он также будет получать персонажа и возвращать кусочек вёрстки с динамически подставленными данными. Нам требуется взять всё, что находится в главном родительском элементе блока с информацией о персонаже (с классом "char__info") и туда мы будем помещать сгенерированный в View контент.
// 1.1.1 Т.к. тут нет одного общего родительского компонента, то используем "реакт-фрагмент". ↑
// * 1.1.8 Теперь мы вытащим из char всё, что нам необходимо для правильной генерации вёрстки.
// 1.1.9 Всё в общем-то просто, делаем как и всегда, подставляем названия сущностей в нужные места вёрстки. Однако с перечислением комиксов, в которых появляется персонаж всё чуточку сложнее. Мы могли бы создать отдельный метод, для того, чтобы создать массив комиксов, но т.к. тут у нас просто функциональный компонент, то сделаем попроще. Напишем прямо внутри функцию map(), а возвращать мы будем li с каждым отдельным комиксом. Не забываем и про атрибут key, в который будет помещаться index. (Почему всего лишь порядковый номер? Потому, что комиксы никак динамически меняться не будут и каждый раз, когда пользователь будет выбирать другого персонажа, то они полностью заменяются в вёрстке.)
// * 1.1.10 Представим, что нам дали таск "Выводить не больше 9 комиксов", это можно реализовать разными способами, но здесь применим просто условие: if (index > 9) return; / Однако здесь могут быть проблемы, если вдруг там будет тысяча комиксов, то может быть просадка по производительности, т.к. метод не останавливается на этом условии, просто коллбэк-функция будет заканчиваться, как только она будет на него натыкаться и оно окажется правдой. Т.ч. если элементов может быть очень много, то лучше использовать стандартный цикл с директивой break. При этом формировать новый массив, а не мутировать текущий.
// * 1.1.11 Также нам учесть случай, когда комиксов не обнаружено совсем, то нужно выводить какое-то сообщение, оповещая пользователя.
const View = ({ char }) => {
  const { thumbnail, name, description, homepage, wiki, comics } = char;

  let imgStyle = { 'objectPosition': 'center' };
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = { 'objectPosition': 'left bottom' };
  } else if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
    imgStyle = { 'objectPosition': 'right bottom' };
  }

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character found in our database.'}
        {
          comics.map((item, index) => {
            // eslint-disable-next-line
            // if (index > 9) return;
            return (
              <li
                className="char__comics-item"
                key={index}>
                {item.name}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default CharInfo;