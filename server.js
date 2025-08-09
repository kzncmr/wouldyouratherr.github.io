const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);

// Varsayılan (kodda tutulan) soru listesi
const defaultQuestions = {
  celebrity: [
    {
      id: uuidv4(),
      option1: { text: { tr: "En sevdiğin aktörle tanışmak", en: "Meet your favorite actor" }, image: "https://via.placeholder.com/600x400?text=Actor" },
      option2: { text: { tr: "En sevdiğin şarkıcıyla tanışmak", en: "Meet your favorite singer" }, image: "https://via.placeholder.com/600x400?text=Singer" },
      votes1: 0,
      votes2: 0,
    },
  ],
  vehicles: [
    {
      id: uuidv4(),
      option1: { text: { tr: "Spor araba sahibi olmak", en: "Own a sports car" }, image: "https://via.placeholder.com/600x400?text=Sports+Car" },
      option2: { text: { tr: "Özel jet sahibi olmak", en: "Own a private jet" }, image: "https://via.placeholder.com/600x400?text=Private+Jet" },
      votes1: 150,
      votes2: 50,
    },
  ],
  property: [
    {
      id: uuidv4(),
      option1: { text: { tr: "Malikanede yaşamak", en: "Live in a mansion" }, image: "https://via.placeholder.com/600x400?text=Mansion" },
      option2: { text: { tr: "Sahil evinde yaşamak", en: "Live in a beach house" }, image: "https://via.placeholder.com/600x400?text=Beach+House" },
      votes1: 90,
      votes2: 110,
    },
  ],
  superpowers: [
    {
      id: uuidv4(),
      option1: { text: { tr: "Uçmak", en: "Fly" }, image: "https://via.placeholder.com/600x400?text=Fly" },
      option2: { text: { tr: "Görünmez olmak", en: "Be invisible" }, image: "https://via.placeholder.com/600x400?text=Invisible" },
      votes1: 130,
      votes2: 70,
    },
  ],
  extreme: [
    {
      id: uuidv4(),
      option1: { text: { tr: "Paraşütle atlamak", en: "Skydive" }, image: "https://via.placeholder.com/600x400?text=Skydive" },
      option2: { text: { tr: "Bungee jumping yapmak", en: "Bungee jump" }, image: "https://via.placeholder.com/600x400?text=Bungee+Jump" },
      votes1: 80,
      votes2: 120,
    },
  ],
  scifi: [
    {
      id: uuidv4(),
      option1: { text: { tr: "Mars'a seyahat etmek", en: "Travel to Mars" }, image: "https://via.placeholder.com/600x400?text=Mars" },
      option2: { text: { tr: "Uzaylıyla tanışmak", en: "Meet an alien" }, image: "https://via.placeholder.com/600x400?text=Alien" },
      votes1: 100,
      votes2: 100,
    },
  ],
  deal_with_devil: [
    {
      id: uuidv4(),
      option1: { text: { tr: "Şeytanla anlaşarak sonsuz bilgi elde etmek", en: "Gain infinite knowledge through a deal with the Devil" }, image: "https://via.placeholder.com/600x400?text=Knowledge" },
      option2: { text: { tr: "Şeytanla anlaşarak sonsuz servet elde etmek", en: "Gain infinite wealth through a deal with the Devil" }, image: "https://via.placeholder.com/600x400?text=Wealth" },
      votes1: 60,
      votes2: 140,
    },
  ],
  movies: [
    {
      id: uuidv4(),
      option1: { text: { tr: "Matrix dünyasında kırmızı hapı seçmek ve gerçekliği keşfetmek", en: "Choose the red pill in The Matrix and discover reality" }, image: "https://via.placeholder.com/600x400?text=Matrix" },
      option2: { text: { tr: "Inception filminde rüya içinde rüya deneyimi yaşamak", en: "Experience dreams within dreams in Inception" }, image: "https://via.placeholder.com/600x400?text=Inception" },
      votes1: 0,
      votes2: 0,
    },
  ]
}

// İlk başlatmada db'yi oluştur
db.defaults({ questions: defaultQuestions }).write();

