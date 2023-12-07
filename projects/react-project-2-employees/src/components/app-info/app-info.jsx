import './app-info.css';

const AppInfo = ({employeesCount, increasedCount}) => {
  return (
    <div className="app-info">
      <h1>Учёт сотрудников компании «Рога и копыта»</h1>
      <h2>Общее число сотрудников: {employeesCount}</h2>
      <h2>Премию получат: {increasedCount}</h2>
    </div>
  );
}

export default AppInfo;