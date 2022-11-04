import * as Tone from 'tone'
import { v4 as uuid } from 'uuid';

class InstrumentUtils {
    private static instrument = new Tone.Synth().toDestination();
    private static instruments: any = {};
    private static userTriggeredStop = false;

    static playTones(notes: string[], callBack: (id: string) => void): string {
        this.userTriggeredStop = false;
        if (this.instrument) {
            this.instrument.volume.value = -1200;
        }

        const newInstrument = new Tone.Synth().toDestination();
        const instrumentId = uuid();
        this.instruments[instrumentId] = newInstrument;

        newInstrument.onsilence = () => {
            newInstrument.dispose();
            const { [instrumentId]: disposedInstrument, ...otherInstruments } = this.instruments;
            this.instruments = otherInstruments || {};
            if (callBack && Object.keys(this.instruments).length === 0) {
                callBack(instrumentId);
            }
        };
        const now = Tone.now();
        notes.forEach((note, i) => newInstrument.triggerAttackRelease(note.split('/')[0], "6n", now + i));
        this.instrument = newInstrument;
        return instrumentId;
    }

    static stopPlaying() {
        this.instrument.volume.value = -1200;
        this.userTriggeredStop = true;
    }

    static isPlaying(): boolean {
        return Object.keys(this.instruments).length > 0 && !this.userTriggeredStop;
    }
}

export default InstrumentUtils;
