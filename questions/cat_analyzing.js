export const data = [
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
    }
];
