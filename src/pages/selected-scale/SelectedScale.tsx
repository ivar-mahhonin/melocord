import React from "react";
import NoteDisplay from "../../components/note-display/NoteDisplay";
import {
    useParams
} from "react-router-dom";
import './SelectedScale.scss'
import { MAJOR } from "../../utils/melocord-constants";


const SelectedScale = () => {
    const { type, note } = useParams();
    return (<div className="SelectedScale">
        <NoteDisplay scale={note || ''} major={type === MAJOR} withHoverEffect={false} showPlayButton={true}/>
    </div>);
}

export default SelectedScale;