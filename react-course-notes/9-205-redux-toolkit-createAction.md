*[Redux Toolkit и её метод createAction (205)]*

? 205.0.0 Откровенно говоря метод "createAction" из библиотеки "Redux Toolkit" используется редко, как и метод "createReducer", который мы разберём подробнее в следующем уроке, т.к. в этой же библиотеке есть метод "createSlice", который объединяет два этих метода в одном. А эти два урока будут ознакомительными, на случай, если доведётся встретиться с ними в работе.

? 205.1 Мы уже успели заметить в одном из прошлых уроках [react-course-notes/9-199-combineReducers-n-createSelector.md], что при создании action creators создаётся много одинакового кода. И его сократить помогает как раз метод "createAction" из Redux Toolkit. 

Рассмотрим на практике в мини-приложении «Hero Admin Panel»: [\projects\hero-admin-panel\src\actions\index.js]

// ? 205.5 Теперь, уже на другом примере из документации Redux Toolkit о функции "createAction" рассмотрим, когда нам нужно обработать какие-то данные, прежде, чем отправлять их в функцию-редьюсер. Вторым аргументом можно передавать другую функцию (здесь это "prepare"), которая будет подготавливать payload. Для генерации уникального ID мы тут используем функцию "nanoid", которая также содержится в наборе Redux Toolkit.
<script>
import { createAction, nanoid } from '@reduxjs/toolkit';

const addTodo = createAction('todo/add', function prepare() {
    return {
        payload: {
            text,
            id: nanoid(),
            createdAt: new Date().toISOString(),
        },
    }
});

console.log(addTodo('Write more docs'));
/** {
*   type: 'todos/add',
*   payload: {
*       text: 'Write more docs',
*       id: 'V1StGXR8_Z5jdHi6B-myT',
*       createdAt: '2026-04-19T02:34:35.581Z'
*   }
* }
**/
</script>

// ? 205.6 И ещё несколько моментов по работе с функцией "createAction": в неё мы всегда передаём первым аргументом только строки.

(Go to [\projects\hero-admin-panel\src\actions\index.js])

|===:===:===:===>
**links**

* (EN Документация «Redux Toolkit» (про метод "createAction")): https://redux-toolkit.js.org/api/createAction
* (GitHub функции "NanoID"): https://github.com/ai/nanoid