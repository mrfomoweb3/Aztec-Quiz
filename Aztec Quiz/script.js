const startBtn = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const startScreen = document.getElementById('start-screen');
const resultScreen = document.getElementById('result-screen');
const questionBox = document.getElementById('question-box');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const finalScore = document.getElementById('final-score');
const resultMsg = document.getElementById('result-message');
const resultImage = document.getElementById('result-image');
const twitterShare = document.getElementById('twitter-share');
const downloadBtn = document.getElementById('download-btn');
const retryBtn = document.getElementById('retry-btn');

let current = 0;
let score = 0;

const questions = [
  { question: "What does ZK stand for?", options: [ "Zebra Kicks", "Zen Karma", "Zero Knowledge", "Zany Keys"], answer: "Zero Knowledge" },
  { question: "Which network focuses on privacy with ZKPs?", options: [ "Bitcoin", "Aztec", "Solana", "Dogecoin"], answer: "Aztec" },
  { question: "What is a rollup?", options: ["A bundle of transactions", "A new wallet", "A VPN", "A bot framework"], answer: "A bundle of transactions" },
  { question: "Which proving system is known for trusted setup?", options: ["zkSNARK", "zkSTARK", "Tornado", "Bulletproofs"], answer: "zkSNARK" },
  { question: "What language powers Aztec 3?", options: [ "Rust", "Solidity", "Noir", "Circom"], answer: "Noir" },
  { question: "What’s the main use of a prover?", options: [ "To stake ETH", "To generate proofs without revealing data", "To route RPCs", "To host dApps"], answer: "To generate proofs without revealing data" },
  { question: "What makes STARKs different from SNARKs?", options: ["No trusted setup", "More expensive", "Need staking", "Larger contracts"], answer: "No trusted setup" },
  { question: "What does PLONK enable?", options: [ "Dark mode", "Better UX", "Universal setup", "Token swaps"], answer: "Universal setup" },
  { question: "What does a verifier do?", options: ["Checks if the proof is valid", "Creates new wallets", "Provides liquidity", "Uploads metadata"], answer: "Checks if the proof is valid" },
  { question: "What's a constraint system?", options: [ "A game engine", "Rules that proofs must satisfy", "A wallet recovery tool", "A bridge"], answer: "Rules that proofs must satisfy" },
  { question: "What does Noir compile into?", options: ["ZK circuits", "ETH bytecode", "HTML", "CSS"], answer: "ZK circuits" },
  { question: "What's one issue ZK helps with?", options: ["Privacy", "Gas price alerts", "Slippage", "Yield farming"], answer: "Privacy" },
  { question: "What is Aztec’s privacy layer called?", options: ["Encrypted state", "Whispernet", "zkConnect", "ProofShield"], answer: "Encrypted state" },
  { question: "What are recursive proofs used for?", options: ["Compressing many proofs", "Mining", "Bridging assets", "Auditing NFTs"], answer: "Compressing many proofs" },
  { question: "Which one is NOT a real proving system?", options: ["Tornado", "Groth16", "PLONK", "Marlin"], answer: "Tornado" },
  { question: "What does 'shielded' mean?", options: [ "Higher gas fee", "On-chain staking","Private transactions", "Optimistic speed"], answer: "Private transactions" },
  { question: "What’s Aztec Connect used for?", options: [ "Multichain swaps","Bridge to Ethereum", "Telegram bots", "Airdrops"], answer: "Bridge to Ethereum" },
  { question: "Which of these is a ZK tool?", options: ["Circom", "Zapier", "Postman", "Foundry"], answer: "Circom" },
  { question: "Which is required to run a prover node?", options: ["Hardware", "VPN", "Bridge", "LP token"], answer: "Hardware" },
  { question: "What's the purpose of composability?", options: ["Apps can interact", "Lower gas", "Multiplayer support", "Flash loans"], answer: "Apps can interact" },
  { question: "What does a trusted setup create?", options: ["Initial keys for ZKP", "Smart contracts", "Miners", "DAOs"], answer: "Initial keys for ZKP" },
  { question: "Which chain is Aztec built on?", options: ["Ethereum", "Solana", "Polygon", "Near"], answer: "Ethereum" },
  { question: "What’s a universal setup?", options: ["Reusable parameters", "Gas subsidy", "A hardware wallet", "A seed phrase"], answer: "Reusable parameters" },
  { question: "What’s selective disclosure?", options: ["Reveal only what’s needed", "Broadcast everything", "Private file sharing", "Wallet syncing"], answer: "Reveal only what’s needed" },
  { question: "Why is privacy hard on public blockchains?", options: ["Everything is transparent", "Too much data", "APIs are slow", "No firewalls"], answer: "Everything is transparent" },
  { question: "What is a ZK circuit?", options: ["A program defining what’s provable", "A DeFi swap path", "An NFT image", "A staking path"], answer: "A program defining what’s provable" },
  { question: "What’s the role of a sequencer?", options: ["Orders rollup transactions", "Handles DNS", "Mints NFTs", "Pushes notifications"], answer: "Orders rollup transactions" },
  { question: "What does Aztec focus on beyond privacy?", options: ["Composability", "Bridging", "Yield farming", "Price feeds"], answer: "Composability" },
  { question: "What's the purpose of zero knowledge?", options: ["Prove without revealing data", "Create private keys", "Encrypt passwords", "Launch tokens"], answer: "Prove without revealing data" }
];

questions.sort(() => Math.random() - 0.5); // Shuffle

startBtn.onclick = () => {
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  showQuestion();
};

function showQuestion() {
  const q = questions[current];
  questionBox.innerText = q.question;
  answerButtons.innerHTML = '';
  q.options.forEach(opt => {
    const li = document.createElement('li');
    li.innerText = opt;
    li.onclick = () => selectAnswer(li, opt === q.answer);
    answerButtons.appendChild(li);
  });

  progressFill.style.width = `${(current / questions.length) * 100}%`;
  nextBtn.classList.add('hidden');
}

function selectAnswer(el, correct) {
  [...answerButtons.children].forEach(btn => btn.style.pointerEvents = 'none');
  if (correct) {
    score++;
    el.style.background = '#2e7d32';
  } else {
    el.style.background = '#c62828';
  }
  nextBtn.classList.remove('hidden');
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  const percentage = Math.round((score / questions.length) * 100);
  finalScore.innerText = percentage;

  const highScore = percentage >= 75;
  resultMsg.innerText = highScore ? "You did well!" : "Let's try again to get your privacy up.";
  resultImage.src = highScore ? "assets/certificate-high.png" : "assets/certificate-low.png";

  // Twitter share
  const tweetText = `I scored ${percentage}% in the Aztec Privacy Quiz 🛡️
Can you beat that? @aztecnetwork`;
  twitterShare.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  downloadBtn.onclick = () => {
    const link = document.createElement('a');
    link.href = resultImage.src;
    link.download = highScore ? 'you-did-well.png' : 'try-again.png';
    link.click();
  };

  if (highScore) showConfetti();
}

retryBtn.onclick = () => {
  current = 0;
  score = 0;

  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');

  const confettiWrapper = document.querySelector('.confetti-wrapper');
  if (confettiWrapper) confettiWrapper.remove();
};

function showConfetti() {
  const wrapper = document.createElement('div');
  wrapper.className = 'confetti-wrapper';

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.setProperty('--i', Math.random());
    piece.style.animationDelay = Math.random() + 's';
    wrapper.appendChild(piece);
  }

  resultScreen.appendChild(wrapper);
}
