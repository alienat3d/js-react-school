import {Component} from 'react';

import ComicVineService from '../../services/ComicVineService';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';


class App extends Component {
  state = {selectedChar: null};

  onCharSelected = id => this.setState({selectedChar: id});

  comicVineService = new ComicVineService();

  triggerBtn = async () => {
    const res = await this.comicVineService.getObjectById(1254);
    console.log(res);
  };

  render() {
    return (
      <div className="app">
        <AppHeader/>
        <main>
          <button onClick={this.triggerBtn}>Click</button>
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
    );
  }
}

export default App;