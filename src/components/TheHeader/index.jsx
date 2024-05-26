import { FaMoneyBill1Wave } from 'react-icons/fa6';
import './styles.css';

function TheHeader() {
  return (
    <header>
      <div>
        <h1>Döviz Dönüştürücü</h1>
        <FaMoneyBill1Wave style={{ fontSize: '2rem' }} />
      </div>
    </header>
  );
}

export default TheHeader;
