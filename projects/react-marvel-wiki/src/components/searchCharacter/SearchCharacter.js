import './searchCharacter.scss';
import loader from '../../resources/img/btn-loader.svg';
import {Form, Field, Formik, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import useComicVineService from '../../services/ComicVineService';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SearchCharacter = () => {
  const [char, setChar] = useState(null);

  const {loading, error, getCharacterByName, clearError} = useComicVineService();

  const onCharLoaded = (char) => setChar(char);

  const updateChar = (name) => {
    clearError();
    getCharacterByName(name).then(onCharLoaded);
  };

  const errorMessage = error ? (
    <div className="search-character__critical-error">
      <ErrorMessage/>
    </div>
  ) : null;
  const results = !char ? null :
    char.length > 0 ?
      (<div className="search-character__success">
        <span>There is! Visit {char[0].name}’s page?</span>
        <Link className="button button__secondary" to={`/characters/${char[0].id}`}>
          <div className="inner">TO PAGE</div>
        </Link>
      </div>) :
      <div className="search-character__error">The character was not found. Check the name and try again</div>;

  return (
    <div className="search-character">
      <h2>Or find a character by name:</h2>
      <Formik initialValues={{name: ''}}
              validationSchema={
                Yup.object({
                  name: Yup.string()
                    .min(2, 'The name is too short')
                    .max(25, 'The name is too long')
                    .required('This field is required'),
                })
              }
              onSubmit={({name}) => updateChar(name)}
      >
        {() => (
          <Form>
            <div>
              <Field
                className="search-character__input"
                name="name"
                as="input"
                type="text"
                placeholder="Enter name"
                autoComplete="on"
              />
              <button
                className="button button__main"
                type="submit"
                disabled={loading}
              >
                <div className="inner">{loading ? <img className="btn-loader" src={loader} alt="" /> : 'FIND'}</div>
              </button>
            </div>
            {/* This is the correct place for Formik's ErrorMessage */}
            <FormikErrorMessage className="search-character__error" component="div" name="name"/>
          </Form>
        )}
      </Formik>
      {results}
      {errorMessage}
    </div>
  );
};

export default SearchCharacter;