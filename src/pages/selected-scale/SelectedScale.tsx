import React from "react";
import NoteDisplay from "../../components/note-display/NoteDisplay";
import {
    useParams
} from "react-router-dom";
import './SelectedScale.scss'
import { MAJOR } from "../../utils/melocord-constants";


const SelectedScale = (match: any) => {
    const { type, note } = useParams();

    React.useEffect(() => {
        console.log(type, note);
    }, []);


    return (<div className="SelectedScale">
        <NoteDisplay scale={note || ''} major={type === MAJOR} />
    </div>);
}

export default SelectedScale;