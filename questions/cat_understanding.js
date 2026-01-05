export const data = [
    {
        level: 2,
        category: "Understanding",
        question: "What is the physical significance of the negative sign in $a = -\\omega^2 x$?",
        options: [
            { text: "Acceleration is constant negative", correct: false },
            { text: "Velocity decreases as x increases", correct: false },
            { text: "Acceleration opposes displacement", correct: true },
            { text: "Motion is only negative", correct: false }
        ],
        feedback: "Correct! The restoring force and acceleration are directed towards equilibrium, opposite to displacement."
    },
    {
        level: 2,
        category: "Understanding",
        question: "In SHM, what is the relationship between kinetic energy ($E_k$) and potential energy ($E_p$)?",
        options: [
            { text: "They are always equal", correct: false },
            { text: "Sum is constant (if undamped)", correct: true },
            { text: "$E_k$ max when $E_p$ max", correct: false },
            { text: "$E_p$ increases as $E_k$ decreases", correct: false }
        ],
        feedback: "Correct! The total mechanical energy ($E_k + E_p$) is conserved."
    },
    {
        level: 2,
        category: "Understanding",
        question: "The gradient of an $a$ vs $x$ graph for SHM represents:",
        options: [
            { text: "$T^2$", correct: false },
            { text: "$f$", correct: false },
            { text: "$\\omega^2$", correct: true },
            { text: "Amplitude", correct: false }
        ],
        feedback: "Correct! Since $a = -\\omega^2 x$, the magnitude of the gradient is $\\omega^2$."
    },
    {
        level: 2,
        category: "Understanding",
        question: "If the mass of a simple pendulum is doubled, its period:",
        options: [
            { text: "Doubles", correct: false },
            { text: "Increases by $\\sqrt{2}$", correct: false },
            { text: "Remains unchanged", correct: true },
            { text: "Halves", correct: false }
        ],
        feedback: "Correct! Period of a pendulum depends on length and gravity, not mass."
    },
    {
        level: 2,
        category: "Understanding",
        question: "If the mass on a spring is doubled, the period:",
        options: [
            { text: "Remains unchanged", correct: false },
            { text: "Doubles", correct: false },
            { text: "Increases by $\\sqrt{2}$", correct: true },
            { text: "Decreases by $\\sqrt{2}$", correct: false }
        ],
        feedback: "Correct! $T = 2\\pi \\sqrt{m/k}$, so $T \\propto \\sqrt{m}$."
    },
    {
        level: 2,
        category: "Understanding",
        question: "Which graph represents Total Energy vs Displacement for an undamped oscillator?",
        options: [
            { text: "Straight line through origin", correct: false },
            { text: "Horizontal straight line", correct: true },
            { text: "Parabola opening up", correct: false },
            { text: "Inverted parabola", correct: false }
        ],
        feedback: "Correct! Total energy is constant regardless of displacement."
    },
    {
        level: 2,
        category: "Understanding",
        question: "Why does amplitude decrease in damped oscillations?",
        options: [
            { text: "Natural frequency decreases", correct: false },
            { text: "Restoring force weakens", correct: false },
            { text: "Work done against resistance", correct: true },
            { text: "KE converts to PE only", correct: false }
        ],
        feedback: "Correct! Energy is dissipated doing work against resistive forces."
    },
    {
        level: 2,
        category: "Understanding",
        question: "What happens to the phase difference between driver and oscillator at resonance?",
        options: [
            { text: "Remains 0", correct: false },
            { text: "Passes through $\\pi/2$", correct: true },
            { text: "Changes $\\pi$ to 0", correct: false },
            { text: "Remains $\\pi/2$", correct: false }
        ],
        feedback: "Correct! The phase difference is $\\pi/2$ radians at resonance."
    },
    {
        level: 2,
        category: "Understanding",
        question: "Difference between free and forced oscillations?",
        options: [
            { text: "Free has variable amplitude", correct: false },
            { text: "Free at natural freq; Forced at driving freq", correct: true },
            { text: "Free has no forces", correct: false },
            { text: "Forced never decays", correct: false }
        ],
        feedback: "Correct! Free oscillations occur at natural frequency; forced follow the driver."
    },
    {
        level: 2,
        category: "Understanding",
        question: "Effect of increased damping on resonance curve?",
        options: [
            { text: "Peak higher and sharper", correct: false },
            { text: "Peak lower and broader", correct: true },
            { text: "Resonant freq shifts up", correct: false },
            { text: "Curve shifts up", correct: false }
        ],
        feedback: "Correct! Damping flattens the peak (lower amplitude) and broadens the bandwidth."
    },
    {
        level: 2,
        category: "Understanding",
        question: "Why are car shocks critically damped?",
        options: [
            { text: "To oscillate longer", correct: false },
            { text: "Return to equilibrium fast without overshoot", correct: true },
            { text: "Prevent movement", correct: false },
            { text: "Increase natural frequency", correct: false }
        ],
        feedback: "Correct! Critical damping prevents bouncing and restores stability quickly."
    },
    {
        level: 2,
        category: "Understanding",
        question: "If SHM frequency is $f$, what is the Kinetic Energy frequency?",
        options: [
            { text: "$f/2$", correct: false },
            { text: "$f$", correct: false },
            { text: "$2f$", correct: true },
            { text: "Non-periodic", correct: false }
        ],
        feedback: "Correct! Energy peaks twice per cycle (at $+v_{max}$ and $-v_{max}$)."
    },
    {
        level: 2,
        category: "Understanding",
        question: "Which feature shows velocity leads displacement by $\\pi/2$?",
        options: [
            { text: "v is zero when x is zero", correct: false },
            { text: "v is max positive when x is zero (going +)", correct: true },
            { text: "v is max positive when x is zero (going -)", correct: false },
            { text: "Peaks align", correct: false }
        ],
        feedback: "Correct! Maximum velocity occurs as it passes equilibrium."
    },
    {
        level: 2,
        category: "Understanding",
        question: "Where is acceleration magnitude maximum?",
        options: [
            { text: "Equilibrium", correct: false },
            { text: "Maximum displacement", correct: true },
            { text: "Midway", correct: false },
            { text: "Constant everywhere", correct: false }
        ],
        feedback: "Correct! $a = -\\omega^2 x$, so acceleration is max when displacement $x$ is max."
    },
    {
        level: 2,
        category: "Understanding",
        question: "If amplitude is doubled, max velocity:",
        options: [
            { text: "Remains same", correct: false },
            { text: "Doubles", correct: true },
            { text: "Quadruples", correct: false },
            { text: "Increases by $\\sqrt{2}$", correct: false }
        ],
        feedback: "Correct! $v_{max} = \\omega x_0$, so doubling $x_0$ doubles $v_{max}$."
    },
    {
        level: 2,
        category: "Understanding",
        question: "The shape of the $v$ vs $x$ graph in SHM is:",
        options: [
            { text: "Straight line", correct: false },
            { text: "Sine wave", correct: false },
            { text: "Ellipse", correct: true },
            { text: "Parabola", correct: false }
        ],
        feedback: "Correct! The relationship follows $\\frac{v^2}{v_{max}^2} + \\frac{x^2}{x_0^2} = 1$."
    },
    {
        level: 2,
        category: "Understanding",
        question: "A boy stands up on a swing. The period:",
        options: [
            { text: "Decreases (length decreases)", correct: true },
            { text: "Increases (length increases)", correct: false },
            { text: "Stays same", correct: false },
            { text: "Decreases (PE increases)", correct: false }
        ],
        feedback: "Correct! Standing raises the center of mass, shortening effective length $L$, reducing $T$."
    },
    {
        level: 2,
        category: "Understanding",
        question: "In heavy damping, the system:",
        options: [
            { text: "Oscillates with decay", correct: false },
            { text: "Returns slowly without oscillating", correct: true },
            { text: "Returns instantly", correct: false },
            { text: "Oscillates constantly", correct: false }
        ],
        feedback: "Correct! Heavy damping prevents oscillation but causes a sluggish return."
    },
    {
        level: 2,
        category: "Understanding",
        question: "Spring P ($k$) vs Q ($2k$) with same mass. Which has higher $\\omega$?",
        options: [
            { text: "P", correct: false },
            { text: "Q", correct: true },
            { text: "Same", correct: false },
            { text: "Unknown", correct: false }
        ],
        feedback: "Correct! $\\omega = \\sqrt{k/m}$. Higher $k$ means higher frequency."
    },
    {
        level: 2,
        category: "Understanding",
        question: "Difference between transient and steady-state oscillations?",
        options: [
            { text: "Transient at driver freq", correct: false },
            { text: "Transient caused by damping", correct: false },
            { text: "Transient dies out; steady-state persists", correct: true },
            { text: "Transient has constant amp", correct: false }
        ],
        feedback: "Correct! Transients decay, leaving only the steady-state forced oscillation."
    }
];
