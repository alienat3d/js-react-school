import './charInfo.scss';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import useComicVineService from '../../services/ComicVineService';
import setContent from '../../utils/setContent';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {
  // 187.4.0 Теперь начинаем работать с компонентом ради которого мы создавали стейт-машину. Для начала извлекаем здесь стейт "processState". И вот, файл сервиса будет запускать хук "useHttp", который будет передавать состояние стейта "processState", его значения меняются на разных этапах процесса запроса на сервер. И вот на основании этого стейта мы будем генерить разный контент для вёрстки этого компонента. ↓
  // 187.5.6 А стейты loading & error с новой системой здесь больше не нужны и можно их больше не извлекать. ↓
  const {processState, setProcessState, getCharacter, clearError} = useComicVineService();
  const [char, setChar] = useState(null);
  const [visibleComics, setVisibleComics] = useState(10);

  const onCharLoaded = char => setChar(char);

  // 187.5.4 И вот здесь нам нужно указать, что только тогда, когда данные о персонаже будут получены и занесены в стейт нам нужно переключить стейт "processState" в значение "SUCCESS". ↓
  const updateChar = () => {
    const {charId} = props;
    if (!charId) return;
    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcessState('SUCCESS'));
  };

  const showMoreComics = () => setVisibleComics(prevValue => prevValue + 10);

  useEffect(() => {
    updateChar();
    setVisibleComics(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.charId]);

  // ? 187.1.0 Для начала обозначим проблему, которую нам нужно решить: здесь у нас 4 разных контента блока информации о персонаже и мы их рендерим в зависимости от стейта. (Так можно делать, но иногда такой подход бывает неудобен, особенно если логика преобразований не слишком очевидна. Иногда ещё эту проблему называют «антипаттерном» — то, что не следует применять.) Когда, как в случае с errorMessage & spinner проверяется лишь 1 стейт, то это нормальный читабельный код, но с другими двумя (skeleton & content) у других программистов могут возникнуть проблемы с пониманием логической цепи, особенно, если это условие, к примеру, разрасталось бы дальше за счёт добавление в условие новых состояний, переменных, результатов работы функций и т.д.
  // 187.1.1 В случае с errorMessage & spinner у них всего два исхода, они либо есть, либо их нет. А вот в случае с skeleton & content у нас 2³ или 8 вариантов исхода, т.к. у них в условии 3 состояния с двумя исходами, которые результатом дают по 2 исхода — показывать или не показывать. А если добавить в это условие ещё один стейт, то у нас уже будет 2^4 или 16 вариантов исхода. И в приложениях такое бывает часто и не только с формированием контента, а например какая-то кнопка или блок может иметь много разных состояний. И потому, как прописывать для большого количества состояний своё условие — это не просто трудозатратно, но и делает код трудночитаемым.
  // (Go to [\react-course-notes\8-187-fsm-finite-state-machine.md])
  // 187.4.1 Здесь мы перепишем старую логику под работу со стейт-машиной. Для этого создадим функцию setContent и примет 2 аргумента: сам стейт process, на который мы ориентируемся, а второй аргумент ситуативный, т.к. нам нужно будет передавать данные в пропсы компонента View.
  // 187.4.2 Для логики мы применим конструкцию switch...case.
  // 187.5.0 Но просто так это пока работать не будет, и всё из-за асинхронных операций, которые здесь задействованы.
  // (Go to [/src/hooks/http.hook.js])
  // 187.5.3 В итоге Реакт здесь будет пытаться в компоненте View рендерить данные, которые ещё не готовы, а готовы они будут чуть позже. Это следует всегда учитывать при работе с асинхронными функциями (например при работе с запросами на сервер). С обычными синхронными функциями этих проблем бы не было. А решение будет простое — это передать сюда функцию "setProcessState" из хука "useHttp" по ручному изменению стейта "processState". ↑
  // ? 187.6.0 А что насчёт функции "setContent"? Ведь её теперь придётся повторять в каждом из компонентов, где мы захотим использовать подобную стейт-машину. Тут ситуативно, обычно делают так, чтобы у похожих компонентов логика была также похожа. Поэтому её можно также вынести в отдельный файл и импортировать по надобности и подставляя нужные аргументы, но если компонент всё-таки отличается, то её видоизменённую копию можно реализовать в таком уникальном компоненте. Мы также могли бы поместить её в наш кастомный хук «useHttp», но такой вариант кажется менее очевидным, т.к. хук отвечает конкретно за запросы на сервер, а не за рендер контента на странице и эту логику лучше не смешивать, а во вторых у нас будут дополнительные прокидывания пропсов через ComicVineService, что тоже не здорово, ведь их и так уже довольно много. Поэтому мы лучше создадим ещё одну директорию "utils" для вспомогательных функций и перенесём эту функцию туда, предварительно сделав её более универсальной.
  // (Go to [/src/utils/setContent.js])
  /*const setContent = (processState, char, visibleComics, showMoreComics) => {
    switch (processState) {
      case 'IDLE':
        return <Skeleton/>;
      case 'LOADING':
        return <Spinner/>;
      case 'ERROR':
        return <ErrorMessage/>;
      case 'SUCCESS':
        return <View char={char}
                     visibleComics={visibleComics}
                     showMoreComics={showMoreComics}/>;
      default:
        throw new Error('Unexpected process state');
    }
  };*/

/*  const skeleton = char || loading || error ? null : <Skeleton/>;
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !char)
    ? <View char={char}
            visibleComics={visibleComics}
            showMoreComics={showMoreComics}/>
    : null;*/

  return (
    <div className="char__info">
      {/*{skeleton}
      {errorMessage}
      {spinner}
      {content}*/}
      {/* 187.5.5 А здесь, мы просто запустим функцию "setContent", в которую передадим нужные ей для работы аргументы. ↑ */}
      {/*{setContent(processState, char, visibleComics, showMoreComics)}*/}
      {/* 187.6.2 Теперь здесь мы будем подставлять первым компонентом стейт из стейт-машины, вторым аргументом компонент View для вёрстки, а третьим будет объект с пропсами. */}
      {/* (Go to [/src/components/charList/CharList.js]) */}
      {setContent(processState, View, {data: char, visibleComics, showMoreComics})}
    </div>
  );
};

const View = ({data, visibleComics, showMoreComics}) => {
  const {thumbnail, name, id, deck, wiki, issue_credits} = data;

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <Link className="button button__main" to={`./characters/${id}`} target="_blank" rel="noreferrer">
              <div className="inner">homepage</div>
            </Link>
            <a className="button button__secondary" href={wiki} target="_blank" rel="noreferrer">
              <div className="inner">wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{deck}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {issue_credits.length > 0 ? null : 'There is no comics with this character found in our database.'}
        {issue_credits.slice(0, visibleComics).map((item, index) => {
          return (
            <li className="char__comics-item" key={index}>
              <Link to={`/comics/${item.id}`} state={{from: '/'}}>
                {item.name || `Issue #${item.issue_number}`}
              </Link>
            </li>
          );
        })}
      </ul>
      {issue_credits.length > visibleComics && (
        <button
          className="char__comics-btn button button__main button__long"
          onClick={showMoreComics}
        >
          <div className="inner">show more</div>
        </button>
      )}
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number
};

export default CharInfo;