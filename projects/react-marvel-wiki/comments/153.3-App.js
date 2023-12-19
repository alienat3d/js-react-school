import { Component } from "react";

import AppHeader from "../src/components/appHeader/AppHeader";
import RandomChar from "../src/components/randomChar/RandomChar";
import CharList from "../src/components/charList/CharList";
import CharInfo from "../src/components/charInfo/CharInfo";
import ErrorBoundary from "../src/components/errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

// ?[153.3]
// todo начало в [projects\react-marvel-wiki\src\components\errorBoundary\ErrorBoundary.js]
// * 1.0.6 Теперь находим нужный нам компонент CharInfo и обернём его в компонент-предохранитель ErrorBoundary.
// ? 3.0.0 Но как часто использовать ErrorBoundary компонент? Степень охвата кода на ваше усмотрение, если предполагаете, что компонент может сломаться, то конечно имеет смысл обернуть его в предохранитель, но какие-то совсем уж мелкие и простые компоненты оборачивать не стоит.
// ? 3.0.1 И даже, если мы понимаем, что компонент работает с сетью, но там ничего критичного сломаться не может, то можно и не оборачивать в предохранитель. Там хватит и тех методов, которые мы уже прописали внутри.
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
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    )
  }
}

export default App;