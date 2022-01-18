import '../styles/App.scss';
import { useState, useEffect } from 'react';
// import conctactList from '../data/contacts.json';

function App() {

  const [data, setData] = useState([]);

  const [name, setName] = useState('');
  const [counselor, setCounselor] = useState('');
  const [speciality, setSpeciality] = useState('');

  useEffect(() => {
    // Dentro de useEffect llamamos al API
    fetch('https://beta.adalab.es/pw-recursos/apis/adalabers-v1/promo-patata.json')
      .then(response => response.json())
      .then(responseData => {
        // Cuando el API responde guardamos los datos en el estado para que se re-renderice el componente
        console.log(responseData);
        setData(responseData.results);
      });
  }, []);

  const htmlConctact = data.map(contact => (
    <tr key={contact.id}>
      <td>{contact.name}</td>
      <td>{contact.counselor}</td>
      <td>{contact.speciality}</td>
    </tr >
  ));

  const handleInputName = (ev) => {
    setName(ev.target.value);
  }
  const handleInputCounselor = (ev) => {
    setCounselor(ev.target.value);
  }
  const handleInputSpeciality = (ev) => {
    setSpeciality(ev.target.value);
  }

  const handleClick = (ev) => {
    ev.preventDefault();

    const newContact = {
      name: name,
      counselor: counselor,
      speciality: speciality,
    };
    setData([...data, newContact]);
    setName('');
    setCounselor('');
    setSpeciality('');
  }

  return (
    <div>
      <h1>Adalabers</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutora</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {htmlConctact}
        </tbody>
      </table>
      <h1>Añadir una Adalaber</h1>
      <form>
        <label htmlFor='name'>Nombre</label>
        <input
          type='text'
          value={name}
          onChange={handleInputName}
        />
        <label htmlFor='counselor'>Tutora</label>
        <input
          type='text'
          value={counselor}
          onChange={handleInputCounselor}
        />
        <label htmlFor='speciality'>Especialidad</label>
        <input
          type='text'
          value={speciality}
          onChange={handleInputSpeciality}
        />
        <input type="submit" value="Añadir una nueva Adalaber" onClick={handleClick} />
      </form>
    </div>
  );
}

export default App;

