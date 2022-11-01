import './Scales.scss';
import { NATURAL_NOTES } from "../../utils/melocord-constants";
import NoteDisplay from "../../components/note-display/NoteDisplay";
import { Outlet } from 'react-router-dom';

const MajorScales = () => {
    const scales = NATURAL_NOTES.map((note, i) => <NoteDisplay key={i} scale={note} major={true} />)
    return (
        <div className="MajorScales">
            <div className="scales">{scales}</div>
            <Outlet />
        </div>);
}
export default MajorScales;
