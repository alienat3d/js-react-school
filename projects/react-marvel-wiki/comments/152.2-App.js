import { Component } from 'react';

import AppHeader from '../src/components/appHeader/AppHeader';
import RandomChar from '../src/components/randomChar/RandomChar';
import CharList from '../src/components/charList/CharList';
import CharInfo from '../src/components/charInfo/CharInfo';

import decoration from '../../resources/img/vision.png';

// ? [152.2]
// ? 1.0.3 Тут снова понадобится такой приём, как поднятие состояния. Т.к. компоненты CharList и CharInfo находятся в общем родительском компоненте App, то нам нужно сперва поднять стейт из CharList, а потом оттуда передать его в CharInfo. Поместим в стейт специальный для этой задачи selectedChar и начальным его значением будет null.
// 1.0.4 Далее понадобится метод onCharSelected, который будет устанавливать значение selectedChar. Он будет принимать id, который и будет устанавливать в стейт.
// * 1.0.5 Когда мы поднимаем состояние, то сперва мы описываем свойство в стейт и потом создаём для него метод, чтобы записывать значение в это свойство через аргумент. Дальше передаём этот метод как проп "onCharSelected" в компонент CharList, откуда будем забирать этот id. А в компонент CharInfo мы будем передавать эту id из стейта в проп "charId".
// todo [переходим в charList/CharList.js]
class App extends Component {
  state = {
    selectedChar: null
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id
    })
  }

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList onCharSelected={this.onCharSelected} />
            <CharInfo charId={this.state.selectedChar} />
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    )
  }
}

export default App;