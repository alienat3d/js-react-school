import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    newItemLoading: false,
    error: false,
    offset: 0,
    charEnded: false
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest()
  }

  onRequest = (offset) => {
    this.onCharListLoading();

    this.marvelService.getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError)
  }

  onCharListLoading = () => this.setState({ newItemLoading: true })

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) { ended = true }

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended
    }))
  }

  onError = () => this.setState({ error: true, loading: false })
  // Пробовал сделать дозагрузку персонажей, но не доделал.
  /*   onScrollCharLoading = (offset) => {
      if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 1
      ) {
        this.onRequest(offset);
      }
    }
    componentDidMount(offset) {
      this.onRequest()
      window.addEventListener('scroll', () => this.onScrollCharLoading(offset));
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScrollCharLoading);
    } */
  itemRefs = [];

  setRef = ref => this.itemRefs.push(ref);

  focusOnItem = id => {
    this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
    this.itemRefs[id].classList.add('char__item_selected');
    this.itemRefs[id].focus();
  };

  renderItems(arr) {
    const items = arr.map((item, index) => {
      let imgStyle = { 'objectFit': 'cover' };
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'unset' };
      }

      return (
        <li
          className="char__item"
          tabIndex={0}
          ref={this.setRef}
          key={item.id}
          onClick={() => {
            this.props.onCharSelected(item.id);
            this.focusOnItem(index);
          }}
          onKeyDown={evt => {
            if (evt.key === ' ' || evt.key === "Enter") {
              this.props.onCharSelected(item.id);
              this.focusOnItem(index);
            }
          }} >
          <img
            src={item.thumbnail}
            alt={item.name}
            style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      )
    });

    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }

  render() {
    const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;

    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ 'display': charEnded ? 'none' : 'block' }}
          onClick={() => this.onRequest(offset)}>
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}

export default CharList;