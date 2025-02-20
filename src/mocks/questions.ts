export const mockQuestions = [
  {
    question: "An animal cell contains:",
    answers: [
      { options: ["Cell wall", "Ribosomes"], correct: "Ribosomes" },
      { options: ["Cytoplasm", "Chloroplast"], correct: "Cytoplasm" },
      { options: ["Partially permeable membrane", "Impermeable membrane"], correct: "Partially permeable membrane" },
      { options: ["Cellulose", "Mitochondria"], correct: "Mitochondria" },
      // { options: ["Nucleus", "Cytoplasm", "Vacuole"], correct: "Nucleus" }, // TODO: three option extension
    ],
  },
  {
    question: "What are the ideal conditions inside an office?",
    answers: [
      { options: ["Good pay", "Bad pay"], correct: "Good pay"},
      { options: ["Lots of meetings", "Less meetings"], correct: "Less meetings"},
      { options: ["Good coffee", "Bad coffee"], correct: "Good coffee"},
      { options: ["Office bear", "Office dog"], correct: "Office dog"},
    ]
  },
];

export default mockQuestions;
