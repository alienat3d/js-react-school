import './employees-list-item.css';

const EmployeesListItem = () => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="list-group-item-label">Max Musterman</span>
      <input 
        type="text"
        className="list-group-item-input"
        defaultValue="₽50000" />
      <button 
        className="btn-cookie btn-sm"
        type="button">
        <i className="fas fa-cookie"></i>
      </button>
      <button 
        className="btn-trash btn-sm"
        type="button">
        <i className="fas fa-trash"></i>
      </button>
      <i className="fas fa-star"></i>
    </li>
  );
}

export default EmployeesListItem;