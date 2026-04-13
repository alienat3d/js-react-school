*[«Middleware» (202)]*

? 202.0 На этом уроке мы продолжим рассматривать тему расширения store и разберём понятие «middleware». По сути, это частный случай enhancer, но если enhancer мог расширять функционал любой части store, то «middleware» занимается расширением функционала конкретно диспэтч-функции (что в большинстве случаев и требуется, когда мы говорим о расширении функционала store).

Рассмотрим сразу на практике в мини-приложении «Hero Admin Panel»: [projects/hero-admin-panel/src/store/index.js]

|===:===:===:===>
**links**

* (Документация о методе Redux «applyMiddleware»): https://redux.js.org/api/applymiddleware
