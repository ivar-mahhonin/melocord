import './Melocord.scss';
import MelocordTabs from '../nav/navbar/NavBar';
import { Outlet } from 'react-router-dom';

const Melocord = () => {
    const nav = MelocordTabs();
    return (
        <div className="Melocord">
            {nav}
            <Outlet />
        </div>);
}
export default Melocord;
