import './Melocord.scss';
import { Outlet } from 'react-router-dom';
import MelocordTabs from '../../components/navigation/navbar/NavBar';

const Melocord = () => {
    const nav = MelocordTabs();
    return (
        <div className="Melocord">
            {nav}
            <Outlet />
        </div>);
}
export default Melocord;