// --- Otomatik SYNC: Sunucu başlatılırken yeni soruları ekle ---
function syncQuestionsWithDB() {
  const dbQuestions = db.get('questions').value();

  Object.keys(defaultQuestions).forEach(category => {
    // Kategori yoksa oluştur
    if (!dbQuestions[category]) {
      db.set(`questions.${category}`, []).write();
    }
    defaultQuestions[category].forEach(newQuestion => {
      // Aynı metinde soru yoksa ekle
      const exists = db.get(`questions.${category}`)
        .find(q => 
          q.option1.text.tr === newQuestion.option1.text.tr &&
          q.option2.text.tr === newQuestion.option2.text.tr
        ).value();
      if (!exists) {
        db.get(`questions.${category}`).push(newQuestion).write();
      }
    });
  });
}

// Sunucu başlatıldığında otomatik ekle
syncQuestionsWithDB();

app.use(cors());
app.use(express.json());

// Statik dosyaları serve et (index.html ana dizindeyse)
app.use(express.static(path.join(__dirname, '.')));

// Tüm soruları getir
app.get('/questions', (req, res) => {
  const questions = db.get('questions').value();
  res.json(questions);
});

// Belirli bir kategorideki soruları getir
app.get('/questions/:category', (req, res) => {
  const { category } = req.params;
  const questions = db.get(`questions.${category}`).value();
  if (!questions) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(questions);
});

// Yeni soru ekleme endpointi
app.post('/questions/:category/add', (req, res) => {
  const { category } = req.params;
  const question = req.body;

  // Kategori var mı kontrolü
  if (!db.get(`questions.${category}`).value()) {
    return res.status(404).json({ error: 'Category not found' });
  }

  // Gerekirse yeni id ekle
  if (!question.id) {
    question.id = uuidv4();
  }
  question.votes1 = question.votes1 || 0;
  question.votes2 = question.votes2 || 0;

  db.get(`questions.${category}`).push(question).write();
  res.json({ success: true, question });
});

// Oy verme endpointi
app.post('/vote/:questionId/:option', (req, res) => {
  const { questionId, option } = req.params;
  const category = Object.keys(db.get('questions').value()).find(cat =>
    db.get(`questions.${cat}`).find({ id: questionId }).value()
  );

  if (!category) {
    return res.status(404).json({ error: 'Question not found' });
  }

  const question = db.get(`questions.${category}`).find({ id: questionId }).value();
  if (option === '1') {
    db.get(`questions.${category}`).find({ id: questionId }).update('votes1', n => n + 1).write();
  } else if (option === '2') {
    db.get(`questions.${category}`).find({ id: questionId }).update('votes2', n => n + 1).write();
  } else {
    return res.status(400).json({ error: 'Invalid option' });
  }

  const updatedQuestion = db.get(`questions.${category}`).find({ id: questionId }).value();
  const totalVotes = updatedQuestion.votes1 + updatedQuestion.votes2;
  const percentage1 = totalVotes ? ((updatedQuestion.votes1 / totalVotes) * 100).toFixed(1) : 0;
  const percentage2 = totalVotes ? ((updatedQuestion.votes2 / totalVotes) * 100).toFixed(1) : 0;

  res.json({
    votes1: updatedQuestion.votes1,
    votes2: updatedQuestion.votes2,
    percentage1,
    percentage2,
  });
});

// İstatistikleri getir
app.get('/stats/:questionId', (req, res) => {
  const { questionId } = req.params;
  const category = Object.keys(db.get('questions').value()).find(cat =>
    db.get(`questions.${cat}`).find({ id: questionId }).value()
  );

  if (!category) {
    return res.status(404).json({ error: 'Question not found' });
  }

  const question = db.get(`questions.${category}`).find({ id: questionId }).value();
  const totalVotes = question.votes1 + question.votes2;
  const percentage1 = totalVotes ? ((question.votes1 / totalVotes) * 100).toFixed(1) : 0;
  const percentage2 = totalVotes ? ((question.votes2 / totalVotes) * 100).toFixed(1) : 0;

  res.json({
    votes1: question.votes1,
    votes2: question.votes2,
    percentage1,
    percentage2,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});