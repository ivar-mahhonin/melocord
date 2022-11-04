import * as Tone from 'tone'
import { v4 as uuid } from 'uuid';

class InstrumentUtils {
    private static instrument = new Tone.Synth().toDestination();
    private static instruments: any = {};
    private static userTriggeredStop = false;
    private static previousInterval: NodeJS.Timer;

    static playTones(notes: string[], callBackOnBeat: (timer: NodeJS.Timer) => void, callBackOnStop: (id: string) => void): string {
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
            if (callBackOnStop && Object.keys(this.instruments).length === 0) {
                callBackOnStop(instrumentId);
            }
        };
        const now = Tone.now();
        notes.forEach((note, i) => newInstrument.triggerAttackRelease(note.split('/').join(''), "6n", now + i));
        this.instrument = newInstrument;

        this.previousInterval = setInterval(() => callBackOnBeat(this.previousInterval), 1000);
        callBackOnBeat(this.previousInterval);
        
        return instrumentId;
    }

    static stopPlaying() {
        clearInterval(this.previousInterval);
        this.instrument.volume.value = -1200;
        this.userTriggeredStop = true;
    }

    static isPlaying(): boolean {
        return Object.keys(this.instruments).length > 0 && !this.userTriggeredStop;
    }
}

export default InstrumentUtils;
