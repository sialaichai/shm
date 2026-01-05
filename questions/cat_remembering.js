export const data = [
    {
        level: 1,
        category: "Remembering",
        question: "Which equation defines Simple Harmonic Motion (SHM)?",
        options: [
            { text: "$a = \\omega x$", correct: false },
            { text: "$a = -\\omega x$", correct: false },
            { text: "$a = \\omega^2 x$", correct: false },
            { text: "$a = -\\omega^2 x$", correct: true }
        ],
        feedback: "Correct! The defining equation is $a = -\\omega^2 x$."
    },
    {
        level: 1,
        category: "Remembering",
        question: "What is the relationship between the period $T$ and the angular frequency $\\omega$?",
        options: [
            { text: "$T = \\pi / \\omega$", correct: false },
            { text: "$T = 2\\pi \\omega$", correct: false },
            { text: "$T = 2\\pi / \\omega$", correct: true },
            { text: "$T = \\omega / 2\\pi$", correct: false }
        ],
        feedback: "Correct! $T = \\frac{2\\pi}{\\omega}$."
    },
    {
        level: 1,
        category: "Remembering",
        question: "In the equation $x = x_0 \\sin(\\omega t)$, what does $x_0$ represent?",
        options: [
            { text: "Displacement", correct: false },
            { text: "Amplitude", correct: true },
            { text: "Phase", correct: false },
            { text: "Angular frequency", correct: false }
        ],
        feedback: "Correct! $x_0$ represents the amplitude (maximum displacement)."
    },
    {
        level: 1,
        category: "Remembering",
        question: "Which term describes an oscillation where there is no net energy transfer to or from the system?",
        options: [
            { text: "Damped oscillation", correct: false },
            { text: "Forced oscillation", correct: false },
            { text: "Free oscillation", correct: true },
            { text: "Resonant oscillation", correct: false }
        ],
        feedback: "Correct! Free oscillations occur without external forces or energy loss."
    },
    {
        level: 1,
        category: "Remembering",
        question: "What is the phase difference between displacement and velocity in SHM?",
        options: [
            { text: "0 rad", correct: false },
            { text: "$\\pi/2$ rad", correct: true },
            { text: "$\\pi$ rad", correct: false },
            { text: "$2\\pi$ rad", correct: false }
        ],
        feedback: "Correct! Velocity leads displacement by $\\pi/2$ radians."
    },
    {
        level: 1,
        category: "Remembering",
        question: "What is the phase difference between displacement and acceleration in SHM?",
        options: [
            { text: "0 rad", correct: false },
            { text: "$\\pi/2$ rad", correct: false },
            { text: "$\\pi$ rad", correct: true },
            { text: "$3\\pi/2$ rad", correct: false }
        ],
        feedback: "Correct! Acceleration is in antiphase ($\\pi$ radians) with displacement."
    },
    {
        level: 1,
        category: "Remembering",
        question: "Which formula correctly gives the maximum speed $v_{max}$ of a particle in SHM?",
        options: [
            { text: "$v_{max} = \\omega x_0$", correct: true },
            { text: "$v_{max} = \\omega^2 x_0$", correct: false },
            { text: "$v_{max} = x_0 / \\omega$", correct: false },
            { text: "$v_{max} = \\frac{1}{2} \\omega x_0^2$", correct: false }
        ],
        feedback: "Correct! $v_{max} = \\omega x_0$."
    },
    {
        level: 1,
        category: "Remembering",
        question: "Which formula correctly gives the magnitude of the maximum acceleration $a_{max}$?",
        options: [
            { text: "$a_{max} = \\omega x_0$", correct: false },
            { text: "$a_{max} = \\omega^2 x_0$", correct: true },
            { text: "$a_{max} = \\omega x_0^2$", correct: false },
            { text: "$a_{max} = x_0 / \\omega^2$", correct: false }
        ],
        feedback: "Correct! $a_{max} = \\omega^2 x_0$."
    },
    {
        level: 1,
        category: "Remembering",
        question: "What is the standard unit for angular frequency $\\omega$?",
        options: [
            { text: "Hertz (Hz)", correct: false },
            { text: "m s$^{-1}$", correct: false },
            { text: "rad s$^{-1}$", correct: true },
            { text: "deg s$^{-1}$", correct: false }
        ],
        feedback: "Correct! Angular frequency is measured in radians per second."
    },
    {
        level: 1,
        category: "Remembering",
        question: "Which condition best defines 'Critical Damping'?",
        options: [
            { text: "Amplitude decreases exponentially", correct: false },
            { text: "Returns to equilibrium in shortest time without oscillating", correct: true },
            { text: "Oscillates with increasing amplitude", correct: false },
            { text: "Returns to equilibrium very slowly", correct: false }
        ],
        feedback: "Correct! It is the fastest return to equilibrium without overshoot."
    },
    {
        level: 1,
        category: "Remembering",
        question: "Resonance occurs when the driving frequency matches the:",
        options: [
            { text: "Damping frequency", correct: false },
            { text: "Rectification frequency", correct: false },
            { text: "Natural frequency", correct: true },
            { text: "Diffraction frequency", correct: false }
        ],
        feedback: "Correct! Resonance occurs at the system's natural frequency."
    },
    {
        level: 1,
        category: "Remembering",
        question: "Which expression represents total energy of a mass $m$ with amplitude $x_0$?",
        options: [
            { text: "$\\frac{1}{2} m \\omega x_0$", correct: false },
            { text: "$\\frac{1}{2} m \\omega^2 x_0$", correct: false },
            { text: "$\\frac{1}{2} m \\omega x_0^2$", correct: false },
            { text: "$\\frac{1}{2} m \\omega^2 x_0^2$", correct: true }
        ],
        feedback: "Correct! Total energy $E = \\frac{1}{2} m \\omega^2 x_0^2$."
    },
    {
        level: 1,
        category: "Remembering",
        question: "In $v = \\pm \\omega \\sqrt{x_0^2 - x^2}$, what does $x$ represent?",
        options: [
            { text: "Amplitude", correct: false },
            { text: "Instantaneous displacement", correct: true },
            { text: "Period", correct: false },
            { text: "Initial phase", correct: false }
        ],
        feedback: "Correct! $x$ is the instantaneous displacement from equilibrium."
    },
    {
        level: 1,
        category: "Remembering",
        question: "Which type of damping results in a very slow return to equilibrium without oscillating?",
        options: [
            { text: "Light damping", correct: false },
            { text: "Critical damping", correct: false },
            { text: "Heavy (Over) damping", correct: true },
            { text: "Zero damping", correct: false }
        ],
        feedback: "Correct! Heavy damping causes a sluggish return to equilibrium."
    },
    {
        level: 1,
        category: "Remembering",
        question: "For a simple pendulum of length $L$, the period $T$ is proportional to:",
        options: [
            { text: "$L$", correct: false },
            { text: "$L^2$", correct: false },
            { text: "$\\sqrt{L}$", correct: true },
            { text: "$1/\\sqrt{L}$", correct: false }
        ],
        feedback: "Correct! $T \\propto \\sqrt{L}$."
    },
    {
        level: 1,
        category: "Remembering",
        question: "The restoring force in a spring-mass system is directly proportional to:",
        options: [
            { text: "Velocity", correct: false },
            { text: "Acceleration squared", correct: false },
            { text: "Displacement", correct: true },
            { text: "Time", correct: false }
        ],
        feedback: "Correct! Hooke's Law: $F = -kx$."
    },
    {
        level: 1,
        category: "Remembering",
        question: "What happens to the total energy of a damped oscillating system over time?",
        options: [
            { text: "Remains constant", correct: false },
            { text: "Increases linearly", correct: false },
            { text: "Decreases", correct: true },
            { text: "Fluctuates sinusoidally", correct: false }
        ],
        feedback: "Correct! Energy is dissipated against resistive forces."
    },
    {
        level: 1,
        category: "Remembering",
        question: "In $x = x_0 \\sin(\\omega t + \\phi)$, what does $\\phi$ represent?",
        options: [
            { text: "Angular frequency", correct: false },
            { text: "Period", correct: false },
            { text: "Phase constant", correct: true },
            { text: "Resonance", correct: false }
        ],
        feedback: "Correct! $\\phi$ is the phase constant or initial phase."
    },
    {
        level: 1,
        category: "Remembering",
        question: "Which of the following is an example of useful resonance?",
        options: [
            { text: "Bridge collapsing", correct: false },
            { text: "Resonance tube experiment", correct: true },
            { text: "Rattling windows", correct: false },
            { text: "Violent machinery vibration", correct: false }
        ],
        feedback: "Correct! Resonance tubes are used to determine the speed of sound."
    },
    {
        level: 1,
        category: "Remembering",
        question: "What is the defining characteristic of 'Light Damping'?",
        options: [
            { text: "Amplitude remains constant", correct: false },
            { text: "System does not oscillate", correct: false },
            { text: "Amplitude decays gradually", correct: true },
            { text: "Frequency increases with time", correct: false }
        ],
        feedback: "Correct! In light damping, the system oscillates with decaying amplitude."
    }
];
