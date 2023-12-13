import { Component } from 'react';

import MarvelService from '../src/services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

// ? [149.1] Генерация случайного персонажа из полученных из API данных.
/* //* 1.0.0 Как обычно сперва продумаем алгоритм:
  1) Идёт запрос к API и получаются данные о каком-то персонаже;
  2) Эти данные отображаются в вёрстке в виде инфо-карточки о персонаже;
  3) По клике на кнопку «Try it» мы меняем информацию на другого случайно выбранного персонажа.
*/
// * 1.0.1 Внутри этого компонента конечно нам потребуется стейт, ведь когда мы будем делать запрос, то эти данные нужно будет где-то сохранять. Тем более они будут потом меняться по клику на кнопку «Try it». Т.ч., пока мы работаем с классовыми компонентами, то переделаем этот компонент в классовый.
// 1.0.2 Далее, используя синтаксис полей классов, создадим стейт, куда занесём свойства, соответствующие названию тех элементов, что нам нужно заполнять в вёрстке, а значения у них пока будут null. Ведь пока значений просто нет, когда приложение будет загружаться, оно вначале ничего не будет знать о данных. 
// ? Все эти данные можно подсмотреть в API, опции, отвечающей за данные о персонаже.
// 1.0.3 Теперь, когда стейт готов, мы можем использовать его внутри render(), как обычно используем деструктуризацию и заносим туда все свойства из state.
// 1.0.4 Подставим все эти свойства стейта в нужные места в вёрстке.
// * 1.0.5 Теперь нам необходим получить эти данные от сервера и подставить в значения свойств стейт, которыми мы потом заполним вёрстку. Теперь мы создадим новый метод marvelService внутри класса RandomChar. (Это синтаксис полей классов, эквивалентен более старому this.marvelService = ...)
// 1.0.6 Дальше напишем новый метод updateCharacter, который будет получать данные от сервера и записывать в стейт. Здесь мы используем стрелочную функцию, чтобы не терять контекст. Внутрь коллбэк-функции запишем marvelService, у него вызовем метод getCharacter() (т.к. нам нужно получить именно одного персонажа). 
// 1.0.7 Этот персонаж должен будет находится по уникальному id. Поэтому внутрь метода у нас будет id.
// 1.0.8 Дальше результат этого метода нам нужно обработать, напишем then(), внутри укажем, что к нам придёт какой-то результат (res), тогда мы запустим коллбэк-функцию по формированию нашего стейта. И здесь у нас не будет зависимости от предыдущего стейта, потому что каждый раз приходит совершенно иной персонаж. Поэтому без использования коллбэк-функции просто скопируем все свойства стейта и начнём заполнять их значения.
// 1.0.9 Нам нужно взять результат ответа сервера "res", и мы видели, что это один большой объект, у которого есть свойство data и у data есть свойство внутри results, это массив с данными.
// 1.0.10 Ну и теперь нам нужно как-то запустить метод updateCharacter(), ведь нам нужно его запустить один раз при загрузки приложения и затем каждый раз по клику пользователем на кнопку "Try it". И один из вариантов как можно его вызвать внутри классового компонента - использовать constructor.
// ? 1.0.11 Отлично! У нас теперь отображается персонаж, но в консоли появилась ошибка, которая говорит, что мы не должны вызывать setState() на компоненте, который ещё не появился на странице и это может привести к багам. А появляется она потому, что constructor вызывается ещё до того, как сформировалась вёрстка, именно на это и ругается реакт. Поэтому вызов методов в конструкторах это довольно плохая практика, особенно тех методов, которые общаются с сервером, подписываются на сервисы или что-то подобное делают. Пока мы оставим это как есть, но позже, когда освоим больше теории, то обязательно вернёмся сюда и исправим.
// * 1.1.0 Пока у нас в случайном персонаже отображается только Халк, т.к. id прописан хард кодом. Это мы исправим, подставив случайный id, чтобы работало так, как и задумывалось. Опытным путём можно обнаружить, что все персонажи у нас лежат в промежутке от одного числа до другого числа по уникальному id, состоящему из 7 цифр. Для этого воспользуемся глобальным объектом Math и его методами floor() и random(). Сперва используем метод floor() для округления числа до целых чисел, а внутри используем следующую формулу: {Math.random() * "результат вычета минимального числа из нужного диапазона из максимального числа" + "минимальное значение диапазона"}
// ? 1.4.0 Будет также здорово доработать наш стейт. Сейчас там лежат свойства, которые определяют одного персонажа. Но ведь потом в стейте могут быть и какие-то другие данные. Например, какая-нибудь ошибка или индикатор загрузки и многое другое, поэтому логично будет поместить эти данные в отдельный объект, который и будет характеризовать персонажа. Для этого просто создадим свойство char (character) и поместим туда пустой объект (это тоже самое, как если бы у нас там были все свойства со значениями "null").
class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateCharacter();
  }

  state = {
    char: {}
  }
  marvelService = new MarvelService();
  // todo 1.1.1 В некоторых id у нас может пока выскакивать ошибка, но так и задумано, позже мы осуществим обработку ошибок, чтобы из-за этого наше приложение не ломалось.
  // * 1.2.0 Подобная запись полученных данных в стейт у нас будет встречаться ещё много где в нашем приложении, поэтому логично будет перенести это в отдельный метод компонента MarvelService.
  // todo [перейдём в services\MarvelService.js]
  // * 1.2.8 Теперь, когда у нас есть специальный метод в MarvelService, то мы можем сильно сократить код, просто передавая в setState трансформированный объект res.

  // 1.4.1 И если продумывать дальше оптимизацию, то "this.setState(res)" можно также вынести в отдельную сущность onCharLoaded, т.к. эта строчка будет много где повторяться (помним про принцип DRY).
  onCharLoaded = (char) => this.setState({ char })
  // ? 1.4.2 И вот здесь, когда используются промисы и идёт цепочка через then(), тот результат, который приходит из getCharacter в then, и если внутри then() стоит просто ссылка на функцию, то этот результат, который пришёл в then() будет подставляться в этот метод "onCharLoaded" и заполнять наш стейт.
  updateCharacter = () => {
    const id = Math.floor(Math.random() * (1011107 - 1010898) + 1010898);
    // const id = 1011202; // увеличивать
    // const id = 1011100; // уменьшать
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded);
  }
  // ? 1.4.3 Также чуть изменим вытаскивание данных из стейта. Т.к. все эти сущности лежат внутри объекта char, то допишем char: {}
  render() {
    const { char: { thumbnail, name, description, homepage, wiki } } = this.state;

    return (
      <div className="randomchar">
        <div className="randomchar__block">
          <img src={thumbnail} alt="Random character" className="randomchar__img" />
          <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
              {description}
            </p>
            <div className="randomchar__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">Homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    )
  }
}

export default RandomChar;