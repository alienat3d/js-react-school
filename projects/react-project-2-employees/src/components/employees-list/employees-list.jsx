import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({ data, onDelete, onSalaryChange, onToggleProp}) => {
  const elements = data.map(item => {
    const {id, ...itemProps} = item;

    return (
      <EmployeesListItem 
        key={id} 
        {...itemProps}
        onSalaryChange={(value) => onSalaryChange(id, value)}
        onDelete={() => onDelete(id)}
        onToggleProp={(evt) => onToggleProp(evt, id, evt.currentTarget.getAttribute('data-toggle'))} />
    );
  });
  return (
    <ul className="app-list list-group">
      {elements}
    </ul>
  );
}

export default EmployeesList;