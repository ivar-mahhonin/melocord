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
const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental, Factory } = Vex.Flow;

interface NoteDisplayProps {
    scale: string;
    major: boolean;
    withHoverEffect?: boolean;
    showPlayButton?: boolean;
}

const NoteDisplay = ({ scale, major, withHoverEffect = true, showPlayButton = false }: NoteDisplayProps) => {
    const [{ playing, staveNotes }, setState] = useState({ playing: InstrumentUtils.isPlaying(), staveNotes: [] as any[] });

    const elementId = uuidv4();
    let rendered = false;
    const notes: string[] = ScalesUtils.makeScaleNotes(scale, major); // FIXME

    React.useEffect(() => {
        if (!rendered) {
            const div = document.getElementById(elementId);
            if (div) {
                console.log(notes)
                const renderer = new Renderer(div, Renderer.Backends.SVG);
                renderer.resize(280, 120);
                const context = renderer.getContext();
                const stave = new Stave(10, 5, 260);
                stave.addClef('treble');
                stave.setContext(context).draw();

                const voice = new Voice({ num_beats: 7, beat_value: 4 });

                const staveNotes = notes.map(n => {
                    const note = new StaveNote({ keys: [n], duration: "q" });
                    if (n.includes('#')) {
                        note.addModifier(new Accidental("#"), 0);
                    }
                    return note;
                })

                voice.addTickables(staveNotes);
                new Formatter().joinVoices([voice]).format([voice], 220);
                voice.draw(context, stave);
                setState({ playing, staveNotes });
                rendered = true;
            }
        }
    }, []);

    React.useEffect(() => () => InstrumentUtils.stopPlaying(), [])

    const navigate = useNavigate();

    const selectScale = () => navigate(ROUTES.SELECTED_SCALE.replace(':type', major ? MAJOR : MINOR).replace(':note', scale));

    const playTones = () => {
        clearNotesStyles();
        if (InstrumentUtils.isPlaying()) {
            InstrumentUtils.stopPlaying();
            setState({ playing: false, staveNotes });
        }
        else {
            setState({ playing: true, staveNotes });

            const onStop = () => {
                setState({ playing: false, staveNotes });
                clearNotesStyles();
            };

            let beatTimes = 0;
            const onBeat = (timer: NodeJS.Timer) => {
                const index = beatTimes;
                const note = staveNotes[index];
                if (note) {
                    setNoteStyle(note, "#f44336");
                    beatTimes++;
                }
                else {
                    clearInterval(timer);
                    clearNotesStyles();
                }
            };

            InstrumentUtils.playTones(notes, onBeat, onStop);
        }
    }

    const setNoteStyle = (note: any, style: string) => {
        note.setStyle({ strokeStyle: style, fillStyle: style });
        note.draw();
    }

    const clearNotesStyles = () => staveNotes.forEach(note => setNoteStyle(note, "black"));
    
    const renderPlayButton = () => {
        let button;
        if (showPlayButton) {
            const icon = playing ? <StopCircle /> : <PlayCircle />;
            button = (<div className={`play-button ${playing ? 'stop' : ''}`}>
                <Button variant="contained" endIcon={icon} onClick={playTones}>
                    {playing ? 'Stop' : 'Play'}
                </Button>
            </div>);
        }
        return button;
    }

    return (
        <div className={`NoteDisplay ${withHoverEffect ? 'with-hover' : ''}`} onClick={selectScale}>
            {renderPlayButton()}
            <div className="label">{scale} {major ? MAJOR : MINOR} scale</div>
            <div className="scale-drawing" id={elementId} />
        </div>);
}

export default NoteDisplay;
