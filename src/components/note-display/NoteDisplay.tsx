import React, { useState } from 'react';
import Vex from 'vexflow'
import ScalesUtils from '../../utils/scales-utils';
import './NoteDisplay.scss';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/Routes';
import { MAJOR, MINOR } from '../../utils/melocord-constants';
import { Button } from '@mui/material';
import { PlayCircle, StopCircle } from '@mui/icons-material';
import InstrumentUtils from '../../utils/instrument-utils';

const { Factory } = Vex.Flow;

interface NoteDisplayProps {
    scale: string;
    major: boolean;
    withHoverEffect?: boolean;
    showPlayButton?: boolean;
}

const NoteDisplay = ({ scale, major, withHoverEffect = true, showPlayButton = false }: NoteDisplayProps) => {
    const [{ playing }, setState] = useState({ playing: InstrumentUtils.isPlaying() });

    const id = uuidv4();
    let rendered = false;
    const notes: string[] = ScalesUtils.makeScaleNotes(scale, major, false); // FIXME

    React.useEffect(() => {
        if (!rendered) {
            const factory = new Factory({ renderer: { elementId: id } });
            const score = factory.EasyScore();
            const system = factory.System({ width: 280, spaceBetweenStaves: 10 });
            const voice = score.voice(score.notes(notes.join(', ')), { time: '7/4' });
            system.addStave({ voices: [voice] }).addClef('treble');
            factory.draw();
            rendered = true;
        }
    }, []);

    React.useEffect(() => () => InstrumentUtils.stopPlaying(), [])

    const navigate = useNavigate();

    const selectScale = () => navigate(ROUTES.SELECTED_SCALE.replace(':type', major ? MAJOR : MINOR).replace(':note', scale));

    const playTones = () => {
        if (InstrumentUtils.isPlaying()) {
            InstrumentUtils.stopPlaying();
            setState({playing: false});
        }
        else {
            setState({playing: true});
            InstrumentUtils.playTones(notes, () => setState({playing: false}));
        }
    }

    const renderPlayButton = () => {
        let button;
        if (showPlayButton) {
            const icon = playing ? <StopCircle /> : <PlayCircle />;
            button = (<div className="play-button">
                <Button variant="contained" endIcon={icon} onClick={playTones}>
                    Play
                </Button>
            </div>);
        }
        return button;
    }

    return (
        <div className={`NoteDisplay ${withHoverEffect ? 'with-hover' : ''}`} onClick={selectScale}>
            {renderPlayButton()}
            <div className="label">{scale} {major ? MAJOR : MINOR} scale</div>
            <div className="scale-drawing" id={id} />
        </div>);
}

export default NoteDisplay;
