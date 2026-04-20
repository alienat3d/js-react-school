import unknownHero from '../../assets/unknown-hero.png';
import './heroesListItem.scss';

const HeroesListItem = ({name, description, element, onDelete}) => {
  let elementClassName;

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
           className="hero-img img-fluid object-fit-contain object-position-bottom"
           alt="unknown hero" />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span onClick={onDelete}
            className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
        <button type="button" className="btn-close btn-close" aria-label="Close"></button>
      </span>
    </li>
  );
};

export default HeroesListItem;