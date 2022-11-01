import { HIGH_OCTAVE, LOW_OCTAVE, MAJOR_SCALE_STEPS, MINOR_SCALE_STEPS, OCTAVE, OCTAVE_BREAKER } from "./melocord-constants";

class ScalesUtils {
    static makeScaleNotes(
        key: string,
        major: boolean,
        low: boolean,
        lowOctave = LOW_OCTAVE,
        hightOctave = HIGH_OCTAVE,
        octave = OCTAVE,
        octaveBreaker = OCTAVE_BREAKER): string[] {
        const stepsPattern = major ? MAJOR_SCALE_STEPS : MINOR_SCALE_STEPS
        const octavePitch = low ? lowOctave : hightOctave;
        const index = OCTAVE.findIndex(note => note === key);
        const sorted = this.shiftNotes([...octave], index);
        const scaleNotes = sorted.filter(n => n !== key).reduce(({ notes, step, pattern, fixOctave }, note) => {
            if (pattern[0] === step) {
                if (!fixOctave) {
                    fixOctave = note.includes(octaveBreaker) && key !== octaveBreaker;
                }
                notes = [...notes, `${note}${fixOctave ? (octavePitch + 1) : octavePitch}`];
                pattern.shift() as number;
                step = 1;
            }
            else {
                step += 1;
            }
            return { notes, step, pattern, fixOctave };
        }, { notes: [`${key}${octavePitch}`] as string[], pattern: [...stepsPattern], step: 1, fixOctave: false });
        return scaleNotes.notes.map(n => (`${n}/q`));
    }

    private static shiftNotes(array: string[], steps: number): string[] {
        return Array.from(Array(steps)).reduce((acc, val) => {
            acc.push(acc.shift())
            return acc;
        }, array);
    }
}

export default ScalesUtils;