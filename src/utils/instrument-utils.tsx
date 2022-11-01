import * as Tone from 'tone'
import { Synth } from 'tone';
import { v4 as uuidv } from 'uuid';

class InstrumentUtils {
    private static instrument = new Tone.Synth().toDestination();

    static playTones(notes: string[]) {
        if (this.instrument) {
            this.instrument.volume.value = -1200;
        }

        const newInstrument = new Tone.Synth().toDestination();

        newInstrument.onsilence = () => newInstrument.dispose();
        const now = Tone.now();
        notes.forEach((note, i) => newInstrument.triggerAttackRelease(note.split('/')[0], "6n", now + i));
        this.instrument = newInstrument;
    }

    static stopPlaying() {
        this.instrument.volume.value = -1200;
    }
}

export default InstrumentUtils;