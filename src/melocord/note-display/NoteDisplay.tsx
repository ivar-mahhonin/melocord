import React from 'react';
import Vex from 'vexflow'
import ScalesUtils from '../../utils/scales-utils';
import './NoteDisplay.scss';
import { v4 as uuidv4 } from 'uuid';
const { Factory } = Vex.Flow;

interface NoteDisplayProps {
    scale: string;
    major: boolean;
    low: boolean;
}

const NoteDisplay = ({ scale, major, low }: NoteDisplayProps) => {
    const id = uuidv4();
    let rendered = false;

    React.useEffect(() => {
        if (!rendered) {
            const factory = new Factory({ renderer: { elementId: id } });
            const score = factory.EasyScore();
            const system = factory.System({ width: 280, spaceBetweenStaves: 10 });
            const notes = ScalesUtils.makeScale(scale, major, low);
            const voice = score.voice(score.notes(notes), { time: '7/4' });
            system.addStave({ voices: [voice] }).addClef('treble');
            factory.draw();
            rendered = true;
        }

    }, []);

    return (
        <div className="NoteDisplay">
            <div className="label">{scale} {major ? 'major' : 'minor'} scale</div>
            <div className="scale-drawing" id={id} />
        </div>);
}

export default NoteDisplay;
