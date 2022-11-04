import * as Tone from 'tone'
import { Sampler } from 'tone';

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
            urls: {
                'F#2': 'Fs2.mp3',
                'F#3': 'Fs3.mp3',
                'F#4': 'Fs4.mp3',
                'F#5': 'Fs5.mp3',
                'G3': 'G3.mp3',
                'G5': 'G3.mp3',
                'G#2': 'Gs2.mp3',
                'G#4': 'Gs4.mp3',
                'G#5': 'Gs5.mp3',
                'A2': 'A2.mp3',
                'A3': 'A3.mp3',
                'A4': 'A4.mp3',
                'A5': 'A5.mp3',
                'A#5': 'As5.mp3',
                'B1': 'B1.mp3',
                'B2': 'B2.mp3',
                'B3': 'B3.mp3',
                'B4': 'B4.mp3',
                'C#3': 'Cs3.mp3',
                'C#4': 'Cs4.mp3',
                'C#5': 'Cs5.mp3',
                'D2': 'D2.mp3',
                'D3': 'D3.mp3',
                'D5': 'D5.mp3',
                'D#4': 'Ds4.mp3',
                'E2': 'E2.mp3',
                'E3': 'E3.mp3',
                'E4': 'E4.mp3',
                'E5': 'E5.mp3'
            },
            release: 1,
            baseUrl: "/samples/guitar/",
        }).toDestination();
    }
}

export default InstrumentUtils;
