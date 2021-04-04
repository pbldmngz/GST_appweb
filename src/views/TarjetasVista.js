import '../style/TarjetasVista.css';
import Tarjeta from '../components/Tarjeta'

const TarjetasVista = ({ tarjetas, changeParams}) => {
  const tarjetasLista = tarjetas.map(
    tarjeta => {
      return (
        <Tarjeta key={tarjeta.id} changeParams={changeParams} props={ tarjeta }/>
      )
    }
  )
  return (
    <div className="TarjetasVista">
      { tarjetasLista }
    </div>
  );
}

export default TarjetasVista;
