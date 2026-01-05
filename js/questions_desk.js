export const Questions = [
    // =========================================================================
    // LEVEL 1: REMEMBERING (From SHM1.tex)
    // =========================================================================
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
    },

    // =========================================================================
    // LEVEL 2: UNDERSTANDING (From shm2.tex)
    // =========================================================================
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
            { text: "$E_p$ increases as $E_k$ decreases", correct: false } // While partially true, B is the conservation law
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
    },

    // =========================================================================
    // LEVEL 3: APPLYING (From shm3.tex)
    // =========================================================================
    {
        level: 3,
        category: "Applying",
        question: "Particle: $T=2.0s$, $A=5.0cm$. Max speed?",
        options: [
            { text: "$0.05\\pi$ m/s", correct: true },
            { text: "$0.10\\pi$ m/s", correct: false },
            { text: "$0.20\\pi$ m/s", correct: false },
            { text: "$5.0\\pi$ m/s", correct: false }
        ],
        feedback: "Correct! $v_{max} = A(2\\pi/T) = 0.05(\\pi) = 0.05\\pi$."
    },
    {
        level: 3,
        category: "Applying",
        question: "$m=0.2kg$, $x = 0.04\\sin(10t)$. Max restoring force?",
        options: [
            { text: "0.08 N", correct: false },
            { text: "0.40 N", correct: false },
            { text: "0.80 N", correct: true },
            { text: "4.00 N", correct: false }
        ],
        feedback: "Correct! $a_{max} = \\omega^2 A = 100(0.04) = 4$. $F=ma = 0.2(4) = 0.8N$."
    },
    {
        level: 3,
        category: "Applying",
        question: "Spring extends 10cm ($0.1m$) with 50g mass. Period of oscillation? ($g=10$)",
        options: [
            { text: "0.31 s", correct: false },
            { text: "0.63 s", correct: true },
            { text: "1.00 s", correct: false },
            { text: "2.00 s", correct: false }
        ],
        feedback: "Correct! $T = 2\\pi \\sqrt{m/k} = 2\\pi \\sqrt{e/g} = 2\\pi \\sqrt{0.01} \\approx 0.63s$."
    },
    {
        level: 3,
        category: "Applying",
        question: "At what displacement is speed half of max speed ($v_{max}/2$)?",
        options: [
            { text: "5.0 cm", correct: false },
            { text: "7.1 cm", correct: false },
            { text: "8.7 cm", correct: true },
            { text: "9.5 cm", correct: false }
        ],
        feedback: "Correct! $x = \\frac{\\sqrt{3}}{2}A \\approx 0.866(10) = 8.66$ cm."
    },
    {
        level: 3,
        category: "Applying",
        question: "Pendulum period is 1.5s. If gravity becomes $g/4$, new period?",
        options: [
            { text: "0.75 s", correct: false },
            { text: "1.5 s", correct: false },
            { text: "3.0 s", correct: true },
            { text: "6.0 s", correct: false }
        ],
        feedback: "Correct! $T \\propto 1/\\sqrt{g}$. Dividing $g$ by 4 multiplies $T$ by $\\sqrt{4}=2$."
    },
    {
        level: 3,
        category: "Applying",
        question: "Energy is E. If Amplitude doubles and Period halves, new Energy?",
        options: [
            { text: "E", correct: false },
            { text: "4E", correct: false },
            { text: "8E", correct: false },
            { text: "16E", correct: true }
        ],
        feedback: "Correct! $E \\propto \\omega^2 A^2$. Doubling A (x4) and halving T (doubling $\\omega$, x4) -> 16E."
    },
    {
        level: 3,
        category: "Applying",
        question: "$f=50Hz$, $A=2mm$. Accel at $x=1mm$?",
        options: [
            { text: "50 m/s²", correct: false },
            { text: "100 m/s²", correct: false },
            { text: "500 m/s²", correct: false },
            { text: "987 m/s²", correct: true }
        ],
        feedback: "Correct! $a = \\omega^2 x = (100\\pi)^2 (0.001) \\approx 987$."
    },
    {
        level: 3,
        category: "Applying",
        question: "Spring mass: Period 2s. Add 3kg -> Period 4s. Initial mass?",
        options: [
            { text: "1.0 kg", correct: true },
            { text: "1.5 kg", correct: false },
            { text: "3.0 kg", correct: false },
            { text: "4.0 kg", correct: false }
        ],
        feedback: "Correct! $T \\propto \\sqrt{m}$. Ratio 2 means mass ratio 4. $(m+3)/m = 4 \\rightarrow m=1$."
    },
    {
        level: 3,
        category: "Applying",
        question: "Ratio of time: equilibrium to $A/2$ ($t_1$) vs $A/2$ to $A$ ($t_2$)?",
        options: [
            { text: "1:1", correct: false },
            { text: "1:2", correct: true },
            { text: "1:√2", correct: false },
            { text: "1:√3", correct: false }
        ],
        feedback: "Correct! $t_1$ corresponds to $30^\\circ$ phase, $t_2$ to $60^\\circ$. Ratio 1:2."
    },
    {
        level: 3,
        category: "Applying",
        question: "Pendulum bob mass doubles (2m). Frequency?",
        options: [
            { text: "Decreases", correct: false },
            { text: "Unchanged", correct: true },
            { text: "Increases", correct: false },
            { text: "Doubles", correct: false }
        ],
        feedback: "Correct! Pendulum frequency is independent of mass."
    },
    {
        level: 3,
        category: "Applying",
        question: "At what displacement is $KE = 3 PE$?",
        options: [
            { text: "A/2", correct: true },
            { text: "A/√2", correct: false },
            { text: "A/3", correct: false },
            { text: "A/4", correct: false }
        ],
        feedback: "Correct! $E_{total} = 4 PE \\rightarrow \\frac{1}{2}kA^2 = 4(\\frac{1}{2}kx^2) \\rightarrow x = A/2$."
    },
    {
        level: 3,
        category: "Applying",
        question: "Two springs ($k_1, k_2$) in parallel. Effective $\\omega$?",
        options: [
            { text: "$\\sqrt{k_1 k_2 / m(k_1+k_2)}$", correct: false },
            { text: "$\\sqrt{(k_1 + k_2)/m}$", correct: true },
            { text: "$\\sqrt{m / (k_1 + k_2)}$", correct: false },
            { text: "$\\sqrt{m(k_1+k_2) / k_1 k_2}$", correct: false }
        ],
        feedback: "Correct! Parallel springs add: $k_{eff} = k_1 + k_2$."
    },
    {
        level: 3,
        category: "Applying",
        question: "$f=200Hz$, $A=0.5mm$. Max accel?",
        options: [
            { text: "200 m/s²", correct: false },
            { text: "395 m/s²", correct: false },
            { text: "790 m/s²", correct: true },
            { text: "1580 m/s²", correct: false }
        ],
        feedback: "Correct! $a = (2\\pi f)^2 A \\approx 1.58 \\times 10^6 \\times 0.0005 = 790$."
    },
    {
        level: 3,
        category: "Applying",
        question: "$m=0.5kg$, $A=10cm$, $\\omega=10$. KE at $x=6cm$?",
        options: [
            { text: "0.09 J", correct: false },
            { text: "0.16 J", correct: true },
            { text: "0.25 J", correct: false },
            { text: "0.34 J", correct: false }
        ],
        feedback: "Correct! $v = 10\\sqrt{0.1^2 - 0.06^2} = 0.8$. $KE = 0.5(0.5)(0.64) = 0.16J$."
    },
    {
        level: 3,
        category: "Applying",
        question: "Particle 2 has 2x Amplitude and 2x Period of Particle 1. Compare v and a.",
        options: [
            { text: "v same, a same", correct: false },
            { text: "v same, a halved", correct: true },
            { text: "v doubled, a halved", correct: false },
            { text: "v halved, a same", correct: false }
        ],
        feedback: "Correct! $\\omega$ is halved. $v \\propto \\omega A$ (same). $a \\propto \\omega^2 A$ (halved)."
    },
    {
        level: 3,
        category: "Applying",
        question: "Vertical spring stretches 9.8cm. Frequency?",
        options: [
            { text: "1.00 Hz", correct: false },
            { text: "1.59 Hz", correct: true },
            { text: "5.00 Hz", correct: false },
            { text: "10.0 Hz", correct: false }
        ],
        feedback: "Correct! $\\omega = \\sqrt{g/\\Delta L} = \\sqrt{100} = 10$. $f = 10/2\\pi \\approx 1.59$."
    },
    {
        level: 3,
        category: "Applying",
        question: "P leads Q by $\\pi/2$. If P is at max positive displacement, where is Q?",
        options: [
            { text: "Max positive", correct: false },
            { text: "Max negative", correct: false },
            { text: "Equilibrium (moving +)", correct: true },
            { text: "Equilibrium (moving -)", correct: false }
        ],
        feedback: "Correct! Q is $90^\\circ$ behind (at 0). Velocity is positive."
    },
    {
        level: 3,
        category: "Applying",
        question: "Platform oscillates vertical. Coin loses contact at:",
        options: [
            { text: "Never", correct: false },
            { text: "Lowest point", correct: false },
            { text: "Equilibrium", correct: false },
            { text: "Highest point", correct: true }
        ],
        feedback: "Correct! Downward acceleration exceeds $g$ at the top."
    },
    {
        level: 3,
        category: "Applying",
        question: "Mass stopped at equilibrium, given $2 \\times$ previous max velocity. New Energy?",
        options: [
            { text: "E", correct: false },
            { text: "2E", correct: false },
            { text: "4E", correct: true },
            { text: "8E", correct: false }
        ],
        feedback: "Correct! $E \\propto v^2$. Doubling $v$ quadruples Energy."
    },
    {
        level: 3,
        category: "Applying",
        question: "$a + 16x = 0$. Frequency?",
        options: [
            { text: "0.64 Hz", correct: true },
            { text: "2.0 Hz", correct: false },
            { text: "2.5 Hz", correct: false },
            { text: "4.0 Hz", correct: false }
        ],
        feedback: "Correct! $\\omega^2 = 16 \\rightarrow \\omega = 4$. $f = 4/2\\pi \\approx 0.64$."
    },

    // =========================================================================
    // LEVEL 4: ANALYZING (From shm4.tex)
    // =========================================================================
    {
        level: 4,
        category: "Analyzing",
        question: "Graph of $E_k$ and $E_p$ vs time. Which feature confirms undamped?",
        options: [
            { text: "Curves are sinusoidal", correct: false },
            { text: "Sum of $E_k + E_p$ is constant", correct: true },
            { text: "Frequency is doubled", correct: false },
            { text: "Peaks align", correct: false }
        ],
        feedback: "Correct! Constant total energy indicates no damping."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "$T^2$ vs $m$ graph has positive y-intercept. Why?",
        options: [
            { text: "k depends on m", correct: false },
            { text: "Damping present", correct: false },
            { text: "Spring has mass", correct: true },
            { text: "Amplitude too large", correct: false }
        ],
        feedback: "Correct! The intercept accounts for the effective mass of the spring."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Pendulum A ($\theta$) vs B ($\theta/2$). Released same time. Who reaches equilibrium first?",
        options: [
            { text: "A", correct: false },
            { text: "B", correct: false },
            { text: "Same time", correct: false },
            { text: "Same time, A faster", correct: true }
        ],
        feedback: "Correct! Period is independent of amplitude (isochronism), but A travels faster."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "$v$ vs $x$ ellipse becomes circle if scales equal. What is $\\omega$?",
        options: [
            { text: "1 rad/s", correct: true },
            { text: "$\\pi$ rad/s", correct: false },
            { text: "0.5 rad/s", correct: false },
            { text: "2$\\pi$ rad/s", correct: false }
        ],
        feedback: "Correct! Circle implies semiaxes equal: $v_{max} = x_{max} \\rightarrow \\omega A = A \\rightarrow \\omega = 1$."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Hollow pendulum filled with water leaks. Period change?",
        options: [
            { text: "Constant", correct: false },
            { text: "Decreases", correct: false },
            { text: "Increases", correct: false },
            { text: "Increases then decreases", correct: true }
        ],
        feedback: "Correct! CM lowers (L increases) then returns to center (L decreases)."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Which pair has phase difference $\\pi/2$?",
        options: [
            { text: "Displacement & Acceleration", correct: false },
            { text: "Velocity & Acceleration", correct: true },
            { text: "KE & PE", correct: false },
            { text: "Displacement & Force", correct: false }
        ],
        feedback: "Correct! Velocity leads acceleration by $\\pi/2$."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Mass halved ($m/2$), Spring constant doubled ($2k$), Amplitude constant. Max acceleration?",
        options: [
            { text: "Doubles", correct: false },
            { text: "Quadruples", correct: true },
            { text: "Halves", correct: false },
            { text: "Constant", correct: false }
        ],
        feedback: "Correct! $a \\propto k/m$. Ratio becomes $2/(0.5) = 4$."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Q has half amplitude of P and leads by $\\pi/3$. Equation for Q?",
        options: [
            { text: "$\\frac{A}{2} \\sin(\\omega t - \\pi/3)$", correct: false },
            { text: "$\\frac{A}{2} \\sin(\\omega t + \\pi/3)$", correct: true },
            { text: "$2A \\sin(\\omega t + \\pi/3)$", correct: false },
            { text: "$\\frac{A}{2} \\cos(\\omega t + \\pi/6)$", correct: false }
        ],
        feedback: "Correct! Lead means add phase. Half amplitude scales coefficient."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Floating test tube oscillation. Effective spring constant $k$?",
        options: [
            { text: "$\\rho V g$", correct: false },
            { text: "$\\rho A g$", correct: true },
            { text: "$\\rho g / A$", correct: false },
            { text: "$\\rho A$", correct: false }
        ],
        feedback: "Correct! Restoring force is buoyant force change: $F = -(\\rho A g)x$."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Resonance curves: A (sharp), B (broad), C (none). Damping order?",
        options: [
            { text: "A > B > C", correct: false },
            { text: "C > B > A", correct: true },
            { text: "Equal", correct: false },
            { text: "B > A > C", correct: false }
        ],
        feedback: "Correct! Sharpness decreases with damping. C is overdamped/heaviest."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Pendulum in cart accelerating horizontally ($a$). Effective $g$?",
        options: [
            { text: "$g - a$", correct: false },
            { text: "$g + a$", correct: false },
            { text: "$\\sqrt{g^2 - a^2}$", correct: false },
            { text: "$\\sqrt{g^2 + a^2}$", correct: true }
        ],
        feedback: "Correct! Vector sum of gravity and fictitious force."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Spring cut in half. New frequency $f'$ vs $f$?",
        options: [
            { text: "$f$", correct: false },
            { text: "$\\sqrt{2}f$", correct: true },
            { text: "$2f$", correct: false },
            { text: "$f/\\sqrt{2}$", correct: false }
        ],
        feedback: "Correct! Half length = double stiffness ($2k$). $f \\propto \\sqrt{k}$."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "For light damping, percentage energy loss per cycle is:",
        options: [
            { text: "Constant", correct: true },
            { text: "Exponential decrease", correct: false },
            { text: "Proportional to A", correct: false },
            { text: "Proportional to v", correct: false }
        ],
        feedback: "Correct! The ratio of successive amplitudes is constant, so energy fraction lost is constant."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Time X to Y is 2s (half period). Time O to midpoint (A/2)?",
        options: [
            { text: "0.33 s", correct: true },
            { text: "0.50 s", correct: false },
            { text: "0.67 s", correct: false },
            { text: "1.00 s", correct: false }
        ],
        feedback: "Correct! $T=4$. $\\sin(\\omega t) = 0.5 \\rightarrow 30^\\circ = T/12 = 4/12 = 0.33s$."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Block on oscillating platform separates when:",
        options: [
            { text: "$v > 9.8$", correct: false },
            { text: "$a_{max} = g$", correct: true },
            { text: "$a_{max} = 2g$", correct: false },
            { text: "$f = f_{natural}$", correct: false }
        ],
        feedback: "Correct! Separation occurs when downward acceleration equals gravity."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Why does pendulum period not depend on mass?",
        options: [
            { text: "Restoring force is gravitational (proportional to mass)", correct: true },
            { text: "Motion is rotational", correct: false },
            { text: "Air resistance", correct: false },
            { text: "k changes with mass", correct: false }
        ],
        feedback: "Correct! Mass cancels out in the equation of motion ($ma = -mg\\theta$)."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Neglecting spring mass leads to calculated $k$ being:",
        options: [
            { text: "Lower than true value", correct: true },
            { text: "Higher than true value", correct: false },
            { text: "Unaffected", correct: false },
            { text: "Dependent on amplitude", correct: false }
        ],
        feedback: "Correct! You measure a larger T (due to mass), calculating a smaller k."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Equal energy. $A_2 = 2A_1$. Frequency relation?",
        options: [
            { text: "$\\omega_2 = 2\\omega_1$", correct: false },
            { text: "$\\omega_2 = \\omega_1$", correct: false },
            { text: "$\\omega_2 = 0.5\\omega_1$", correct: true },
            { text: "$\\omega_2 = 0.25\\omega_1$", correct: false }
        ],
        feedback: "Correct! $E \\propto \\omega^2 A^2$. If A doubles, $\\omega$ must halve to keep E constant."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Graph of $E_k / E_T$ vs displacement?",
        options: [
            { text: "Linear decrease", correct: false },
            { text: "Inverted parabola", correct: true },
            { text: "Upward parabola", correct: false },
            { text: "Constant", correct: false }
        ],
        feedback: "Correct! Ratio is $1 - (x/A)^2$."
    },
    {
        level: 4,
        category: "Analyzing",
        question: "Driving force removed at resonance. What happens?",
        options: [
            { text: "Stops immediately", correct: false },
            { text: "Continues at driver freq", correct: false },
            { text: "Oscillates at natural freq with decay", correct: true },
            { text: "Constant amplitude", correct: false }
        ],
        feedback: "Correct! System reverts to free oscillation at natural frequency."
    },

    // =========================================================================
    // LEVEL 4: EVALUATING (From shm5.tex)
    // =========================================================================
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

// Helper function to pick a random question for a specific level
export function getQuestion(level) {
    const pool = Questions.filter(q => q.level === level);
    if (pool.length === 0) {
        console.warn(`No questions found for level ${level}. Returning random.`);
        return Questions[Math.floor(Math.random() * Questions.length)];
    }
    return pool[Math.floor(Math.random() * pool.length)];
}
