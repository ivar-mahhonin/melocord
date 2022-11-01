import React from 'react';
import Vex from 'vexflow'
import ScalesUtils from '../../utils/scales-utils';
import './NoteDisplay.scss';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/Routes';
import { MAJOR, MINOR } from '../../utils/melocord-constants';
const { Factory } = Vex.Flow;

interface NoteDisplayProps {
    scale: string;
    major: boolean;
}

const NoteDisplay = ({ scale, major }: NoteDisplayProps) => {
    const id = uuidv4();
    let rendered = false;

    const navigate = useNavigate();
    const selectScale = () => navigate(
        ROUTES.SELECTED_SCALE.replace(':type', major ? MAJOR : MINOR).replace(':note', scale)
    );

    React.useEffect(() => {
        if (!rendered) {
            const factory = new Factory({ renderer: { elementId: id } });
            const score = factory.EasyScore();
            const system = factory.System({ width: 280, spaceBetweenStaves: 10 });
            const notes = ScalesUtils.makeScale(scale, major, false);
            const voice = score.voice(score.notes(notes), { time: '7/4' });
            system.addStave({ voices: [voice] }).addClef('treble');
            factory.draw();
            rendered = true;
        }
    }, []);

    return (
        <div className="NoteDisplay card" onClick={selectScale}>
            <div className="label">{scale} {major ? MAJOR : MINOR} scale</div>
            <div className="scale-drawing" id={id} />
        </div>);
}

export default NoteDisplay;
