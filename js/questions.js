// questions.js
import { data as remembering } from '../questions/cat_remembering.js';
import { data as understanding } from '../questions/cat_understanding.js';
import { data as applying } from '../questions/cat_applying.js';
import { data as analyzing } from '../questions/cat_analyzing.js';
import { data as evaluating } from '../questions/cat_evaluating.js';

// Combine all into one master list
export const Questions = [
    ...remembering,
    ...understanding,
    ...applying,
    ...analyzing,
    ...evaluating
];

// Helper to pick a random question for a specific level
export function getQuestion(level) {
    // Note: Use 'level' to filter, or if you prefer by Category name, you can change logic here.
    const pool = Questions.filter(q => q.level === level);
    
    if (pool.length === 0) {
        console.warn(`No questions found for level ${level}. Returning random.`);
        return Questions[Math.floor(Math.random() * Questions.length)];
    }
    return pool[Math.floor(Math.random() * pool.length)];
}
