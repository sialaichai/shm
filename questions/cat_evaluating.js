export const data = [
    {
        level: 4,
        category: "Evaluating",
        question: "Why time a pendulum from equilibrium instead of max displacement?",
        options: [
            { text: "Bob moves slowest", correct: false },
            { text: "Bob moves fastest (less uncertainty)", correct: true },
            { text: "Amplitude decreases", correct: false },
            { text: "Force is max", correct: false }
        ],
        feedback: "Correct! High speed minimizes error in judging when it crosses the line."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Why choose Critical Damping for car suspension?",
        options: [
            { text: "Stops movement instantly", correct: false },
            { text: "Return to equilibrium fast without oscillation", correct: true },
            { text: "Allows gentle oscillation", correct: false },
            { text: "Stiffest ride", correct: false }
        ],
        feedback: "Correct! Best compromise for safety and comfort."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Refute claim: 'Bouncing ball is SHM'.",
        options: [
            { text: "Amplitude decreases", correct: false },
            { text: "Period depends on height", correct: false },
            { text: "Acceleration is constant $g$ (not $\\propto -x$)", correct: true },
            { text: "Collision inelastic", correct: false }
        ],
        feedback: "Correct! SHM requires restoring force proportional to displacement."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Why break step on a bridge?",
        options: [
            { text: "Increase damping", correct: false },
            { text: "Reduce force magnitude", correct: false },
            { text: "Prevent resonance (randomize frequency)", correct: true },
            { text: "Shift natural frequency", correct: false }
        ],
        feedback: "Correct! Coherent driving force at natural frequency causes dangerous resonance."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Pendulum clock runs slow (hot day). Adjustment?",
        options: [
            { text: "Increase mass", correct: false },
            { text: "Decrease mass", correct: false },
            { text: "Raise bob (shorten L)", correct: true },
            { text: "Lower bob (lengthen L)", correct: false }
        ],
        feedback: "Correct! Thermal expansion increased L. Raising bob reduces L to decrease T."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Radio tuning: Sharp peak (High Q) vs Broad peak?",
        options: [
            { text: "Sharp (High Q) for selectivity", correct: true },
            { text: "Broad for energy", correct: false },
            { text: "Sharp for stability", correct: false },
            { text: "Broad for drift", correct: false }
        ],
        feedback: "Correct! High Q allows you to pick one station and reject neighbors."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "$T^2$ vs $m$ graph has intercept. Experiment failed?",
        options: [
            { text: "Yes, must be origin", correct: false },
            { text: "No, intercept is spring mass effect", correct: true },
            { text: "No, gravity changed", correct: false },
            { text: "Yes, elastic limit exceeded", correct: false }
        ],
        feedback: "Correct! The intercept allows calculation of the spring's effective mass."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Washing machine vibrates at spin-up then smooths. Diagnosis?",
        options: [
            { text: "Broken bearings", correct: false },
            { text: "Overloaded", correct: false },
            { text: "Transient Resonance (Normal)", correct: true },
            { text: "Unbalanced", correct: false }
        ],
        feedback: "Correct! It passed through the natural frequency during acceleration."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "How does Tuned Mass Damper protect skyscrapers?",
        options: [
            { text: "Lowers center of gravity", correct: false },
            { text: "Reinforces rigidity", correct: false },
            { text: "Oscillates out of phase (absorbs energy)", correct: true },
            { text: "Windbreaker", correct: false }
        ],
        feedback: "Correct! It sways in opposition to the building, damping the motion."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Large amplitude ($60^\\circ$) pendulum period prediction fails. Why?",
        options: [
            { text: "Air resistance", correct: false },
            { text: "Small angle approx fails", correct: true },
            { text: "Measured wrong length", correct: false },
            { text: "Period decreases", correct: false }
        ],
        feedback: "Correct! SHM equation assumes $\\sin\\theta \\approx \\theta$, valid only for small angles."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Minimize frequency with two springs?",
        options: [
            { text: "Parallel (stiffer)", correct: false },
            { text: "Parallel (shared load)", correct: false },
            { text: "Series (halved stiffness)", correct: true },
            { text: "Series (more extension)", correct: false }
        ],
        feedback: "Correct! Series connection reduces effective k, lowering frequency."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Speaker diaphragm damping choice?",
        options: [
            { text: "Zero", correct: false },
            { text: "Light", correct: false },
            { text: "Critical (stop ringing)", correct: true },
            { text: "Heavy", correct: false }
        ],
        feedback: "Correct! Critical damping ensures accurate sound reproduction without after-vibrations."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Total Energy = Peak of KE vs x graph. Condition?",
        options: [
            { text: "Always", correct: false },
            { text: "Only if PE=0 at equilibrium", correct: true },
            { text: "Only if heavily damped", correct: false },
            { text: "Only if PE max at equilibrium", correct: false }
        ],
        feedback: "Correct! Total Energy = Max KE only if potential energy reference is zero at equilibrium."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Driven pendulum phase lag is $\\pi/2$. Conclusion?",
        options: [
            { text: "Shorter than driver", correct: false },
            { text: "Longer than driver", correct: false },
            { text: "Resonance (Natural freq matches)", correct: true },
            { text: "Heavy damping", correct: false }
        ],
        feedback: "Correct! $\\pi/2$ phase lag is the signature of resonance."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Pendulum period decreases in lift. Lift motion?",
        options: [
            { text: "Up constant v", correct: false },
            { text: "Accelerating up", correct: true },
            { text: "Down constant v", correct: false },
            { text: "Accelerating down", correct: false }
        ],
        feedback: "Correct! Upward acceleration adds to g ($g_{eff} = g+a$), increasing restoring force."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Clay dropped on block at equilibrium. Amplitude?",
        options: [
            { text: "Same", correct: false },
            { text: "Increases", correct: false },
            { text: "Decreases (KE lost)", correct: true },
            { text: "Decreases (freq increases)", correct: false }
        ],
        feedback: "Correct! Inelastic collision reduces KE. Lower KE means lower new max PE (Amplitude)."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Pendulum as accelerometer ($\tan \theta = a/g$). Valid?",
        options: [
            { text: "No, oscillates wildly", correct: false },
            { text: "Yes, valid physics", correct: true },
            { text: "Yes, sine theta", correct: false },
            { text: "Only if damped", correct: false }
        ],
        feedback: "Correct! The equilibrium angle shifts due to the inertial force $ma$."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "$x(0) = x_0/2$, moving to equilibrium. Phase?",
        options: [
            { text: "Incorrect", correct: false },
            { text: "-$\\pi/3$", correct: false },
            { text: "$\\pi/3$", correct: true },
            { text: "$\\pi/6$", correct: false }
        ],
        feedback: "Correct! $\\cos(\\pi/3)=0.5$. Positive phase makes velocity (sine) negative (towards 0)."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Sys 1 decays in 4 cycles, Sys 2 in 8. Which is more damped?",
        options: [
            { text: "Sys 1; Energy loss constant", correct: false },
            { text: "Sys 1; Fraction energy loss constant", correct: true },
            { text: "Sys 2; Energy loss constant", correct: false },
            { text: "Sys 2; Fraction loss constant", correct: false }
        ],
        feedback: "Correct! Faster decay = Higher damping. Fraction of energy lost is constant per cycle."
    },
    {
        level: 4,
        category: "Evaluating",
        question: "Energy harvester natural freq set to 2Hz for walking. Evaluation?",
        options: [
            { text: "Poor (too low)", correct: false },
            { text: "Good (matches walking cadence)", correct: true },
            { text: "Poor (too sharp)", correct: false },
            { text: "Good (magnetic flux)", correct: false }
        ],
        feedback: "Correct! Walking is ~2 steps/sec. Matching freq uses resonance to maximize power."
    }
];
