// import {Component} from 'react';
import decoration from '../../resources/img/vision.png';
import {useState} from 'react';
// import ComicVineService from '../../services/ComicVineService';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

// 168.0 Переписываем приложение на функциональные компоненты.
// (Go to [src/components/charList/CharList.js])
// class App extends Component {
const App = () => {
  // state = {selectedChar: null};
  const [selectedChar, setSelectedChar] = useState(null);
  // onCharSelected = id => this.setState({selectedChar: id});
  const onCharSelected = id => setSelectedChar(id);
  // comicVineService = new ComicVineService();
  // const comicVineService = new ComicVineService();
  // triggerBtn = async () => {
  //   const res = await this.comicVineService.getObjectById(1254);
  //   console.log(res);
  // };

  // render() {
    return (
      <div className="app">
        <AppHeader/>
        <main>
          {/*<button onClick={this.triggerBtn}>Click</button>*/}
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              {/*<CharList onCharSelected={this.onCharSelected} />*/}
              <CharList onCharSelected={onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              {/*<CharInfo charId={this.state.selectedChar} />*/}
              <CharInfo charId={selectedChar} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  // }
}

export default App;