export const data = [
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
    }
];
