import unknownHero from '../../assets/unknown-hero.png';

// 197.6.1 Взглянем и на сам компонент элемента списка/карточки героя. Он довольно простой: здесь приходят пропсы с именем, описанием героя и элементом стихии, к которому относится этот герой. Затем эти пропсы используются при заполнении вёрстки.
const HeroesListItem = ({name, description, element}) => {

  let elementClassName;

  // 197.6.2 В зависимости от элемента стихии, к которому относится герой — у них будут разные цвета, поэтому использована конструкция "switch...case".
  switch (element) {
    case 'fire':
      elementClassName = 'bg-danger bg-gradient';
      break;
    case 'water':
      elementClassName = 'bg-primary bg-gradient';
      break;
    case 'wind':
      elementClassName = 'bg-success bg-gradient';
      break;
    case 'earth':
      elementClassName = 'bg-secondary bg-gradient';
      break;
    default:
      elementClassName = 'bg-warning bg-gradient';
  }

  return (
    <li className={`card px-2 flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
      <img src={unknownHero}
           className="img-fluid w-25 d-inline mt-3"
           alt="unknown hero"
           style={{'objectFit': 'cover'}}/>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
        <button onClick={} type="button" className="btn-close btn-close" aria-label="Close"></button>
      </span>
    </li>
  );
};

export default HeroesListItem;