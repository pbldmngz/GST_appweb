import '../style/TarjetasVista.css';
import Tarjeta from '../components/Tarjeta'

const TarjetasVista = ({tarjetas}) => {
  const tarjetasLista = tarjetas.map(
    tarjeta => {
      return (
        <Tarjeta key={tarjeta.id} props={ tarjeta }/>
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
