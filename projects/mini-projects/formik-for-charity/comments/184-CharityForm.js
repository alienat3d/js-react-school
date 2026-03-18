import {ErrorMessage, Form, Field, Formik, useField} from 'formik';
import * as Yup from 'yup';

// 184.5.0 Но если мы заметили, что у нас начинает повторяться много элементов, то мы можем провести немножко рефакторинга, чтобы сократить повторяющийся код при помощи хука "useField". Мы создадим отдельно функциональный компонент MyTextInput, где мы создадим шаблон для наших инпутов. В пропсах нам понадобится label - для разных названий инпутов, а также прочие пропсы. И возвращать мы будем кусочек вёрстки в Реакт-фрагменте.
const MyTextInput = ({label, ...props}) => {
  // 184.5.1 Но нам также нужно ещё передавать разные пропы из библиотеки Formik для связи компонентов со стейтом компонента Formik и для этого используется собственно хук «useField», из которого мы вытащим две сущности "field" & "meta". Итак, хук useField позволит получить массив из двух объектов "field" & "meta". "field" содержит в себе пропсы, которые мы передавали в элемент input, т.е. значение атрибута "value", а также методы "handleChange" & "handleBlur". Все они будут получаться через контекст от главного род. компонента Formik, когда мы будем использовать компонент MyTextInput внутри него. "meta" — это метаданные с ошибками и объектом "touched" (был ли уже фокус на элементе).
  // 184.5.2 Теперь также развернём в инпуте объект field spread-оператором с необходимыми пропсами, а также добавим и элемент, показывающий ошибки/подсказки. Ошибки здесь мы будем выводить по тому же принципу, что мы делали в первой части урока при работе с хуком «useFormik» [FormikWithHook.js], но уже обращаясь к объекту "meta", который содержит в себе и текст подсказки и информацию "touched". ↓
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

// 184.7.0 Похожим образом можно создать и другие шаблоны компонентов, например для чекбоксов. Т.к. структура вёрстки у нас здесь отличается, то мы будем передавать здесь children (это не обязательно текст, а может быть другой компонент или HTML-элемент).
const MyCheckbox = ({children, ...props}) => {
  // 184.7.1 Здесь в useField мы передадим уже в объекте пропсы и свойство type, в значении "checkbox" (за счёт этого свойства мы скажем, что в field должен быть не value, а "checked" с булевым значением для функционирования чекбокса).
  const [field, meta] = useField({...props, type: 'checkbox' });

  // 184.7.2 Здесь у инпута мы сразу пропишем атрибут type в значении "checkbox", а под ним будет поле динамической вставки "children", где и будет располагаться текст рядом с чекбоксом. ↓
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

// 184.0 Здесь мы рассмотрим как создать ту же форму с библиотекой «Formik», но уже используя компоненты вместо хука. На самом деле в компоненте Formik используется всё тот же хук useFormik, а потом организуется контекст. Т.ч. благодаря тому, что мы изучили работу с этим хуком в прошлом уроке [FormikWithHook.js] мы также уже знаем как это работает внутри компонента Formik. ↓
const CharityForm = () => {
  /*  const formik = useFormik({
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
    });*/

  // 184.1.0 Итак, нам нужно переписать вёрстку с элементов на компоненты библиотеки Formik. И начнём с того, что обернём всю вёрстку формы в компонент Formik. Этот компонент примет в проп "initialValues" всё, что у нас было раньше в одноимённом объекте внутри настроек хука useFormik.
  // 184.1.1 Также переносим схему валидации и "onSubmit" в пропсы.
  // 184.2 Теперь уже в этот компонент Formik мы поместим готовые компоненты для инпутов и т.д., чтобы сократить код и избавиться от его дублирования. Внутри будет использоваться Реакт-контекст и все эти value атрибуты, методы "handleChange" & "handleBlur" будут получаться через контекст. ↓
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
      {/* 184.3.0 И вот мы заменяем все элементы формы на компоненты form на Form, а input на Field и т.д. И теперь Field будет по значению в атрибуте "name" через контекст забирать значения "value", а также методы "handleChange" & "handleBlur" и их прописывать больше не нужно. Но нам нужно добавить атрибут as и указать ему тип компонента "input". */}
      <Form className="form">
        <h2>Отправить пожертвование</h2>
        {/*<label htmlFor="name">Ваше имя</label>*/}
        {/*<Field id="name" name="name" type="text" as="input"/>*/}
        {/* 184.3.1 Вместо вставки div'а через тернарный оператор мы теперь можем использовать компонента ошибки ErrorMessage, в котором укажем лишь атрибуты "className", "name" и ещё атрибут "component" (тип элемента HTML, где нужно прописывать ошибку). Опять же, через значения атрибута "name" он найдёт необходимые ему данные через контекст. */}
        {/*<ErrorMessage className="error" name="name" component="div"/>*/}
        {/* 184.6.0 И вот, теперь вместо элемента label и двух компонентов Field и ErrorMessage мы можем использовать наш компонент MyTextInput. */}
        <MyTextInput label="Ваше имя" id="name" name="name" type="text"/>

        {/* 184.3.2 Также есть ещё один способ рендерить ошибку через функцию, если нам нужно вставить не один элемент с ошибкой, а какой-то комплексный блок элементов: */}
        {/* <ErrorMessage className="error" name="name">{ msg =>
              <div className="error-container">
                <div className="error">{msg}</div>
                <button>OK</button>
              </div>
            }</ErrorMessage>*/}

        {/*<label htmlFor="email">Ваша почта</label>
        <Field id="email" name="email" type="email" as="input"/>
        <ErrorMessage className="error" name="email" component="div"/>*/}
        {/* 184.6.1 Тоже мы сделаем и здесь. ↑ */}
        <MyTextInput label="Ваша почта" id="email" name="email" type="text"/>
        <label htmlFor="amount">Количество</label>
        <Field id="amount" name="amount" type="number" as="input"/>
        <ErrorMessage className="error" name="amount" component="div"/>
        <label htmlFor="currency">Валюта</label>
        {/* 184.4 Компонент Field по умолчанию рендерит элемент <input>, поэтому здесь мы обязательно укажем, что этот элемент у нас <select> через атрибут "as", хотя лучше для наглядности указывать этот атрибут и инпутам тоже. ↑ */}
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
        {/* 184.7.3 Ну, а теперь мы можем заменить этот чекбокс нашим функциональным компонентом MyCheckbox. Т.к. мы использовали в нём "children", то компонент у нас здесь уже с закрывающим тегом и текст лейбла мы вставим между ними. */}
        <MyCheckbox name="terms">
          Соглашаетесь с политикой конфиденциальности?
        </MyCheckbox>
        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  );
};

export default CharityForm;