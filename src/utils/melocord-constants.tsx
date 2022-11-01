export const OCTAVE = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
export const MAJOR_SCALE_STEPS = [2, 2, 1, 2, 2, 2, 1];
export const MINOR_SCALE_STEPS = [2, 1, 2, 2, 1, 2, 2]
export const OCTAVE_BREAKER = "C";
export const LOW_OCTAVE = 3;
export const HIGH_OCTAVE = 4;
export const NATURAL_NOTES = OCTAVE.filter(note => !note.includes("#"));
export const MAJOR = 'major';
export const MINOR = 'minor';