import './Scales.scss';
import { NATURAL_NOTES } from "../../utils/melocord-constants";
import NoteDisplay from '../../components/note-display/NoteDisplay';

const MinorScales = () => {
    const scales = NATURAL_NOTES.map((note, i) => <NoteDisplay key={i} scale={note} major={false} />)
    return (
        <div className="MinorScales">
            <div className="scales">{scales}</div>
        </div>);
}
export default MinorScales;
