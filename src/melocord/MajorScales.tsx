import './Scales.scss';
import { NATURAL_NOTES } from "../utils/melocord-constants";
import NoteDisplay from "./note-display/NoteDisplay";

const MajorScales = () => {
    const scales = NATURAL_NOTES.map((note, i) => <NoteDisplay key={i} scale={note} major={true} low={false} />)
    return (
        <div className="MajorScales">
            <div className="scales">{scales}</div>
        </div>);
}
export default MajorScales;
