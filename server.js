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
    {
      id: uuidv4(),
      option1: { text: { tr: "Oscar Töreni’ne katılmak", en: "Attend the Oscars" }, image: "https://via.placeholder.com/600x400?text=Oscars" },
      option2: { text: { tr: "Met Gala’ya katılmak", en: "Attend the Met Gala" }, image: "https://via.placeholder.com/600x400?text=MetGala" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Taylor Swift ile akşam yemeği yemek", en: "Have dinner with Taylor Swift" }, image: "https://via.placeholder.com/600x400?text=TaylorSwift" },
      option2: { text: { tr: "Beyoncé ile akşam yemeği yemek", en: "Have dinner with Beyoncé" }, image: "https://via.placeholder.com/600x400?text=Beyonce" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Ryan Reynolds ile en iyi arkadaş olmak", en: "Be best friends with Ryan Reynolds" }, image: "https://via.placeholder.com/600x400?text=RyanReynolds" },
      option2: { text: { tr: "Chris Hemsworth ile en iyi arkadaş olmak", en: "Be best friends with Chris Hemsworth" }, image: "https://via.placeholder.com/600x400?text=ChrisHemsworth" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Zendaya’dan moda tavsiyesi almak", en: "Get fashion advice from Zendaya" }, image: "https://via.placeholder.com/600x400?text=Zendaya" },
      option2: { text: { tr: "Rihanna’dan moda tavsiyesi almak", en: "Get fashion advice from Rihanna" }, image: "https://via.placeholder.com/600x400?text=Rihanna" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Dünyayı BTS ile gezmek", en: "Tour the world with BTS" }, image: "https://via.placeholder.com/600x400?text=BTS" },
      option2: { text: { tr: "Dünyayı Coldplay ile gezmek", en: "Tour the world with Coldplay" }, image: "https://via.placeholder.com/600x400?text=Coldplay" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Leonardo DiCaprio ile sette bir gün geçirmek", en: "Spend a day on set with Leonardo DiCaprio" }, image: "https://via.placeholder.com/600x400?text=LeonardoDiCaprio" },
      option2: { text: { tr: "Brad Pitt ile sette bir gün geçirmek", en: "Spend a day on set with Brad Pitt" }, image: "https://via.placeholder.com/600x400?text=BradPitt" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Selena Gomez ile selfie çekmek", en: "Take a selfie with Selena Gomez" }, image: "https://via.placeholder.com/600x400?text=SelenaGomez" },
      option2: { text: { tr: "Ariana Grande ile selfie çekmek", en: "Take a selfie with Ariana Grande" }, image: "https://via.placeholder.com/600x400?text=ArianaGrande" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Ed Sheeran ile sahnede şarkı söylemek", en: "Perform live on stage with Ed Sheeran" }, image: "https://via.placeholder.com/600x400?text=EdSheeran" },
      option2: { text: { tr: "Justin Bieber ile sahnede şarkı söylemek", en: "Perform live on stage with Justin Bieber" }, image: "https://via.placeholder.com/600x400?text=JustinBieber" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Cannes Film Festivali’nde kırmızı halıda yürümek", en: "Walk the red carpet at Cannes Film Festival" }, image: "https://via.placeholder.com/600x400?text=Cannes" },
      option2: { text: { tr: "Altın Küre Ödülleri’nde kırmızı halıda yürümek", en: "Walk the red carpet at the Golden Globes" }, image: "https://via.placeholder.com/600x400?text=GoldenGlobes" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Jamie Oliver ile yemek dersi almak", en: "Have a cooking lesson with Jamie Oliver" }, image: "https://via.placeholder.com/600x400?text=JamieOliver" },
      option2: { text: { tr: "Nusret ile yemek dersi almak", en: "Have a cooking lesson with Salt Bae" }, image: "https://via.placeholder.com/600x400?text=SaltBae" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Shakira ile bir müzik klibinde yer almak", en: "Be in a music video with Shakira" }, image: "https://via.placeholder.com/600x400?text=Shakira" },
      option2: { text: { tr: "Jennifer Lopez ile bir müzik klibinde yer almak", en: "Be in a music video with Jennifer Lopez" }, image: "https://via.placeholder.com/600x400?text=JenniferLopez" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Grammy Ödülü kazanmak", en: "Win a Grammy Award" }, image: "https://via.placeholder.com/600x400?text=Grammy" },
      option2: { text: { tr: "Oscar Ödülü kazanmak", en: "Win an Academy Award" }, image: "https://via.placeholder.com/600x400?text=Oscar" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Kylie Jenner ile alışverişe gitmek", en: "Go shopping with Kylie Jenner" }, image: "https://via.placeholder.com/600x400?text=KylieJenner" },
      option2: { text: { tr: "Kim Kardashian ile alışverişe gitmek", en: "Go shopping with Kim Kardashian" }, image: "https://via.placeholder.com/600x400?text=KimKardashian" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Lady Gaga ile düet yapmak", en: "Do a duet with Lady Gaga" }, image: "https://via.placeholder.com/600x400?text=LadyGaga" },
      option2: { text: { tr: "Adele ile düet yapmak", en: "Do a duet with Adele" }, image: "https://via.placeholder.com/600x400?text=Adele" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Kevin Hart ile bir komedi filminde oynamak", en: "Be in a comedy film with Kevin Hart" }, image: "https://via.placeholder.com/600x400?text=KevinHart" },
      option2: { text: { tr: "Jason Statham ile bir aksiyon filminde oynamak", en: "Be in an action film with Jason Statham" }, image: "https://via.placeholder.com/600x400?text=JasonStatham" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Taylor Swift’ten sana özel bir şarkı almak", en: "Get a personalized song from Taylor Swift" }, image: "https://via.placeholder.com/600x400?text=TaylorSwift" },
      option2: { text: { tr: "Ed Sheeran’dan sana özel bir şarkı almak", en: "Get a personalized song from Ed Sheeran" }, image: "https://via.placeholder.com/600x400?text=EdSheeran" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Millie Bobby Brown ile bir Netflix dizisinde oynamak", en: "Appear in a Netflix series with Millie Bobby Brown" }, image: "https://via.placeholder.com/600x400?text=MillieBobbyBrown" },
      option2: { text: { tr: "Jenna Ortega ile bir Netflix dizisinde oynamak", en: "Appear in a Netflix series with Jenna Ortega" }, image: "https://via.placeholder.com/600x400?text=JennaOrtega" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Meryl Streep’ten oyunculuk dersi almak", en: "Take acting lessons from Meryl Streep" }, image: "https://via.placeholder.com/600x400?text=MerylStreep" },
      option2: { text: { tr: "Robert De Niro’dan oyunculuk dersi almak", en: "Take acting lessons from Robert De Niro" }, image: "https://via.placeholder.com/600x400?text=RobertDeNiro" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Billie Eilish ile bir hafta turnede olmak", en: "Spend a week on tour with Billie Eilish" }, image: "https://via.placeholder.com/600x400?text=BillieEilish" },
      option2: { text: { tr: "Harry Styles ile bir hafta turnede olmak", en: "Spend a week on tour with Harry Styles" }, image: "https://via.placeholder.com/600x400?text=HarryStyles" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Jimmy Fallon’un “The Tonight Show” programına çıkmak", en: "Appear on “The Tonight Show” with Jimmy Fallon" }, image: "https://via.placeholder.com/600x400?text=JimmyFallon" },
      option2: { text: { tr: "Ellen DeGeneres’in “The Ellen Show” programına çıkmak", en: "Appear on “The Ellen Show” with Ellen DeGeneres" }, image: "https://via.placeholder.com/600x400?text=EllenDeGeneres" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Gigi Hadid ile fotoğraf çekimi yapmak", en: "Have a photoshoot with Gigi Hadid" }, image: "https://via.placeholder.com/600x400?text=GigiHadid" },
      option2: { text: { tr: "Kendall Jenner ile fotoğraf çekimi yapmak", en: "Have a photoshoot with Kendall Jenner" }, image: "https://via.placeholder.com/600x400?text=KendallJenner" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Will Smith ile satranç oynamak", en: "Play chess with Will Smith" }, image: "https://via.placeholder.com/600x400?text=WillSmith" },
      option2: { text: { tr: "Keanu Reeves ile satranç oynamak", en: "Play chess with Keanu Reeves" }, image: "https://via.placeholder.com/600x400?text=KeanuReeves" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Joe Rogan ile bir podcast kaydı yapmak", en: "Record a podcast with Joe Rogan" }, image: "https://via.placeholder.com/600x400?text=JoeRogan" },
      option2: { text: { tr: "Dwayne Johnson ile bir podcast kaydı yapmak", en: "Record a podcast with Dwayne Johnson" }, image: "https://via.placeholder.com/600x400?text=DwayneJohnson" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Emma Watson ile bir yolculuğa çıkmak", en: "Go on a road trip with Emma Watson" }, image: "https://via.placeholder.com/600x400?text=EmmaWatson" },
      option2: { text: { tr: "Emma Stone ile bir yolculuğa çıkmak", en: "Go on a road trip with Emma Stone" }, image: "https://via.placeholder.com/600x400?text=EmmaStone" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Annie Leibovitz tarafından fotoğrafının çekilmesi", en: "Be photographed by Annie Leibovitz" }, image: "https://via.placeholder.com/600x400?text=AnnieLeibovitz" },
      option2: { text: { tr: "Mario Testino tarafından fotoğrafının çekilmesi", en: "Be photographed by Mario Testino" }, image: "https://via.placeholder.com/600x400?text=MarioTestino" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "En sevdiğin aktörle bir günlüğüne yer değiştirmek", "en": "Swap lives with your favorite actor for a day" }, "image": "https://via.placeholder.com/600x400?text=Actor" },
      option2: { "text": { "tr": "En sevdiğin şarkıcıyla bir günlüğüne yer değiştirmek", "en": "Swap lives with your favorite singer for a day" }, "image": "https://via.placeholder.com/600x400?text=Singer" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Tom Hanks'in kişisel şefi olmak", "en": "Be Tom Hanks' personal chef" }, "image": "https://via.placeholder.com/600x400?text=TomHanks" },
      option2: { "text": { "tr": "Dwayne Johnson'ın kişisel fitness koçu olmak", "en": "Be Dwayne Johnson's personal fitness trainer" }, "image": "https://via.placeholder.com/600x400?text=DwayneJohnson" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Beyoncé ile bir hayır galasında sahne tasarlamak", "en": "Design a stage with Beyoncé for a charity gala" }, "image": "https://via.placeholder.com/600x400?text=Beyonce" },
      option2: { "text": { "tr": "Adele ile bir hayır galasında şarkı seçmek", "en": "Choose songs with Adele for a charity gala" }, "image": "https://via.placeholder.com/600x400?text=Adele" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Leonardo DiCaprio ile özel bir yatta tatil yapmak", "en": "Vacation on a private yacht with Leonardo DiCaprio" }, "image": "https://via.placeholder.com/600x400?text=LeonardoDiCaprio" },
      option2: { "text": { "tr": "Brad Pitt ile özel bir adada kamp yapmak", "en": "Camp on a private island with Brad Pitt" }, "image": "https://via.placeholder.com/600x400?text=BradPitt" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Rihanna ile bir moda markası için logo tasarlamak", "en": "Design a logo for a fashion brand with Rihanna" }, "image": "https://via.placeholder.com/600x400?text=Rihanna" },
      option2: { "text": { "tr": "Kanye West ile bir sneaker koleksiyonu yaratmak", "en": "Create a sneaker collection with Kanye West" }, "image": "https://via.placeholder.com/600x400?text=KanyeWest" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Chris Hemsworth ile bir Viking festivaline katılmak", "en": "Attend a Viking festival with Chris Hemsworth" }, "image": "https://via.placeholder.com/600x400?text=ChrisHemsworth" },
      option2: { "text": { "tr": "Ryan Reynolds ile bir stand-up komedi şovuna gitmek", "en": "Go to a stand-up comedy show with Ryan Reynolds" }, "image": "https://via.placeholder.com/600x400?text=RyanReynolds" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Taylor Swift ile hayranlara sürpriz bir konser düzenlemek", "en": "Plan a surprise concert for fans with Taylor Swift" }, "image": "https://via.placeholder.com/600x400?text=TaylorSwift" },
      option2: { "text": { "tr": "Billie Eilish ile bir hayran buluşması organize etmek", "en": "Organize a fan meet-and-greet with Billie Eilish" }, "image": "https://via.placeholder.com/600x400?text=BillieEilish" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Meryl Streep ile bir tiyatro oyununun yönetmenliğini yapmak", "en": "Direct a theater play with Meryl Streep" }, "image": "https://via.placeholder.com/600x400?text=MerylStreep" },
      option2: { "text": { "tr": "Denzel Washington ile bir tiyatro oyununun senaryosunu yazmak", "en": "Write a theater play script with Denzel Washington" }, "image": "https://via.placeholder.com/600x400?text=DenzelWashington" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Elon Musk ile Mars'ta bir koloni planlamak", "en": "Plan a Mars colony with Elon Musk" }, "image": "https://via.placeholder.com/600x400?text=ElonMusk" },
      option2: { "text": { "tr": "Mark Zuckerberg ile bir metaverse dünyası tasarlamak", "en": "Design a metaverse world with Mark Zuckerberg" }, "image": "https://via.placeholder.com/600x400?text=MarkZuckerberg" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Oprah Winfrey ile bir kitap kulübü başlatmak", "en": "Start a book club with Oprah Winfrey" }, "image": "https://via.placeholder.com/600x400?text=OprahWinfrey" },
      option2: { "text": { "tr": "Ellen DeGeneres ile bir hayır kurumu için bağış toplamak", "en": "Raise funds for a charity with Ellen DeGeneres" }, "image": "https://via.placeholder.com/600x400?text=EllenDeGeneres" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Johnny Depp ile bir sanat sergisi düzenlemek", "en": "Curate an art exhibition with Johnny Depp" }, "image": "https://via.placeholder.com/600x400?text=JohnnyDepp" },
      option2: { "text": { "tr": "Keira Knightley ile bir tarih müzesi turu yapmak", "en": "Tour a history museum with Keira Knightley" }, "image": "https://via.placeholder.com/600x400?text=KeiraKnightley" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Lady Gaga ile bir çılgın kostüm partisi düzenlemek", "en": "Throw a wild costume party with Lady Gaga" }, "image": "https://via.placeholder.com/600x400?text=LadyGaga" },
      option2: { "text": { "tr": "Katy Perry ile bir renk temalı parti planlamak", "en": "Plan a color-themed party with Katy Perry" }, "image": "https://via.placeholder.com/600x400?text=KatyPerry" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Robert Downey Jr. ile bir teknoloji girişimi başlatmak", "en": "Start a tech startup with Robert Downey Jr." }, "image": "https://via.placeholder.com/600x400?text=RobertDowneyJr" },
      option2: { "text": { "tr": "Chris Evans ile bir çevre koruma kampanyası yürütmek", "en": "Run an environmental campaign with Chris Evans" }, "image": "https://via.placeholder.com/600x400?text=ChrisEvans" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Ariana Grande ile bir sosyal medya dans meydan okuması başlatmak", "en": "Start a social media dance challenge with Ariana Grande" }, "image": "https://via.placeholder.com/600x400?text=ArianaGrande" },
      option2: { "text": { "tr": "Dua Lipa ile bir sosyal medya şarkı yarışması düzenlemek", "en": "Organize a social media singing contest with Dua Lipa" }, "image": "https://via.placeholder.com/600x400?text=DuaLipa" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Will Smith ile bir video oyunu tasarlamak", "en": "Design a video game with Will Smith" }, "image": "https://via.placeholder.com/600x400?text=WillSmith" },
      option2: { "text": { "tr": "Kevin Hart ile bir komedi podcast'i başlatmak", "en": "Start a comedy podcast with Kevin Hart" }, "image": "https://via.placeholder.com/600x400?text=KevinHart" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Angelina Jolie ile bir mülteci kampını ziyaret etmek", "en": "Visit a refugee camp with Angelina Jolie" }, "image": "https://via.placeholder.com/600x400?text=AngelinaJolie" },
      option2: { "text": { "tr": "George Clooney ile bir insan hakları savunuculuğu yapmak", "en": "Advocate for human rights with George Clooney" }, "image": "https://via.placeholder.com/600x400?text=GeorgeClooney" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Drake ile bir basketbol maçı organize etmek", "en": "Organize a basketball game with Drake" }, "image": "https://via.placeholder.com/600x400?text=Drake" },
      option2: { "text": { "tr": "Post Malone ile bir poker turnuvası düzenlemek", "en": "Host a poker tournament with Post Malone" }, "image": "https://via.placeholder.com/600x400?text=PostMalone" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Jennifer Lawrence ile bir doğa yürüyüşüne çıkmak", "en": "Go hiking with Jennifer Lawrence" }, "image": "https://via.placeholder.com/600x400?text=JenniferLawrence" },
      option2: { "text": { "tr": "Emma Stone ile bir şehir turuna katılmak", "en": "Join a city tour with Emma Stone" }, "image": "https://via.placeholder.com/600x400?text=EmmaStone" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Justin Bieber ile bir sokak performansı yapmak", "en": "Perform on the street with Justin Bieber" }, "image": "https://via.placeholder.com/600x400?text=JustinBieber" },
      option2: { "text": { "tr": "Shawn Mendes ile bir akustik konser vermek", "en": "Give an acoustic concert with Shawn Mendes" }, "image": "https://via.placeholder.com/600x400?text=ShawnMendes" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Scarlett Johansson ile bir uzay temalı kaçış odası çözmek", "en": "Solve a space-themed escape room with Scarlett Johansson" }, "image": "https://via.placeholder.com/600x400?text=ScarlettJohansson" },
      option2: { "text": { "tr": "Natalie Portman ile bir gizem temalı kaçış odası çözmek", "en": "Solve a mystery-themed escape room with Natalie Portman" }, "image": "https://via.placeholder.com/600x400?text=NataliePortman" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Ed Sheeran ile bir kamp ateşi etrafında şarkı söylemek", "en": "Sing around a campfire with Ed Sheeran" }, "image": "https://via.placeholder.com/600x400?text=EdSheeran" },
      option2: { "text": { "tr": "Bruno Mars ile bir karaoke gecesi düzenlemek", "en": "Host a karaoke night with Bruno Mars" }, "image": "https://via.placeholder.com/600x400?text=BrunoMars" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Tom Cruise ile bir uçakla gökyüzünde akrobasi yapmak", "en": "Do aerobatics in a plane with Tom Cruise" }, "image": "https://via.placeholder.com/600x400?text=TomCruise" },
      option2: { "text": { "tr": "Vin Diesel ile bir araba yarışına katılmak", "en": "Join a car race with Vin Diesel" }, "image": "https://via.placeholder.com/600x400?text=VinDiesel" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Selena Gomez ile bir yemek pişirme yarışmasına katılmak", "en": "Compete in a cooking show with Selena Gomez" }, "image": "https://via.placeholder.com/600x400?text=SelenaGomez" },
      option2: { "text": { "tr": "Zendaya ile bir dans yarışmasına katılmak", "en": "Compete in a dance competition with Zendaya" }, "image": "https://via.placeholder.com/600x400?text=Zendaya" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Ryan Gosling ile bir vintage araba koleksiyonu gezmek", "en": "Tour a vintage car collection with Ryan Gosling" }, "image": "https://via.placeholder.com/600x400?text=RyanGosling" },
      option2: { "text": { "tr": "Channing Tatum ile bir dans stüdyosunda prova yapmak", "en": "Rehearse in a dance studio with Channing Tatum" }, "image": "https://via.placeholder.com/600x400?text=ChanningTatum" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Cardi B ile bir alışveriş çılgınlığına çıkmak", "en": "Go on a shopping spree with Cardi B" }, "image": "https://via.placeholder.com/600x400?text=CardiB" },
      option2: { "text": { "tr": "Nicki Minaj ile bir rap freestyle yarışmasına katılmak", "en": "Compete in a rap freestyle battle with Nicki Minaj" }, "image": "https://via.placeholder.com/600x400?text=NickiMinaj" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Hugh Jackman ile bir Broadway şovu için kostüm tasarlamak", "en": "Design costumes for a Broadway show with Hugh Jackman" }, "image": "https://via.placeholder.com/600x400?text=HughJackman" },
      option2: { "text": { "tr": "Zac Efron ile bir dans koreografisi oluşturmak", "en": "Create a dance choreography with Zac Efron" }, "image": "https://via.placeholder.com/600x400?text=ZacEfron" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Miley Cyrus ile bir çiftlikte bir gün geçirmek", "en": "Spend a day on a farm with Miley Cyrus" }, "image": "https://via.placeholder.com/600x400?text=MileyCyrus" },
      option2: { "text": { "tr": "Shakira ile bir plajda dans partisi düzenlemek", "en": "Host a beach dance party with Shakira" }, "image": "https://via.placeholder.com/600x400?text=Shakira" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Keanu Reeves ile bir motosiklet turuna çıkmak", "en": "Go on a motorcycle road trip with Keanu Reeves" }, "image": "https://via.placeholder.com/600x400?text=KeanuReeves" },
      option2: { "text": { "tr": "Jason Statham ile bir araba kovalamaca simülasyonu yapmak", "en": "Do a car chase simulation with Jason Statham" }, "image": "https://via.placeholder.com/600x400?text=JasonStatham" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Kylie Jenner ile bir güzellik vlogu çekmek", "en": "Film a beauty vlog with Kylie Jenner" }, "image": "https://via.placeholder.com/600x400?text=KylieJenner" },
      option2: { "text": { "tr": "Kim Kardashian ile bir moda vlogu çekmek", "en": "Film a fashion vlog with Kim Kardashian" }, "image": "https://via.placeholder.com/600x400?text=KimKardashian" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Chris Pratt ile bir bilimkurgu temalı lunaparka gitmek", "en": "Visit a sci-fi themed amusement park with Chris Pratt" }, "image": "https://via.placeholder.com/600x400?text=ChrisPratt" },
      option2: { "text": { "tr": "Adam Sandler ile bir su parkında eğlenmek", "en": "Have fun at a water park with Adam Sandler" }, "image": "https://via.placeholder.com/600x400?text=AdamSandler" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Eminem ile bir rap battle şovuna ev sahipliği yapmak", "en": "Host a rap battle show with Eminem" }, "image": "https://via.placeholder.com/600x400?text=Eminem" },
      option2: { "text": { "tr": "Jay-Z ile bir müzik festivali düzenlemek", "en": "Organize a music festival with Jay-Z" }, "image": "https://via.placeholder.com/600x400?text=JayZ" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Margot Robbie ile bir vintage film gecesi düzenlemek", "en": "Host a vintage movie night with Margot Robbie" }, "image": "https://via.placeholder.com/600x400?text=MargotRobbie" },
      option2: { "text": { "tr": "Charlize Theron ile bir film festivalinde jüri olmak", "en": "Be a jury member at a film festival with Charlize Theron" }, "image": "https://via.placeholder.com/600x400?text=CharlizeTheron" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "The Weeknd ile bir gece kulübü açmak", "en": "Open a nightclub with The Weeknd" }, "image": "https://via.placeholder.com/600x400?text=TheWeeknd" },
      option2: { "text": { "tr": "Justin Timberlake ile bir bar tasarlamak", "en": "Design a bar with Justin Timberlake" }, "image": "https://via.placeholder.com/600x400?text=JustinTimberlake" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Sandra Bullock ile bir hayalet avına çıkmak", "en": "Go ghost hunting with Sandra Bullock" }, "image": "https://via.placeholder.com/600x400?text=SandraBullock" },
      option2: { "text": { "tr": "Reese Witherspoon ile bir define avına katılmak", "en": "Join a treasure hunt with Reese Witherspoon" }, "image": "https://via.placeholder.com/600x400?text=ReeseWitherspoon" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Snoop Dogg ile bir barbekü partisi düzenlemek", "en": "Host a BBQ party with Snoop Dogg" }, "image": "https://via.placeholder.com/600x400?text=SnoopDogg" },
      option2: { "text": { "tr": "Lil Wayne ile bir sokak partisi organize etmek", "en": "Organize a block party with Lil Wayne" }, "image": "https://via.placeholder.com/600x400?text=LilWayne" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Gal Gadot ile bir süper kahraman kostümü tasarlamak", "en": "Design a superhero costume with Gal Gadot" }, "image": "https://via.placeholder.com/600x400?text=GalGadot" },
      option2: { "text": { "tr": "Brie Larson ile bir süper kahraman çizgi romanı yazmak", "en": "Write a superhero comic with Brie Larson" }, "image": "https://via.placeholder.com/600x400?text=BrieLarson" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Alicia Keys ile bir müzik okulunda gönüllü olmak", "en": "Volunteer at a music school with Alicia Keys" }, "image": "https://via.placeholder.com/600x400?text=AliciaKeys" },
      option2: { "text": { "tr": "John Legend ile bir çocuk korosu yönetmek", "en": "Direct a children’s choir with John Legend" }, "image": "https://via.placeholder.com/600x400?text=JohnLegend" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Ben Affleck ile bir tarih dersi almak", "en": "Take a history lesson with Ben Affleck" }, "image": "https://via.placeholder.com/600x400?text=BenAffleck" },
      option2: { "text": { "tr": "Matt Damon ile bir bilim dersi almak", "en": "Take a science lesson with Matt Damon" }, "image": "https://via.placeholder.com/600x400?text=MattDamon" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "P!nk ile bir sirk performansı düzenlemek", "en": "Organize a circus performance with P!nk" }, "image": "https://via.placeholder.com/600x400?text=Pink" },
      option2: { "text": { "tr": "Kelly Clarkson ile bir yetenek şovuna ev sahipliği yapmak", "en": "Host a talent show with Kelly Clarkson" }, "image": "https://via.placeholder.com/600x400?text=KellyClarkson" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Mark Wahlberg ile bir boks maçı antrenmanı yapmak", "en": "Train for a boxing match with Mark Wahlberg" }, "image": "https://via.placeholder.com/600x400?text=MarkWahlberg" },
      option2: { "text": { "tr": "John Cena ile bir güreş maçı provası yapmak", "en": "Rehearse a wrestling match with John Cena" }, "image": "https://via.placeholder.com/600x400?text=JohnCena" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Lizzo ile bir pozitiflik kampanyası başlatmak", "en": "Launch a positivity campaign with Lizzo" }, "image": "https://via.placeholder.com/600x400?text=Lizzo" },
      option2: { "text": { "tr": "Megan Thee Stallion ile bir özgüven atölyesi düzenlemek", "en": "Organize a confidence workshop with Megan Thee Stallion" }, "image": "https://via.placeholder.com/600x400?text=MeganTheeStallion" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Christian Bale ile bir tarihi kostüm partisi düzenlemek", "en": "Host a historical costume party with Christian Bale" }, "image": "https://via.placeholder.com/600x400?text=ChristianBale" },
      option2: { "text": { "tr": "Joaquin Phoenix ile bir psikolojik bulmaca oyunu tasarlamak", "en": "Design a psychological puzzle game with Joaquin Phoenix" }, "image": "https://via.placeholder.com/600x400?text=JoaquinPhoenix" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Khloe Kardashian ile bir fitness uygulaması geliştirmek", "en": "Develop a fitness app with Khloe Kardashian" }, "image": "https://via.placeholder.com/600x400?text=KhloeKardashian" },
      option2: { "text": { "tr": "Kourtney Kardashian ile bir sağlıklı yaşam blogu başlatmak", "en": "Start a wellness blog with Kourtney Kardashian" }, "image": "https://via.placeholder.com/600x400?text=KourtneyKardashian" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Ryan Seacrest ile bir ödül törenine ev sahipliği yapmak", "en": "Host an awards ceremony with Ryan Seacrest" }, "image": "https://via.placeholder.com/600x400?text=RyanSeacrest" },
      option2: { "text": { "tr": "Jimmy Fallon ile bir gece şovunda skeç yapmak", "en": "Perform a sketch on a late-night show with Jimmy Fallon" }, "image": "https://via.placeholder.com/600x400?text=JimmyFallon" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Mila Kunis ile bir ev yenileme projesine katılmak", "en": "Join a home renovation project with Mila Kunis" }, "image": "https://via.placeholder.com/600x400?text=MilaKunis" },
      option2: { "text": { "tr": "Kristen Wiig ile bir doğaçlama komedi atölyesine katılmak", "en": "Attend an improv comedy workshop with Kristen Wiig" }, "image": "https://via.placeholder.com/600x400?text=KristenWiig" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Pharrell Williams ile bir çevre dostu moda hattı tasarlamak", "en": "Design an eco-friendly fashion line with Pharrell Williams" }, "image": "https://via.placeholder.com/600x400?text=PharrellWilliams" },
      option2: { "text": { "tr": "Timbaland ile bir müzik prodüksiyon stüdyosu kurmak", "en": "Set up a music production studio with Timbaland" }, "image": "https://via.placeholder.com/600x400?text=Timbaland" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Anne Hathaway ile bir bale gösterisi izlemek", "en": "Watch a ballet performance with Anne Hathaway" }, "image": "https://via.placeholder.com/600x400?text=AnneHathaway" },
      option2: { "text": { "tr": "Rachel McAdams ile bir tiyatro oyununa gitmek", "en": "Attend a theater play with Rachel McAdams" }, "image": "https://via.placeholder.com/600x400?text=RachelMcAdams" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "50 Cent ile bir girişimcilik seminerine katılmak", "en": "Attend an entrepreneurship seminar with 50 Cent" }, "image": "https://via.placeholder.com/600x400?text=50Cent" },
      option2: { "text": { "tr": "Dr. Dre ile bir müzik ekipmanı markası başlatmak", "en": "Start a music equipment brand with Dr. Dre" }, "image": "https://via.placeholder.com/600x400?text=DrDre" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Emma Watson ile bir kitap fuarında gönüllü olmak", "en": "Volunteer at a book fair with Emma Watson" }, "image": "https://via.placeholder.com/600x400?text=EmmaWatson" },
      option2: { "text": { "tr": "Daniel Radcliffe ile bir sihirbazlık gösterisi düzenlemek", "en": "Organize a magic show with Daniel Radcliffe" }, "image": "https://via.placeholder.com/600x400?text=DanielRadcliffe" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Victoria Beckham ile bir moda dergisi kapağı tasarlamak", "en": "Design a fashion magazine cover with Victoria Beckham" }, "image": "https://via.placeholder.com/600x400?text=VictoriaBeckham" },
      option2: { "text": { "tr": "Kourtney Kardashian ile bir sağlıklı yaşam dergisi kapağı tasarlamak", "en": "Design a wellness magazine cover with Kourtney Kardashian" }, "image": "https://via.placeholder.com/600x400?text=KourtneyKardashian" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "James Corden ile bir araba karoke şovuna katılmak", "en": "Join a carpool karaoke show with James Corden" }, "image": "https://via.placeholder.com/600x400?text=JamesCorden" },
      option2: { "text": { "tr": "Jimmy Kimmel ile bir sokak röportajı yapmak", "en": "Conduct a street interview with Jimmy Kimmel" }, "image": "https://via.placeholder.com/600x400?text=JimmyKimmel" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Chris Pine ile bir uzay temalı VR oyunu tasarlamak", "en": "Design a space-themed VR game with Chris Pine" }, "image": "https://via.placeholder.com/600x400?text=ChrisPine" },
      option2: { "text": { "tr": "Harrison Ford ile bir arkeoloji sergisi düzenlemek", "en": "Curate an archaeology exhibit with Harrison Ford" }, "image": "https://via.placeholder.com/600x400?text=HarrisonFord" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Camila Cabello ile bir Latin dansı yarışmasına katılmak", "en": "Compete in a Latin dance competition with Camila Cabello" }, "image": "https://via.placeholder.com/600x400?text=CamilaCabello" },
      option2: { "text": { "tr": "Demi Lovato ile bir şarkı sözü yazma kampına katılmak", "en": "Join a songwriting camp with Demi Lovato" }, "image": "https://via.placeholder.com/600x400?text=DemiLovato" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Will Ferrell ile bir palyaço kostümüyle şehir turu yapmak", "en": "Tour the city in a clown costume with Will Ferrell" }, "image": "https://via.placeholder.com/600x400?text=WillFerrell" },
      option2: { "text": { "tr": "Steve Carell ile bir ofis temalı parti düzenlemek", "en": "Host an office-themed party with Steve Carell" }, "image": "https://via.placeholder.com/600x400?text=SteveCarell" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Rita Ora ile bir sokak sanatı projesine katılmak", "en": "Join a street art project with Rita Ora" }, "image": "https://via.placeholder.com/600x400?text=RitaOra" },
      option2: { "text": { "tr": "Bebe Rexha ile bir müzik klibi için konsept tasarlamak", "en": "Design a concept for a music video with Bebe Rexha" }, "image": "https://via.placeholder.com/600x400?text=BebeRexha" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Idris Elba ile bir dedektif romanı yazmak", "en": "Write a detective novel with Idris Elba" }, "image": "https://via.placeholder.com/600x400?text=IdrisElba" },
      option2: { "text": { "tr": "Denzel Washington ile bir suç belgeseli çekmek", "en": "Film a crime documentary with Denzel Washington" }, "image": "https://via.placeholder.com/600x400?text=DenzelWashington" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Chris Hemsworth ile bir sörf yarışmasına katılmak", "en": "Compete in a surfing competition with Chris Hemsworth" }, "image": "https://via.placeholder.com/600x400?text=ChrisHemsworth" },
      option2: { "text": { "tr": "Ryan Reynolds ile bir stand-up komedi yazma kampına katılmak", "en": "Join a stand-up comedy writing camp with Ryan Reynolds" }, "image": "https://via.placeholder.com/600x400?text=RyanReynolds" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Taylor Swift ile bir hayran sürpriz videosu çekmek", "en": "Film a fan surprise video with Taylor Swift" }, "image": "https://via.placeholder.com/600x400?text=TaylorSwift" },
      option2: { "text": { "tr": "Billie Eilish ile bir hayran sanatı sergisi düzenlemek", "en": "Organize a fan art exhibition with Billie Eilish" }, "image": "https://via.placeholder.com/600x400?text=BillieEilish" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Meryl Streep ile bir şiir okuma gecesine katılmak", "en": "Join a poetry reading night with Meryl Streep" }, "image": "https://via.placeholder.com/600x400?text=MerylStreep" },
      option2: { "text": { "tr": "Denzel Washington ile bir hikaye anlatımı atölyesine katılmak", "en": "Attend a storytelling workshop with Denzel Washington" }, "image": "https://via.placeholder.com/600x400?text=DenzelWashington" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Elon Musk ile bir roket lansmanına tanıklık etmek", "en": "Witness a rocket launch with Elon Musk" }, "image": "https://via.placeholder.com/600x400?text=ElonMusk" },
      option2: { "text": { "tr": "Mark Zuckerberg ile bir VR dünyasında gezmek", "en": "Explore a VR world with Mark Zuckerberg" }, "image": "https://via.placeholder.com/600x400?text=MarkZuckerberg" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Oprah Winfrey ile bir meditasyon kampına katılmak", "en": "Join a meditation retreat with Oprah Winfrey" }, "image": "https://via.placeholder.com/600x400?text=OprahWinfrey" },
      option2: { "text": { "tr": "Ellen DeGeneres ile bir hayvan barınağında gönüllü olmak", "en": "Volunteer at an animal shelter with Ellen DeGeneres" }, "image": "https://via.placeholder.com/600x400?text=EllenDeGeneres" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Johnny Depp ile bir korsan temalı parti düzenlemek", "en": "Host a pirate-themed party with Johnny Depp" }, "image": "https://via.placeholder.com/600x400?text=JohnnyDepp" },
      option2: { "text": { "tr": "Keira Knightley ile bir tarihi balo düzenlemek", "en": "Organize a historical ball with Keira Knightley" }, "image": "https://via.placeholder.com/600x400?text=KeiraKnightley" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Lady Gaga ile bir performans sanatı sergisi oluşturmak", "en": "Create a performance art exhibit with Lady Gaga" }, "image": "https://via.placeholder.com/600x400?text=LadyGaga" },
      option2: { "text": { "tr": "Katy Perry ile bir pop art galerisi açmak", "en": "Open a pop art gallery with Katy Perry" }, "image": "https://via.placeholder.com/600x400?text=KatyPerry" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Robert Downey Jr. ile bir bilimkurgu oyuncak seti tasarlamak", "en": "Design a sci-fi toy set with Robert Downey Jr." }, "image": "https://via.placeholder.com/600x400?text=RobertDowneyJr" },
      option2: { "text": { "tr": "Chris Evans ile bir süper kahraman temalı oyuncak mağazası açmak", "en": "Open a superhero-themed toy store with Chris Evans" }, "image": "https://via.placeholder.com/600x400?text=ChrisEvans" },
      votes1: 0,
      votes2: 0
    },
    {
       id: uuidv4(),
      option1: { "text": { "tr": "Ariana Grande ile bir makyaj yarışmasına katılmak", "en": "Compete in a makeup contest with Ariana Grande" }, "image": "https://via.placeholder.com/600x400?text=ArianaGrande" },
      option2: { "text": { "tr": "Dua Lipa ile bir dans klibi için koreografi oluşturmak", "en": "Create choreography for a dance video with Dua Lipa" }, "image": "https://via.placeholder.com/600x400?text=DuaLipa" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Will Smith ile bir bilimkurgu temalı eğlence parkı açmak", "en": "Open a sci-fi themed amusement park with Will Smith" }, "image": "https://via.placeholder.com/600x400?text=WillSmith" },
      option2: { "text": { "tr": "Kevin Hart ile bir komedi kulübü işletmek", "en": "Run a comedy club with Kevin Hart" }, "image": "https://via.placeholder.com/600x400?text=KevinHart" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Angelina Jolie ile bir arkeolojik kazıya katılmak", "en": "Join an archaeological dig with Angelina Jolie" }, "image": "https://via.placeholder.com/600x400?text=AngelinaJolie" },
      option2: { "text": { "tr": "George Clooney ile bir tarihi belgesel çekmek", "en": "Film a historical documentary with George Clooney" }, "image": "https://via.placeholder.com/600x400?text=GeorgeClooney" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Drake ile bir basketbol sahası tasarlamak", "en": "Design a basketball court with Drake" }, "image": "https://via.placeholder.com/600x400?text=Drake" },
      option2: { "text": { "tr": "Post Malone ile bir müzik temalı kafe açmak", "en": "Open a music-themed café with Post Malone" }, "image": "https://via.placeholder.com/600x400?text=PostMalone" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Jennifer Lawrence ile bir okçuluk yarışmasına katılmak", "en": "Compete in an archery contest with Jennifer Lawrence" }, "image": "https://via.placeholder.com/600x400?text=JenniferLawrence" },
      option2: { "text": { "tr": "Emma Stone ile bir tiyatro atölyesine katılmak", "en": "Attend a theater workshop with Emma Stone" }, "image": "https://via.placeholder.com/600x400?text=EmmaStone" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Justin Bieber ile bir sokak sanatı festivaline katılmak", "en": "Join a street art festival with Justin Bieber" }, "image": "https://via.placeholder.com/600x400?text=JustinBieber" },
      option2: { "text": { "tr": "Shawn Mendes ile bir hayran buluşma etkinliği düzenlemek", "en": "Organize a fan meet-up event with Shawn Mendes" }, "image": "https://via.placeholder.com/600x400?text=ShawnMendes" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Scarlett Johansson ile bir bilimkurgu kitabı yazmak", "en": "Write a sci-fi book with Scarlett Johansson" }, "image": "https://via.placeholder.com/600x400?text=ScarlettJohansson" },
      option2: { "text": { "tr": "Natalie Portman ile bir felsefe tartışmasına katılmak", "en": "Join a philosophy discussion with Natalie Portman" }, "image": "https://via.placeholder.com/600x400?text=NataliePortman" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Ed Sheeran ile bir akustik müzik kampına katılmak", "en": "Join an acoustic music camp with Ed Sheeran" }, "image": "https://via.placeholder.com/600x400?text=EdSheeran" },
      option2: { "text": { "tr": "Bruno Mars ile bir funk müzik festivali düzenlemek", "en": "Organize a funk music festival with Bruno Mars" }, "image": "https://via.placeholder.com/600x400?text=BrunoMars" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Tom Cruise ile bir paraşütle atlama macerasına katılmak", "en": "Go skydiving with Tom Cruise" }, "image": "https://via.placeholder.com/600x400?text=TomCruise" },
      option2: { "text": { "tr": "Vin Diesel ile bir drag yarışı düzenlemek", "en": "Organize a drag race with Vin Diesel" }, "image": "https://via.placeholder.com/600x400?text=VinDiesel" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Selena Gomez ile bir yemek tarifi kitabı yazmak", "en": "Write a cookbook with Selena Gomez" }, "image": "https://via.placeholder.com/600x400?text=SelenaGomez" },
      option2: { "text": { "tr": "Zendaya ile bir moda defilesi düzenlemek", "en": "Organize a fashion show with Zendaya" }, "image": "https://via.placeholder.com/600x400?text=Zendaya" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Ryan Gosling ile bir caz kulübünde sahne almak", "en": "Perform at a jazz club with Ryan Gosling" }, "image": "https://via.placeholder.com/600x400?text=RyanGosling" },
      option2: { "text": { "tr": "Channing Tatum ile bir dans kulübünde dans etmek", "en": "Dance at a dance club with Channing Tatum" }, "image": "https://via.placeholder.com/600x400?text=ChanningTatum" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Cardi B ile bir müzik ödül törenine katılmak", "en": "Attend a music awards ceremony with Cardi B" }, "image": "https://via.placeholder.com/600x400?text=CardiB" },
      option2: { "text": { "tr": "Nicki Minaj ile bir rap müzik kampına katılmak", "en": "Join a rap music camp with Nicki Minaj" }, "image": "https://via.placeholder.com/600x400?text=NickiMinaj" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Hugh Jackman ile bir müzikal tiyatro kampına katılmak", "en": "Join a musical theater camp with Hugh Jackman" }, "image": "https://via.placeholder.com/600x400?text=HughJackman" },
      option2: { "text": { "tr": "Zac Efron ile bir dans yarışması düzenlemek", "en": "Organize a dance competition with Zac Efron" }, "image": "https://via.placeholder.com/600x400?text=ZacEfron" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Miley Cyrus ile bir yoga kampına katılmak", "en": "Join a yoga retreat with Miley Cyrus" }, "image": "https://via.placeholder.com/600x400?text=MileyCyrus" },
      option2: { "text": { "tr": "Shakira ile bir salsa dans kampına katılmak", "en": "Join a salsa dance camp with Shakira" }, "image": "https://via.placeholder.com/600x400?text=Shakira" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Keanu Reeves ile bir felsefe kitabı tartışmak", "en": "Discuss a philosophy book with Keanu Reeves" }, "image": "https://via.placeholder.com/600x400?text=KeanuReeves" },
      option2: { "text": { "tr": "Jason Statham ile bir aksiyon filmi sahnesi tasarlamak", "en": "Design an action movie scene with Jason Statham" }, "image": "https://via.placeholder.com/600x400?text=JasonStatham" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Kylie Jenner ile bir güzellik salonu işletmek", "en": "Run a beauty salon with Kylie Jenner" }, "image": "https://via.placeholder.com/600x400?text=KylieJenner" },
      option2: { "text": { "tr": "Kim Kardashian ile bir moda butiği açmak", "en": "Open a fashion boutique with Kim Kardashian" }, "image": "https://via.placeholder.com/600x400?text=KimKardashian" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Chris Pratt ile bir dinozor temalı park gezmek", "en": "Tour a dinosaur-themed park with Chris Pratt" }, "image": "https://via.placeholder.com/600x400?text=ChrisPratt" },
      option2: { "text": { "tr": "Adam Sandler ile bir golf turnuvasına katılmak", "en": "Join a golf tournament with Adam Sandler" }, "image": "https://via.placeholder.com/600x400?text=AdamSandler" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Eminem ile bir rap müzik tarihi sergisi düzenlemek", "en": "Curate a rap music history exhibit with Eminem" }, "image": "https://via.placeholder.com/600x400?text=Eminem" },
      option2: { "text": { "tr": "Jay-Z ile bir müzik girişimcilik semineri düzenlemek", "en": "Organize a music entrepreneurship seminar with Jay-Z" }, "image": "https://via.placeholder.com/600x400?text=JayZ" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Margot Robbie ile bir 1920'ler temalı parti düzenlemek", "en": "Host a 1920s-themed party with Margot Robbie" }, "image": "https://via.placeholder.com/600x400?text=MargotRobbie" },
      option2: { "text": { "tr": "Charlize Theron ile bir casus temalı parti düzenlemek", "en": "Host a spy-themed party with Charlize Theron" }, "image": "https://via.placeholder.com/600x400?text=CharlizeTheron" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "The Weeknd ile bir gece yarısı konseri düzenlemek", "en": "Organize a midnight concert with The Weeknd" }, "image": "https://via.placeholder.com/600x400?text=TheWeeknd" },
      option2: { "text": { "tr": "Justin Timberlake ile bir dans partisi düzenlemek", "en": "Host a dance party with Justin Timberlake" }, "image": "https://via.placeholder.com/600x400?text=JustinTimberlake" },
      votes1: 0,
      votes2: 0
    },
    {
       id: uuidv4(),
      option1: { "text": { "tr": "Sandra Bullock ile bir gizem romanı yazmak", "en": "Write a mystery novel with Sandra Bullock" }, "image": "https://via.placeholder.com/600x400?text=SandraBullock" },
      option2: { "text": { "tr": "Reese Witherspoon ile bir romantik komedi senaryosu yazmak", "en": "Write a rom-com script with Reese Witherspoon" }, "image": "https://via.placeholder.com/600x400?text=ReeseWitherspoon" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Snoop Dogg ile bir esrar temalı kafe açmak", "en": "Open a cannabis-themed café with Snoop Dogg" }, "image": "https://via.placeholder.com/600x400?text=SnoopDogg" },
      option2: { "text": { "tr": "Lil Wayne ile bir hip-hop temalı bar açmak", "en": "Open a hip-hop themed bar with Lil Wayne" }, "image": "https://via.placeholder.com/600x400?text=LilWayne" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Gal Gadot ile bir kılıç dövüşü dersi almak", "en": "Take a sword fighting lesson with Gal Gadot" }, "image": "https://via.placeholder.com/600x400?text=GalGadot" },
      option2: { "text": { "tr": "Brie Larson ile bir boks dersi almak", "en": "Take a boxing lesson with Brie Larson" }, "image": "https://via.placeholder.com/600x400?text=BrieLarson" },
      "votes1": 0,
      "votes2": 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Alicia Keys ile bir müzik terapi atölyesine katılmak", "en": "Join a music therapy workshop with Alicia Keys" }, "image": "https://via.placeholder.com/600x400?text=AliciaKeys" },
      option2: { "text": { "tr": "John Legend ile bir şarkı yazma atölyesine katılmak", "en": "Join a songwriting workshop with John Legend" }, "image": "https://via.placeholder.com/600x400?text=JohnLegend" },
      votes1: 0,
      votes2: 0
    },
    {
        id: uuidv4(),
      option1: { "text": { "tr": "Ben Affleck ile bir süper kahraman filmi senaryosu yazmak", "en": "Write a superhero movie script with Ben Affleck" }, "image": "https://via.placeholder.com/600x400?text=BenAffleck" },
      option2: { "text": { "tr": "Matt Damon ile bir savaş filmi senaryosu yazmak", "en": "Write a war movie script with Matt Damon" }, "image": "https://via.placeholder.com/600x400?text=MattDamon" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "P!nk ile bir akrobasi şovuna katılmak", "en": "Join an acrobatics show with P!nk" }, "image": "https://via.placeholder.com/600x400?text=Pink" },
      option2: { "text": { "tr": "Kelly Clarkson ile bir şarkı yarışmasına katılmak", "en": "Compete in a singing competition with Kelly Clarkson" }, "image": "https://via.placeholder.com/600x400?text=KellyClarkson" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Mark Wahlberg ile bir spor salonu açmak", "en": "Open a gym with Mark Wahlberg" }, "image": "https://via.placeholder.com/600x400?text=MarkWahlberg" },
      option2: { "text": { "tr": "John Cena ile bir fitness kampı düzenlemek", "en": "Organize a fitness camp with John Cena" }, "image": "https://via.placeholder.com/600x400?text=JohnCena" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Lizzo ile bir vücut pozitifliği kampanyası başlatmak", "en": "Launch a body positivity campaign with Lizzo" }, "image": "https://via.placeholder.com/600x400?text=Lizzo" },
      option2: { "text": { "tr": "Megan Thee Stallion ile bir dans fitness programı tasarlamak", "en": "Design a dance fitness program with Megan Thee Stallion" }, "image": "https://via.placeholder.com/600x400?text=MeganTheeStallion" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Christian Bale ile bir tarihi reenactment etkinliğine katılmak", "en": "Join a historical reenactment event with Christian Bale" }, "image": "https://via.placeholder.com/600x400?text=ChristianBale" },
      option2: { "text": { "tr": "Joaquin Phoenix ile bir psikolojik drama senaryosu yazmak", "en": "Write a psychological drama script with Joaquin Phoenix" }, "image": "https://via.placeholder.com/600x400?text=JoaquinPhoenix" },
      votes1: 0,
      votes2: 0
    },
    {
       id: uuidv4(),
      option1: { "text": { "tr": "Khloe Kardashian ile bir diyet planı geliştirmek", "en": "Develop a diet plan with Khloe Kardashian" }, "image": "https://via.placeholder.com/600x400?text=KhloeKardashian" },
      option2: { "text": { "tr": "Kourtney Kardashian ile bir organik ürün markası başlatmak", "en": "Start an organic product brand with Kourtney Kardashian" }, "image": "https://via.placeholder.com/600x400?text=KourtneyKardashian" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Ryan Seacrest ile bir radyo şovu sunmak", "en": "Host a radio show with Ryan Seacrest" }, "image": "https://via.placeholder.com/600x400?text=RyanSeacrest" },
      option2: { "text": { "tr": "Jimmy Fallon ile bir komedi skeç şovu sunmak", "en": "Host a comedy sketch show with Jimmy Fallon" }, "image": "https://via.placeholder.com/600x400?text=JimmyFallon" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Mila Kunis ile bir evcil hayvan barınağında gönüllü olmak", "en": "Volunteer at a pet shelter with Mila Kunis" }, "image": "https://via.placeholder.com/600x400?text=MilaKunis" },
      option2: { "text": { "tr": "Kristen Wiig ile bir komedi festivalinde sahne almak", "en": "Perform at a comedy festival with Kristen Wiig" }, "image": "https://via.placeholder.com/600x400?text=KristenWiig" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Pharrell Williams ile bir sürdürülebilirlik projesi yürütmek", "en": "Run a sustainability project with Pharrell Williams" }, "image": "https://via.placeholder.com/600x400?text=PharrellWilliams" },
      option2: { "text": { "tr": "Timbaland ile bir müzik teknolojisi girişimi başlatmak", "en": "Start a music tech startup with Timbaland" }, "image": "https://via.placeholder.com/600x400?text=Timbaland" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Anne Hathaway ile bir opera izlemek", "en": "Watch an opera with Anne Hathaway" }, "image": "https://via.placeholder.com/600x400?text=AnneHathaway" },
      option2: { "text": { "tr": "Rachel McAdams ile bir romantik komedi gecesi düzenlemek", "en": "Host a rom-com movie night with Rachel McAdams" }, "image": "https://via.placeholder.com/600x400?text=RachelMcAdams" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "50 Cent ile bir sokak basketbolu turnuvasına katılmak", "en": "Join a street basketball tournament with 50 Cent" }, "image": "https://via.placeholder.com/600x400?text=50Cent" },
      option2: { "text": { "tr": "Dr. Dre ile bir müzik stüdyosu tasarlamak", "en": "Design a music studio with Dr. Dre" }, "image": "https://via.placeholder.com/600x400?text=DrDre" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Emma Watson ile bir çevre koruma kampanyası yürütmek", "en": "Run an environmental campaign with Emma Watson" }, "image": "https://via.placeholder.com/600x400?text=EmmaWatson" },
      option2: { "text": { "tr": "Daniel Radcliffe ile bir sihirbazlık atölyesine katılmak", "en": "Join a magic workshop with Daniel Radcliffe" }, "image": "https://via.placeholder.com/600x400?text=DanielRadcliffe" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Victoria Beckham ile bir moda atölyesine katılmak", "en": "Join a fashion workshop with Victoria Beckham" }, "image": "https://via.placeholder.com/600x400?text=VictoriaBeckham" },
      option2: { "text": { "tr": "Kourtney Kardashian ile bir sağlıklı yaşam seminerine katılmak", "en": "Join a wellness seminar with Kourtney Kardashian" }, "image": "https://via.placeholder.com/600x400?text=KourtneyKardashian" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "James Corden ile bir komedi tiyatrosunda sahne almak", "en": "Perform at a comedy theater with James Corden" }, "image": "https://via.placeholder.com/600x400?text=JamesCorden" },
      option2: { "text": { "tr": "Jimmy Kimmel ile bir komedi şovu yazmak", "en": "Write a comedy show with Jimmy Kimmel" }, "image": "https://via.placeholder.com/600x400?text=JimmyKimmel" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Chris Pine ile bir uzay müzesi gezmek", "en": "Visit a space museum with Chris Pine" }, "image": "https://via.placeholder.com/600x400?text=ChrisPine" },
      option2: { "text": { "tr": "Harrison Ford ile bir macera filmi setini gezmek", "en": "Tour an adventure movie set with Harrison Ford" }, "image": "https://via.placeholder.com/600x400?text=HarrisonFord" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Camila Cabello ile bir Latin müzik festivali düzenlemek", "en": "Organize a Latin music festival with Camila Cabello" }, "image": "https://via.placeholder.com/600x400?text=CamilaCabello" },
      option2: { "text": { "tr": "Demi Lovato ile bir müzik terapi kampı düzenlemek", "en": "Organize a music therapy camp with Demi Lovato" }, "image": "https://via.placeholder.com/600x400?text=DemiLovato" },
      votes1: 0,
      votes2: 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Will Ferrell ile bir komedi filmi festivaline katılmak", "en": "Join a comedy film festival with Will Ferrell" }, "image": "https://via.placeholder.com/600x400?text=WillFerrell" },
      option2: { "text": { "tr": "Steve Carell ile bir doğaçlama komedi şovu düzenlemek", "en": "Organize an improv comedy show with Steve Carell" }, "image": "https://via.placeholder.com/600x400?text=SteveCarell" },
      "votes1": 0,
      "votes2": 0
    },
    {
      id: uuidv4(),
      option1: { "text": { "tr": "Rita Ora ile bir müzik videosu için kostüm tasarlamak", "en": "Design costumes for a music video with Rita Ora" }, "image": "https://via.placeholder.com/600x400?text=RitaOra" },
      option2: { "text": { "tr": "Bebe Rexha ile bir müzik videosu için sahne tasarlamak", "en": "Design a set for a music video with Bebe Rexha" }, "image": "https://via.placeholder.com/600x400?text=BebeRexha" },
      votes1: 0,
      votes2: 0
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
    {
      id: uuidv4(),
      option1: { text: { tr: "Şeytanla anlaşarak ölümsüzlük kazanmak", en: "Gain immortality through a deal with the Devil" }, image: "https://via.placeholder.com/600x400?text=Immortality" },
      option2: { text: { tr: "Şeytanla anlaşarak mutlak güç elde etmek", en: "Gain absolute power through a deal with the Devil" }, image: "https://via.placeholder.com/600x400?text=Power" },
      votes1: 90,
      votes2: 110,
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
    {
      id: uuidv4(),
      option1: { text: { tr: "Game of Thrones’da Westeros’un Kralı olmak", en: "Become the King of Westeros in Game of Thrones" }, image: "https://via.placeholder.com/600x400?text=GameOfThrones" },
      option2: { text: { tr: "The Crown'da Birleşik Krallık'ın Kraliçesi olmak", en: "Become the Queen of the United Kingdom in The Crown" }, image: "https://via.placeholder.com/600x400?text=StrangerThings" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Harry Potter gibi Hogwarts’a kabul edilmek ve büyücü olmak", en: "Be accepted to Hogwarts and become a wizard like Harry Potter" }, image: "https://via.placeholder.com/600x400?text=HarryPotter" },
      option2: { text: { tr: "The Witcher dünyasında canavar avcısı olmak", en: "Become a monster hunter in The Witcher universe" }, image: "https://via.placeholder.com/600x400?text=TheWitcher" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Joker gibi Gotham’da kaos yaratmak", en: "Create chaos in Gotham like Joker" }, image: "https://via.placeholder.com/600x400?text=Joker" },
      option2: { text: { tr: "Batman gibi Gotham’ı korumak", en: "Protect Gotham like Batman" }, image: "https://via.placeholder.com/600x400?text=Batman" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Star Wars’da Jedi olmak ve ışın kılıcı kullanmak", en: "Become a Jedi in Star Wars and wield a lightsaber" }, image: "https://via.placeholder.com/600x400?text=StarWars" },
      option2: { text: { tr: "Star Trek’de uzay gemisi kaptanı olmak", en: "Be the captain of a starship in Star Trek" }, image: "https://via.placeholder.com/600x400?text=StarTrek" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Black Mirror dünyasında teknolojinin kontrolden çıktığı bir gelecekte yaşamak", en: "Live in a Black Mirror world where technology is out of control" }, image: "https://via.placeholder.com/600x400?text=BlackMirror" },
      option2: { text: { tr: "Westworld’de yapay zekaların arasında özgürlük mücadelesi vermek", en: "Fight for freedom among AI in Westworld" }, image: "https://via.placeholder.com/600x400?text=Westworld" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Breaking Bad’de Walter White olmak", en: "Be Walter White in Breaking Bad" }, image: "https://via.placeholder.com/600x400?text=BreakingBad" },
      option2: { text: { tr: "Better Call Saul’da Saul Goodman olmak", en: "Be Saul Goodman in Better Call Saul" }, image: "https://via.placeholder.com/600x400?text=BetterCallSaul" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Friends ekibine katılmak ve Central Perk’te vakit geçirmek", en: "Join the Friends crew and hang out at Central Perk" }, image: "https://via.placeholder.com/600x400?text=Friends" },
      option2: { text: { tr: "The Office’de ofiste çalışmak ve şakalar yapmak", en: "Work and prank in The Office" }, image: "https://via.placeholder.com/600x400?text=TheOffice" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Avatar: The Last Airbender’da elementleri kontrol etmek", en: "Control elements in Avatar: The Last Airbender" }, image: "https://via.placeholder.com/600x400?text=Avatar" },
      option2: { text: { tr: "Rick and Morty’de çılgın maceralara atılmak", en: "Go on crazy adventures in Rick and Morty" }, image: "https://via.placeholder.com/600x400?text=RickAndMorty" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "The Mandalorian olarak galakside ödül avcılığı yapmak", en: "Be The Mandalorian and bounty hunt across the galaxy" }, image: "https://via.placeholder.com/600x400?text=Mandalorian" },
      option2: { text: { tr: "Guardians of the Galaxy’de uzay macerasına çıkmak", en: "Go on space adventures with Guardians of the Galaxy" }, image: "https://via.placeholder.com/600x400?text=Guardians" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Sherlock Holmes gibi zeki bir dedektif olmak", en: "Be a genius detective like Sherlock Holmes" }, image: "https://via.placeholder.com/600x400?text=Sherlock" },
      option2: { text: { tr: "Loki gibi zamanda yolculuk yapmak", en: "Travel through time like Loki" }, image: "https://via.placeholder.com/600x400?text=Loki" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "The Witcher’da Yennefer ile büyü yapmak", en: "Cast magic with Yennefer in The Witcher" }, image: "https://via.placeholder.com/600x400?text=WitcherYennefer" },
      option2: { text: { tr: "Game of Thrones’da Arya Stark gibi intikam almak", en: "Take revenge like Arya Stark in Game of Thrones" }, image: "https://via.placeholder.com/600x400?text=AryaStark" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Breaking Bad’de kimya dersi almak", en: "Take chemistry lessons in Breaking Bad" }, image: "https://via.placeholder.com/600x400?text=BreakingBad" },
      option2: { text: { tr: "Stranger Things’de Eleven gibi telekinetik güçlere sahip olmak", en: "Have telekinetic powers like Eleven in Stranger Things" }, image: "https://via.placeholder.com/600x400?text=Eleven" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Jurassic Park’ta dinozorlarla hayatta kalmak", en: "Survive with dinosaurs in Jurassic Park" }, image: "https://via.placeholder.com/600x400?text=JurassicPark" },
      option2: { text: { tr: "Godzilla ile karşı karşıya gelmek", en: "Face Godzilla in battle" }, image: "https://via.placeholder.com/600x400?text=Godzilla" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Pirates of the Caribbean’da korsan olmak", en: "Be a pirate in Pirates of the Caribbean" }, image: "https://via.placeholder.com/600x400?text=Pirates" },
      option2: { text: { tr: "The Walking Dead’de zombi kıyametinden kaçmak", en: "Escape the zombie apocalypse in The Walking Dead" }, image: "https://via.placeholder.com/600x400?text=WalkingDead" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "The Simpsons dünyasında yaşamak", en: "Live in The Simpsons universe" }, image: "https://via.placeholder.com/600x400?text=Simpsons" },
      option2: { text: { tr: "South Park’ta bir karakter olmak", en: "Be a character in South Park" }, image: "https://via.placeholder.com/600x400?text=SouthPark" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Marvel’da Örümcek Adam olmak", en: "Be Spider-Man in the Marvel universe" }, image: "https://via.placeholder.com/600x400?text=SpiderMan" },
      option2: { text: { tr: "DC’de Wonder Woman olmak", en: "Be Wonder Woman in the DC universe" }, image: "https://via.placeholder.com/600x400?text=WonderWoman" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Harry Potter’da Slytherin evi üyesi olmak", en: "Be a Slytherin in Harry Potter" }, image: "https://via.placeholder.com/600x400?text=Slytherin" },
      option2: { text: { tr: "Harry Potter’da Gryffindor evi üyesi olmak", en: "Be a Gryffindor in Harry Potter" }, image: "https://via.placeholder.com/600x400?text=Gryffindor" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Stranger Things'te Upside Down'da hapsolmak", en: "Being trapped in the Upside Down in Stranger Things" }, image: "https://via.placeholder.com/600x400?text=Demogorgon" },
      option2: { text: { tr: "Stranger Things'te Hawkins Ulusal Laboratuvar'da hapsolmak", en: "Being Trapped in Hawkins National Laboratory in Stranger Things" }, image: "https://via.placeholder.com/600x400?text=Hopper" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Marvel’da Doctor Strange olmak", en: "Be Doctor Strange in Marvel" }, image: "https://via.placeholder.com/600x400?text=DoctorStrange" },
      option2: { text: { tr: "Marvel’da Iron Man olmak", en: "Be Iron Man in Marvel" }, image: "https://via.placeholder.com/600x400?text=IronMan" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Black Panther olmak ve Wakanda’yı yönetmek", en: "Be Black Panther and rule Wakanda" }, image: "https://via.placeholder.com/600x400?text=BlackPanther" },
      option2: { text: { tr: "Thor olmak ve Asgard’ı korumak", en: "Be Thor and protect Asgard" }, image: "https://via.placeholder.com/600x400?text=Thor" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Friends’de Joey olmak ve pizza yemek", en: "Be Joey in Friends and eat pizza" }, image: "https://via.placeholder.com/600x400?text=Joey" },
      option2: { text: { tr: "Friends’de Chandler olmak ve espriler yapmak", en: "Be Chandler in Friends and crack jokes" }, image: "https://via.placeholder.com/600x400?text=Chandler" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Westworld’de robot olmak", en: "Be a robot in Westworld" }, image: "https://via.placeholder.com/600x400?text=WestworldRobot" },
      option2: { text: { tr: "Westworld’de insan olarak hayatta kalmak", en: "Survive as a human in Westworld" }, image: "https://via.placeholder.com/600x400?text=WestworldHuman" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Lord of the Rings’de Gandalf olmak", en: "Be Gandalf in Lord of the Rings" }, image: "https://via.placeholder.com/600x400?text=Gandalf" },
      option2: { text: { tr: "Lord of the Rings’de Sauron olmak", en: "Be Sauron in Lord of the Rings" }, image: "https://via.placeholder.com/600x400?text=Aragorn" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Marvel’da Hulk olmak ve öfkeyle güçlenmek", en: "Be Hulk in Marvel and grow stronger with anger" }, image: "https://via.placeholder.com/600x400?text=Hulk" },
      option2: { text: { tr: "Marvel’da Captain America olmak ve liderlik yapmak", en: "Be Captain America in Marvel and lead" }, image: "https://via.placeholder.com/600x400?text=CaptainAmerica" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Breaking Bad’de Walter White’ın yerinde olmak", en: "Be Walter White in Breaking Bad" }, image: "https://via.placeholder.com/600x400?text=BreakingBad" },
      option2: { text: { tr: "Stranger Things’de Eleven olmak", en: "Be Eleven in Stranger Things" }, image: "https://via.placeholder.com/600x400?text=StrangerThings" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Game of Thrones’da ejderha sürmek", en: "Ride a dragon in Game of Thrones" }, image: "https://via.placeholder.com/600x400?text=GameOfThrones" },
      option2: { text: { tr: "The Mandalorian’da ödül avcısı olmak", en: "Be a bounty hunter in The Mandalorian" }, image: "https://via.placeholder.com/600x400?text=Mandalorian" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Hogwarts’ta büyü yapmak", en: "Cast spells at Hogwarts" }, image: "https://via.placeholder.com/600x400?text=HarryPotter" },
      option2: { text: { tr: "The Witcher’da canavar avlamak", en: "Hunt monsters in The Witcher" }, image: "https://via.placeholder.com/600x400?text=TheWitcher" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Black Mirror’da sanal gerçeklik evreninde yaşamak", en: "Live in a virtual reality world in Black Mirror" }, image: "https://via.placeholder.com/600x400?text=BlackMirror" },
      option2: { text: { tr: "Westworld’de robot olarak insanları kandırmak", en: "Deceive humans as a robot in Westworld" }, image: "https://via.placeholder.com/600x400?text=Westworld" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "The Office’de Michael Scott’ın ofisinde çalışmak", en: "Work in Michael Scott’s office in The Office" }, image: "https://via.placeholder.com/600x400?text=TheOffice" },
      option2: { text: { tr: "Friends’de Central Perk’te kahve içmek", en: "Drink coffee at Central Perk in Friends" }, image: "https://via.placeholder.com/600x400?text=Friends" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Marvel evreninde Örümcek Adam olmak", en: "Be Spider-Man in the Marvel Universe" }, image: "https://via.placeholder.com/600x400?text=SpiderMan" },
      option2: { text: { tr: "DC evreninde Batman olmak", en: "Be Batman in the DC Universe" }, image: "https://via.placeholder.com/600x400?text=Batman" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Narcos’da uyuşturucu karteli lideri olmak", en: "Be a drug cartel leader in Narcos" }, image: "https://via.placeholder.com/600x400?text=Narcos" },
      option2: { text: { tr: "Peaky Blinders’da Shelby ailesinin lideri olmak", en: "Lead the Shelby family in Peaky Blinders" }, image: "https://via.placeholder.com/600x400?text=PeakyBlinders" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "The Crown’da kraliyet ailesinin bir üyesi olmak", en: "Be a member of the royal family in The Crown" }, image: "https://via.placeholder.com/600x400?text=TheCrown" },
      option2: { text: { tr: "Mad Men’de reklamcılık dünyasında yükselmek", en: "Rise in the advertising world in Mad Men" }, image: "https://via.placeholder.com/600x400?text=MadMen" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Rick and Morty ile galaksiler arası maceraya çıkmak", en: "Go on intergalactic adventures with Rick and Morty" }, image: "https://via.placeholder.com/600x400?text=RickAndMorty" },
      option2: { text: { tr: "Futurama’da geleceğin dünyasında yaşamak", en: "Live in the future world in Futurama" }, image: "https://via.placeholder.com/600x400?text=Futurama" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "The Walking Dead’de zombi sürüsünden kaçmak", en: "Escape the zombie horde in The Walking Dead" }, image: "https://via.placeholder.com/600x400?text=WalkingDead" },
      option2: { text: { tr: "Jurassic Park’ta dinozorlarla hayatta kalmak", en: "Survive with dinosaurs in Jurassic Park" }, image: "https://via.placeholder.com/600x400?text=JurassicPark" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Doctor Who’da zamanda yolculuk yapmak", en: "Time travel in Doctor Who" }, image: "https://via.placeholder.com/600x400?text=DoctorWho" },
      option2: { text: { tr: "Sherlock Holmes gibi gizemler çözmek", en: "Solve mysteries like Sherlock Holmes" }, image: "https://via.placeholder.com/600x400?text=Sherlock" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Money Heist’de Profesör olmak", en: "Be the Professor in Money Heist" }, image: "https://via.placeholder.com/600x400?text=MoneyHeist" },
      option2: { text: { tr: "Peaky Blinders’da Shelby olmak", en: "Be Shelby in Peaky Blinders" }, image: "https://via.placeholder.com/600x400?text=Shelby" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "The Simpsons’da Homer olmak", en: "Be Homer in The Simpsons" }, image: "https://via.placeholder.com/600x400?text=Simpsons" },
      option2: { text: { tr: "Family Guy’da Peter Griffin olmak", en: "Be Peter Griffin in Family Guy" }, image: "https://via.placeholder.com/600x400?text=FamilyGuy" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "Narcos’da Pablo Escobar olmak", en: "Be Pablo Escobar in Narcos" }, image: "https://via.placeholder.com/600x400?text=Narcos" },
      option2: { text: { tr: "The Wire’da dedektif olmak", en: "Be a detective in The Wire" }, image: "https://via.placeholder.com/600x400?text=TheWire" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "The Crown’da kraliçe olmak", en: "Be the queen in The Crown" }, image: "https://via.placeholder.com/600x400?text=Queen" },
      option2: { text: { tr: "Game of Thrones’da Kral olmak", en: "Be the king in Game of Thrones" }, image: "https://via.placeholder.com/600x400?text=King" },
      votes1: 0,
      votes2: 0,
    },
    {
      id: uuidv4(),
      option1: { text: { tr: "The Mandalorian’da ödül avcısı olmak", en: "Be a bounty hunter in The Mandalorian" }, image: "https://via.placeholder.com/600x400?text=Mandalorian" },
      option2: { text: { tr: "Star Wars’da Jedi olmak", en: "Be a Jedi in Star Wars" }, image: "https://via.placeholder.com/600x400?text=Jedi" },
      votes1: 0,
      votes2: 0,
    },
  ],
};

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