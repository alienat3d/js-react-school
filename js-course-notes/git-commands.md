git config --global user.name "Al Tsaplin" → Глобальная настройка имени разработчика.
git config --global user.email al.tsaplin@gmail.com → Глобальная настройка email разработчика.

git init → Подключить проект к git.
echo >> README.md → Создать в папке файл README.md (описание проекта).
git add -A → Добавить все файлы в коммит. _/ Можно также добавлять вместо -A отдельные файлы или определённые расширения, например _.html /\*

git status → Посмотреть статус репозитория.
git commit -am "Первый коммит" → Добавляет коммит.
git log --pretty=format:"%h %ad | %s%d [%an]" --graph --date=short → Лог истории в красивом варианте
git <command> --help → Документация по командам (даже оффлайн)

---

git remote add js-react-school https://github.com/alienat3d/js-react-school.git → Добавляю локальный репозиторий на GitHub.
git push -u js-react-school master → Запушаем изменения в ветку master.
* Так как в первый раз мы пушали с флагом -u, что означает привязку к определённому репозиторию, то теперь можем далее пушать более короткой командой git push.

При различиях между локальным и удалённым репозитории :wq! - merge with 'recursive' strategy