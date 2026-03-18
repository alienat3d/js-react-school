import {useFormik} from 'formik';
import * as Yup from 'yup';

/*const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Обязательное поле';
  } else if (values.name.length < 2) {
    errors.name = 'Требуется вписать минимум два символа';
  }
  if (!values.email) {
    errors.email = 'Обязательное поле';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Проверьте правильность введённого email-адреса';
  }
  if (values.amount <= 0) {
    errors.amount = 'Сумма пожертвования должна быть положительной';
  }

  return errors;
};*/

const FormikWithHook = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      amount: 0,
      currency: '',
      text: '',
      terms: false,
    },
    // validate,
    validationSchema: Yup.object({
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
    }),
    // ? Метод "stringify" здесь трансформирует объект в строку для вывода в консоль
    onSubmit: (values) => console.log(JSON.stringify(values, null, 2)),
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <h2>Отправить пожертвование</h2>
      <label htmlFor="name">Ваше имя</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : ''}
      <label htmlFor="email">Ваша почта</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : ''}
      <label htmlFor="amount">Количество</label>
      <input
        id="amount"
        name="amount"
        type="number"
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.amount && formik.touched.amount ? <div className="error">{formik.errors.amount}</div> : ''}
      <label htmlFor="currency">Валюта</label>
      <select
        id="currency"
        name="currency">
        value={formik.values.currency}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        <option value="">Выберите валюту</option>
        <option value="USD">USD</option>
        <option value="UAH">UAH</option>
        <option value="RUB">RUB</option>
      </select>
      {formik.errors.currency && formik.touched.currency ? <div className="error">{formik.errors.currency}</div> : ''}
      <label htmlFor="text">Ваше сообщение</label>
      <textarea
        id="text"
        name="text"
        value={formik.values.text}
        onChange={formik.handleChange}
      />
      <label className="checkbox">
        <input
          name="terms"
          type="checkbox"
          checked={formik.values.terms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
        Соглашаетесь с политикой конфиденциальности?
      </label>
      {formik.errors.terms && formik.touched.terms ? <div className="error">{formik.errors.terms}</div> : ''}
      <button type="submit">Отправить</button>
    </form>
  );
};

export default FormikWithHook;