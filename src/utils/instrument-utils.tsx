import * as Tone from 'tone'
import { Sampler } from 'tone';
import { SAMPLER_CONFIGS, SAMPLES_URL } from './melocord-constants';

class InstrumentUtils {
    private static interval: NodeJS.Timer;
    private static sampler: Sampler = this.configure();
    private static playing = false;

    static playTones(notes: string[], callBackOnBeat: (timer: NodeJS.Timer) => void, callBackOnStop: () => void): void {
        this.resetSampler();
        Tone.loaded().then(() => {
            this.playing = true;

            const now = Tone.now();
            notes.forEach((note, i) => this.sampler.triggerAttackRelease(note.split('/').join(''), "6n", now + i));

            let intervalCount = 1;

            this.interval = setInterval(() => {
                intervalCount += 1;
                if (intervalCount > notes.length) {
                    this.stopPlaying();
                    callBackOnStop();
                }
                else {
                    callBackOnBeat(this.interval);
                }
            }, 1000);
            callBackOnBeat(this.interval);
        })
    }

    static stopPlaying() {
        this.resetSampler();
        clearInterval(this.interval);
        this.playing = false;
    }

    static isPlaying(): boolean {
        return this.playing;
    }

    private static resetSampler(): void {
        this.sampler.dispose();
        this.sampler = this.configure();
    }
    private static configure(): Sampler {
        return new Tone.Sampler({
            urls: SAMPLER_CONFIGS,
            release: 1,
            baseUrl: SAMPLES_URL,
        }).toDestination();
    }
}

export default InstrumentUtils;
