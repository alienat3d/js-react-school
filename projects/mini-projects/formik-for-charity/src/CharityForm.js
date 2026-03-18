import {ErrorMessage, Form, Field, Formik, useField} from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({label, ...props}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({children, ...props}) => {
  const [field, meta] = useField({...props, type: 'checkbox' });

  return (
    <>
      <label className="checkbox">
        <input {...props} {...field} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CharityForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        amount: 0,
        currency: '',
        text: '',
        terms: false,
      }}
      validationSchema={
        Yup.object({
          name: Yup.string()
            .min(2, 'Требуется вписать минимум два символа')
            .max(50, 'Максимальное количество символов 50')
            .required('Это поле обязательно для заполнения'),
          email: Yup.string()
            .email('Проверьте правильность введённого email-адреса')
            .required('Это поле обязательно для заполнения'),
          amount: Yup.number()
            .min(1, 'Сумма пожертвования должна быть положительной')
            .required('Это поле обязательно для заполнения'),
          currency: Yup.string().required('Требуется выбрать валюту'),
          terms: Yup.boolean()
            .required('Без согласия с политикой конфиденциальности мы не сможем принять ваше пожертвование')
            .oneOf([true], 'Без согласия с политикой конфиденциальности мы не сможем принять ваше пожертвование')
        })
      }
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">
        <h2>Отправить пожертвование</h2>
        {/*<label htmlFor="name">Ваше имя</label>*/}
        {/*<Field id="name" name="name" type="text" as="input"/>*/}
        {/*<ErrorMessage className="error" name="name" component="div"/>*/}
        <MyTextInput label="Ваше имя" id="name" name="name" type="text"/>

        {/* <ErrorMessage className="error" name="name">{ msg =>
              <div className="error-container">
                <div className="error">{msg}</div>
                <button>OK</button>
              </div>
            }</ErrorMessage>*/}

        {/*<label htmlFor="email">Ваша почта</label>
        <Field id="email" name="email" type="email" as="input"/>
        <ErrorMessage className="error" name="email" component="div"/>*/}
        <MyTextInput label="Ваша почта" id="email" name="email" type="text"/>
        <label htmlFor="amount">Количество</label>
        <Field id="amount" name="amount" type="number" as="input"/>
        <ErrorMessage className="error" name="amount" component="div"/>
        <label htmlFor="currency">Валюта</label>
        <Field id="currency" name="currency" as="select">
          <option value="">Выберите валюту</option>
          <option value="RUB">RUB</option>
          <option value="USD">USD</option>
          <option value="UAH">EUR</option>
        </Field>
        <ErrorMessage className="error" name="currency" component="div"/>
        <label htmlFor="text">Ваше сообщение</label>
        <Field id="text" name="text" as="textarea"/>
        {/*<label className="checkbox">
          <Field name="terms" type="checkbox" as="input"/>
          Соглашаетесь с политикой конфиденциальности?
        </label>
        <ErrorMessage className="error" name="terms" component="div"/>*/}
        <MyCheckbox name="terms">
          Соглашаетесь с политикой конфиденциальности?
        </MyCheckbox>
        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  );
};

export default CharityForm;