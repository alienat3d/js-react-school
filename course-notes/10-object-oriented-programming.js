'use strict';

// Довольно давно использовался *функциональный подход* к созданию программ. Что мы делали на прошлых уроках. Это просто набор функций, которые вызываются в нужный момент.

// Теперь появился другой — *Объектно-ориентированный подход. Здесь главную роль играет Объект. Он может содержать в себе методы, свойства, любой вид данных и представляет собой целостную сущность.

// Пример: "легковой автомобиль" — есть огромное разнообразие марок и моделей, но всех можно назвать легкомыми автомобилями. Именно это понятие и будет "прототипом", от которого можно уже отпочковывать новые экземпляры. Можно представить любой легковой автомобиль как объект. У него есть такие свойства, как: "двигатель, кузов, колёса и т.д.". У него есть такие методы, как: "езда, перевозка грузов, перевозка пассажиров и т.д." И у всех легковых автомобилей так. Но если посмотреть на потомков нашего легкового автомобиля, то у всех эти качества абсолютно разные: у кого-то более мощный двигатель, у кого-то больше\меньше колёса, какой-то кабриолет, какой-то с кузовом.
// Это и есть применение ООП в реальной жизни. У нас есть объект-прототип с определённым набором характеристик и немного изменяя или добавляя их, мы штампуем новые экземпляры. В программах точно также. Относительно WEB это может быть прототип модального окна, на основании которого мы сделаем несколько новых, не похожих друг на друга. Или прототип пользователя на сайтах и так далее. ООП - это целая наука о том, как делать правильную архитектуру. И в JavaScript такие вещи как массивы и функции — это тоже объекты.

let car = {
  speed: 250,
  distance: 3000,
};

let gulf = {
  speed: 150,
};

// Чтобы нам показать, что gulf произошёл от car. Теперь gulf унаследует все свойства у car.
gulf.__proto__ = car;

console.log(gulf);
console.log(gulf.distance); // Сперва пытается найти свойство distance внутри gulf, не находит и переходит в его прототип, то есть в car и находит его.