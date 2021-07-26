//jshint esversion:6
require ("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const homeStartingContent = "You are asked to answer the tests below. You have the possibility to answer each task independently.Whenever a task is finished, you no longer have the possibility to do it again. You will be asked to open the camera while answering the different test";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let firstName = "";
let email="";

//let tests="";

let testStory="";
let testFilm="";
let testFish="";
let testFlower="";
let testHeart="";
let testEmotion="";
let testNumber="";
let testVocabulary="";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(DB_LINK, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);


const userSchema = new mongoose.Schema ({
  firstName: "",
  lastName: "",
  birth: "",
  gender: "",
  email: String,
  password: String
});

const storiesSchema = new mongoose.Schema ({
  email:firstName,
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  answer5: "",
  test: "",
  pictureUrl:[]
});

const filmsSchema=new mongoose.Schema ({
  email:firstName,
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  answer5: "",
  answer6: "",
  test:"",
  pictureUrl:[]
});


const fishsSchema=new mongoose.Schema ({
  email:firstName,
  trainingAnswers:[],
  answers: [],
  test:"",
  pictureUrl:[]
});

const heartsSchema=new mongoose.Schema ({
  email:firstName,
  trainingAnswers:[],
  answers: [],
  test:"",
  pictureUrl:[]
});

const flowersSchema=new mongoose.Schema ({
  email:firstName,
  trainingAnswers:[],
  answers: [],
  test:"",
  pictureUrl:[]
});

const emotionsSchema=new mongoose.Schema ({
  email:firstName,
  trainingAnswers:[],
  answers: [],
  test:"",
  pictureUrl:[]
});

const numbersSchema=new mongoose.Schema ({
  email:firstName,
  trainingAnswers:[],
  answers: [],
  test:"",
  pictureUrl:[]
});

const wordsSchema=new mongoose.Schema ({
  email:firstName,
  answers: [],
  score:[],
  test:"",
  pictureUrl:[]
});



userSchema.plugin(passportLocalMongoose); //hash and salt passwords


const User = new mongoose.model("User", userSchema);

const Story = new mongoose.model("Story", storiesSchema);

const Film =new mongoose.model("Film", filmsSchema);

const Fish =new mongoose.model("Fish", fishsSchema);

const Heart =new mongoose.model("Heart", heartsSchema);

const Flower =new mongoose.model("Flower", flowersSchema);

const Emotion =new mongoose.model("Emotion", emotionsSchema);

const Number =new mongoose.model("Number", numbersSchema);

const Word =new mongoose.model("Word", wordsSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const user= new User();

const answer= new Story();

const answerF= new Film();

const fishAnswer=new Fish();

const heartAnswer=new Heart();

const flowerAnswer=new Flower();

const emotionAnswer=new Emotion();

const numberAnswer=new Number();

const wordAnswer= new Word();


app.get("/", function(req,res){
  res.sendFile(__dirname+'/views/index.html');
})

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.get("/home", function(req,res){
  Story.findOne({email:email},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        testStory=foundUser.test;
        console.log("Story test is", testStory);
      }
      else{
        testStory="";
        console.log("didn't answer the story test");
      }
    }
  });

  Film.findOne({email:email},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        testFilm=foundUser.test;
        console.log("Film test is", testFilm);
      }
      else {
        testFilm="";
        console.log("didn't answer the film test");
      }
    }
  });

  Fish.findOne({email:email},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        testFish=foundUser.test;
        console.log("Fish Game is", testFish);
      }
      else{
        testFish="";
        console.log("didn't answer the Fish Game test");
      }
    }
  });

  Heart.findOne({email:email},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        testHeart=foundUser.test;
        console.log("Heart Game is", testHeart);
      }
      else{
        testHeart="";
        console.log("didn't answer the Herat Game test");
      }
    }
  });

  Flower.findOne({email:email},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        testFlower=foundUser.test;
        console.log("Flower Game is", testFlower);
      }
      else{
        testFlower="";
        console.log("didn't answer the Flower Game test");
      }
    }
  });

  Number.findOne({email:email},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        testNumber=foundUser.test;
        console.log("Numbers Game is", testNumber);
      }
      else{
        testNumber="";
        console.log("didn't answer the Numbers Game test");
      }
    }
  });

  Word.findOne({email:email},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        testVocabulary=foundUser.test;
        console.log("Vocabulary Game is", testVocabulary);
      }
      else{
        testVocabulary="";
        console.log("didn't answer the Vocabulary Game test");
      }
    }
  });

  console.log("hello",firstName);
  res.render("home", {startingContent: homeStartingContent, firstName:firstName, text:""});
});



app.get("/about", function(req,res){
  res.render("about", {aboutContent:aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {contactContent:contactContent});
});


//Strange stories pages

app.get("/strangestory", function(req,res){
  console.log(testStory);
  if(testStory==="done"){
    res.render("home", {startingContent: homeStartingContent, firstName:firstName, text:"You have already done the strange stories test"});
  }
  else{
    res.render("strangestory");
  }
})

app.get("/strangestory1", function(req,res){
  res.render("strangestory1");
})

app.get("/strangestory2", function(req,res){
  res.render("strangestory2");
})

app.get("/strangestory3", function(req,res){
  res.render("strangestory3");
})

app.get("/strangestory4", function(req,res){
  res.render("strangestory4");
})

app.get("/strangestory5", function(req,res){
  res.render("strangestory5");
})


app.get("/fishstart", function(req,res){
  if(testFish==="done"){
    res.render("home", {startingContent: homeStartingContent, firstName:firstName, text:"You have already done the Fish Game test"});
  }
  else{
    res.render("fishstart");
  }
})


let fishR="droite.PNG";
let fishC="gauche.PNG";
let imageC="0";

app.get("/fishtraining",function(req,res){
  res.render("fishtraining", {fishR: fishR, fishC:fishC, imageC:imageC});
})

app.get("/fishgamestart",function(req,res){
  res.render("fishgamestart");
})

let fishRT="gauche.PNG";
let fishCT="gauche.PNG";
let imageCT="0";

app.get("/jeu1",function(req,res){
  res.render("jeu1", {fishRT: fishRT, fishCT:fishCT, imageCT:imageCT});
})


app.get("/heartstart", function(req,res){
  if(testHeart==="done"){
    res.render("home", {startingContent: homeStartingContent, firstName:firstName, text:"You have already done the Heart Game test"});
  }
  else{
    res.render("heartstart");
  }
})


let imageHeart="R";

app.get("/hearttraining",function(req,res){
  res.render("hearttraining", {imageHeart:imageHeart});
})

app.get("/heartgamestart",function(req,res){
  res.render("heartgamestart");
})


let imageHeartT="R";

app.get("/jeu2",function(req,res){
  res.render("jeu2", {imageHeartT:imageHeartT});
})


app.get("/flowerstart", function(req,res){
  if(testFlower==="done"){
    res.render("home", {startingContent: homeStartingContent, firstName:firstName, text:"You have already done the Flower Game test"});
  }
  else{
    res.render("flowerstart");
  }
})

app.get("/flowergamestart",function(req,res){
  res.render("flowergamestart");
})

let imageFlower="L";
app.get("/flowertraining",function(req,res){
  res.render("flowertraining", {imageFlower:imageFlower});
})

let imageFlowerT="R";
app.get("/jeu3",function(req,res){
  res.render("jeu3", {imageFlowerT:imageFlowerT});
})


app.get("/emotionstart", function(req,res){
  if(testEmotion==="done"){
    res.render("home", {startingContent: homeStartingContent, firstName:firstName, text:"You have already done the Emotion Recognition Game test"});
  }
  else{
    res.render("emotionstart");
  }
})

var pictureUrl="train1.png"
app.get("/emotiontraining",function(req,res){
  res.render("emotiontraining", {pictureUrl:pictureUrl});
})

app.get("/emotiongamestart", function(req,res){
  res.render("emotiongamestart");
})


var pictureUrlT="test1.png";
app.get("/jeu4",function(req,res){
  res.render("jeu4", {pictureUrlT:pictureUrlT});
})


var number1="8";
var number2="2";


app.get("/numberstart", function(req,res){
  if(testNumber==="done"){
    res.render("home", {startingContent: homeStartingContent, firstName:firstName, text:"You have already done the Numbers Game test"});
  }
  else{
    res.render("numberstart");
  }
})


app.get("/numbertraining",function(req,res){
  res.render("numbertraining", {number1:number1, number2:number2, message:message});
})

app.get("/numbergamestart", function(req,res){
  res.render("numbergamestart");
})


var number1T="3";
var number2T="1";
var number3T="";
var number4T="";
var number5T="";

app.get("/jeu5",function(req,res){
  res.render("jeu5", {number1T:number1T, number2T:number2T, number3T:number3T, number4T:number4T, number5T:number5T});
})


app.get("/wordstart", function(req,res){
  if(testVocabulary==="done"){
    res.render("home", {startingContent: homeStartingContent, firstName:firstName, text:"You have already done the Vocabulary Game test"});
  }
  else{
    res.render("wordstart");
  }
})

let word="Tomato";
let option1="Fly";
let option2="Crack";
let option3="Wood";
let option4="Dunce";
let option5="Fruit";
let option6="Step";
let correctAnswer="Fruit";
app.get("/wordtraining",function(req,res){
  res.render("wordtraining", {word:word, option1:option1, option2:option2, option3:option3, option4:option4, option5:option5, option6:option6});
})

let wordMessage="";
app.get("/wordgamestart",function(req,res){
  res.render("wordgamestart", {wordMessage:wordMessage});
})

let wordT="Toss";
let option1T="Throw";
let option2T="Catch";
let option3T="Hide";
let option4T="Roll";
let option5T="Dive";
let option6T="Pull";
let correctAnswerT="Throw";
app.get("/jeu6",function(req,res){
  res.render("jeu6",{wordT:wordT, option1T:option1T, option2T:option2T, option3T:option3T, option4T:option4T, option5T:option5T, option6T:option6T});
})


//Silent films pages

app.get("/silentfilm", function(req,res){
  if(testFilm==="done"){
    res.render("home", {startingContent: homeStartingContent, firstName:firstName, text:"You have already done the silent films test"});
  }
  else{
    res.render("silentfilm");
  }
})


app.get("/silentfilm1", function(req,res){
  res.render("silentfilm1");
});

app.get("/silentfilm2", function(req,res){
  res.render("silentfilm2");
});

app.get("/silentfilm3", function(req,res){
  res.render("silentfilm3");
});

app.get("/silentfilm4", function(req,res){
  res.render("silentfilm4");
});

app.get("/silentfilm5", function(req,res){
  res.render("silentfilm5");
});


app.get("/final", function(req,res){
  res.render("final");
});


app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});



app.post("/register", function(req, res){
  answer.email=req.body.username;
  answerF.email=req.body.username;
  firstName=req.body.firstName;
  email=req.body.username;

  User.register({username: req.body.username, firstName:req.body.firstName, lastName: req.body.lastName, gender:req.body.gender}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/home");
      });
    }
  });
});


app.post("/login", function(req, res){
  // firstName=req.body.username;
  email=req.body.username
  answer.email=email;
  answerF.email=email;
  fishAnswer.email=email;
  heartAnswer.email=email;
  flowerAnswer.email=email;
  numberAnswer.email=email;
  emotionAnswer.email=email;
  wordAnswer.email=email;

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/home");
      });
    }
  });

  User.findOne({username:email},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        firstName=foundUser.firstName;
      }
    }
  });
});


app.post("/home", function(req,res){
});

// Getting strange stories answers

app.post("/strangestory1", function(req,res){
  // console.log(req.body.url);
  const answer1= req.body.answer1;
  console.log(answer1);
  answer.answer1=answer1
  answer.pictureUrl.push(req.body.photoURL);
  res.redirect("strangestory2");
});


app.post("/strangestory2", function(req,res){
  const answer2= req.body.answer2;
  answer.answer2=answer2;
  console.log(answer2);
  answer.pictureUrl.push(req.body.photoURL2);
  res.redirect("strangestory3");
});

app.post("/strangestory3", function(req,res){
  const answer3= req.body.answer3;
  answer.answer3=answer3;
  console.log(answer3);
  answer.pictureUrl.push(req.body.photoURL3);
  res.redirect("strangestory4");
});

app.post("/strangestory4", function(req,res){
  const answer4= req.body.answer4;
  answer.answer4=answer4;
  console.log(answer4);
  answer.pictureUrl.push(req.body.photoURL4);
  res.redirect("strangestory5");
});

app.post("/strangestory5", function(req,res){
  const answer5= req.body.answer5;
  answer.answer5=answer5;
  console.log(answer5);
  answer.pictureUrl.push(req.body.photoURL5);
  answer.test="done";
  storyTest=true;
  res.redirect("home");
  answer.save(function(err){
    if(err){
      print(err);
    }
    else{
      console.log("successfully added Stories answers");
    }
  });

});


// Getting silent films answers


app.post("/silentfilm1", function(req,res){
  const answerF11= req.body.answerF11;
  const answerF12= req.body.answerF12;
  console.log(answerF11);
  console.log(answerF12);
  answerF.answer1=answerF11;
  answerF.answer2=answerF12;
  answerF.pictureUrl.push(req.body.photoURL1);
  res.redirect("silentfilm2");
});

app.post("/silentfilm2", function(req,res){
  const answerF2= req.body.answerF2;
  console.log(answerF2);
  answerF.answer3=answerF2;
  answerF.pictureUrl.push(req.body.photoURL2);
  res.redirect("silentfilm3");
});

app.post("/silentfilm3", function(req,res){
  const answerF3= req.body.answerF3;
  console.log(answerF3);
  answerF.answer4=answerF3;
  answerF.pictureUrl.push(req.body.photoURL3);
  res.redirect("silentfilm4");
});

app.post("/silentfilm4", function(req,res){
  const answerF4= req.body.answerF4;
  console.log(answerF4);
  answerF.answer5=answerF4;
  answerF.pictureUrl.push(req.body.photoURL4);
  res.redirect("silentfilm5");
});

app.post("/silentfilm5", function(req,res){
  const answerF5= req.body.answerF5;
  console.log(answerF5);
  answerF.answer6=answerF5;
  answerF.pictureUrl.push(req.body.photoURL5);
  answerF.test="done";
  res.redirect("home");
  answerF.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully added Film answers")
    }
  });
});


let nbTrain=0;

//0 left    1 right
let fish=["01", "11","10", "01","00","11"];
app.post("/fishtraining", function(req,res){
  console.log("game1 Training");

  if(nbTrain<6){
    if(fish[nbTrain][0]==="0"){
      fishC="gauche.PNG";
      imageC="0";
    }
    else if(fish[nbTrain][0]==="1"){
      fishC="droite.PNG";
      imageC="1";
    }

    if(fish[nbTrain][1]==="0"){
      fishR="gauche.PNG";
    }
    else if(fish[nbTrain][1]==="1"){
      fishR="droite.PNG";
    }

    if(req.body.leftTrue==="leftTrue"){
      fishAnswer.trainingAnswers.push(req.body.leftTrue);
    }
    else if(req.body.leftFalse==="leftFalse"){
      fishAnswer.trainingAnswers.push(req.body.leftFalse);
    }
    else if(req.body.rightTrue==="rightTrue"){
      fishAnswer.trainingAnswers.push(req.body.rightTrue);
    }
    else if(req.body.rightFalse==="rightFalse"){
      fishAnswer.trainingAnswers.push(req.body.rightFalse);
    }
    else{
      fishAnswer.trainingAnswers.push("no answer");
    }
    console.log(nbTrain);
    console.log(req.body.leftTrue);
    console.log(req.body.leftFalse);
    console.log(req.body.rightTrue);
    console.log(req.body.rightFalse);
    nbTrain=nbTrain+1;
    setTimeout(delay, 2000);
    function delay()
      {res.redirect("fishtraining");}
  }
  else{
    res.redirect("fishgamestart");
  }
})


// 0 left   1 right
let nb=0;
let fishT=["11","10","00","00","10","01","00","01","11","00","10","11","01","11","01","11","00","00","11","10","00","00","10","01","00","01","11","11","10","11","01","11","11","00"];
app.post("/jeu1",function(req,res){
  console.log("game1");
  if(nb<34){
    if(fishT[nb][0]==="0"){
      fishCT="gauche.PNG";
      imageCT="0";
    }
    else if(fishT[nb][0]==="1"){
      fishCT="droite.PNG";
      imageCT="1";
    }

    if(fishT[nb][1]==="0"){
      fishRT="gauche.PNG";
    }
    else if(fishT[nb][1]==="1"){
      fishRT="droite.PNG";
    }

    if(req.body.leftTrue==="leftTrue"){
      fishAnswer.answers.push(req.body.leftTrue);
    }
    else if(req.body.leftFalse==="leftFalse"){
      fishAnswer.answers.push(req.body.leftFalse);
    }
    else if(req.body.rightTrue==="rightTrue"){
      fishAnswer.answers.push(req.body.rightTrue);
    }
    else if(req.body.rightFalse==="rightFalse"){
      fishAnswer.answers.push(req.body.rightFalse);
    }
    else{
      fishAnswer.answers.push("no answer");
    }
      fishAnswer.pictureUrl.push(req.body.photoURL);
    console.log(nb);
    console.log(req.body.leftTrue);
    console.log(req.body.leftFalse);
    console.log(req.body.rightTrue);
    console.log(req.body.rightFalse);
    nb=nb+1;
    setTimeout(delay, 2000);
    function delay()
      {res.redirect("jeu1");}
  }
  else{
    fishAnswer.test="done";
    // testFish="done";
    res.redirect("home");
  }
  fishAnswer.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully added Fish answers")
    }
  });


})

let nbTrainH=0;
let heart=["L","L","R","L","R","R","L"];

app.post("/hearttraining", function(req,res){
  console.log("game2 Training");
  if(nbTrainH<7){

    if(heart[nbTrainH]==="R"){
      imageHeart="R";
    }
    else if(heart[nbTrainH]==="L"){
      imageHeart="L";
    }

    if(req.body.leftTrue==="leftTrue"){
      heartAnswer.trainingAnswers.push(req.body.leftTrue);
    }
    else if(req.body.leftFalse==="leftFalse"){
      heartAnswer.trainingAnswers.push(req.body.leftFalse);
    }
    else if(req.body.rightTrue==="rightTrue"){
      heartAnswer.trainingAnswers.push(req.body.rightTrue);
    }
    else if(req.body.rightFalse==="rightFalse"){
      heartAnswer.trainingAnswers.push(req.body.rightFalse);
    }
    else{
      heartAnswer.trainingAnswers.push("no answer");
    }

    console.log(nbTrainH);
    console.log(req.body.leftTrue);
    console.log(req.body.leftFalse);
    console.log(req.body.rightTrue);
    console.log(req.body.rightFalse);

    nbTrainH=nbTrainH+1;
    setTimeout(delay, 2000);
    function delay()
      {res.redirect("hearttraining");}
  }
  else{
    res.redirect("heartgamestart");
  }
})


let nb2=0;
let heartT=["L","L","R","R","L","R","R","L","L","L","R"];

app.post("/jeu2",function(req,res){

  console.log("game2");
  if(nb2<11){
    if(heartT[nb2]==="R"){
      imageHeartT="R";
    }
    else if(heartT[nb2]==="L"){
      imageHeartT="L";
    }

    if(req.body.leftTrue==="leftTrue"){
      heartAnswer.answers.push(req.body.leftTrue);
    }
    else if(req.body.leftFalse==="leftFalse"){
      heartAnswer.answers.push(req.body.leftFalse);
    }
    else if(req.body.rightTrue==="rightTrue"){
      heartAnswer.answers.push(req.body.rightTrue);
    }
    else if(req.body.rightFalse==="rightFalse"){
      heartAnswer.answers.push(req.body.rightFalse);
    }
    else{
      heartAnswer.answers.push("no answer");
    }
    heartAnswer.pictureUrl.push(req.body.photoURL);

    console.log(nb2);
    console.log(req.body.leftTrue);
    console.log(req.body.leftFalse);
    console.log(req.body.rightTrue);
    console.log(req.body.rightFalse);
    nb2=nb2+1;
    setTimeout(delay, 2000);
    function delay()
      {res.redirect("jeu2");}

  }
  else{
    heratAnswer.test="done";
    // testHeart="done";
    res.redirect("home");
  }
  heartAnswer.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully added Heart answers")
    }
  });

})



let nbTrainF=0;
let flower=["L","R","L","L","R","R","L"];

app.post("/flowertraining", function(req,res){
  console.log("game3 Training");
  if(nbTrainF<7){
    if(flower[nbTrainF]==="R"){
      imageFlower="R";
    }
    else if(flower[nbTrainF]==="L"){
      imageFlower="L";
    }

    if(req.body.leftTrue==="leftTrue"){
      flowerAnswer.trainingAnswers.push(req.body.leftTrue);
    }
    else if(req.body.leftFalse==="leftFalse"){
      flowerAnswer.trainingAnswers.push(req.body.leftFalse);
    }
    else if(req.body.rightTrue==="rightTrue"){
      flowerAnswer.trainingAnswers.push(req.body.rightTrue);
    }
    else if(req.body.rightFalse==="rightFalse"){
      flowerAnswer.trainingAnswers.push(req.body.rightFalse);
    }
    else{
      flowerAnswer.trainingAnswers.push("no answer");
    }
    console.log(nbTrainF);
    console.log(req.body.leftTrue);
    console.log(req.body.leftFalse);
    console.log(req.body.rightTrue);
    console.log(req.body.rightFalse);
    nbTrainF=nbTrainF+1;
    setTimeout(delay, 2000);
    function delay()
      {res.redirect("flowertraining");}
  }
  else{
    res.redirect("flowergamestart");
  }
})



let nb3=0;
let flowerT=["L","L","R","R","L","R","R","L","L","R","L"];
app.post("/jeu3",function(req,res){
  console.log("game3");
  if(nb3<11){
    if(flowerT[nb3]==="R"){
      imageFlowerT="R";
    }
    else if(flowerT[nb3]==="L"){
      imageFlowerT="L";
    }

    if(req.body.leftTrue==="leftTrue"){
      flowerAnswer.answers.push(req.body.leftTrue);
    }
    else if(req.body.leftFalse==="leftFalse"){
      flowerAnswer.answers.push(req.body.leftFalse);
    }
    else if(req.body.rightTrue==="rightTrue"){
      flowerAnswer.answers.push(req.body.rightTrue);
    }
    else if(req.body.rightFalse==="rightFalse"){
      flowerAnswer.answers.push(req.body.rightFalse);
    }
    else{
      flowerAnswer.answers.push("no answer");
    }
    flowerAnswer.pictureUrl.push(req.body.photoURL);

    console.log(nb3);
    console.log(req.body.leftTrue);
    console.log(req.body.leftFalse);
    console.log(req.body.rightTrue);
    console.log(req.body.rightFalse);
    nb3=nb3+1;
    setTimeout(delay, 2000);
    function delay()
      {res.redirect("jeu3");}
  }
  else{
    flowerAnswer.test="done";
    // testFlower="done";
    res.redirect("home");
  }
  flowerAnswer.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully added Flower answers");
    }
  })
})


let nbTrainE=0;
var images=["train2.png", "train3.png", "train4.png", "train5.png"];
app.post("/emotiontraining", function(req,res){
  console.log("game4 Training");
  if(nbTrainE<4){
    if(req.body.happy==="happy"){
      emotionAnswer.trainingAnswers.push(req.body.happy);
    }
    else if(req.body.sad==="sad"){
      emotionAnswer.trainingAnswers.push(req.body.sad);
    }
    else if(req.body.fearful==="fearful"){
      emotionAnswer.trainingAnswers.push(req.body.fearful);
    }
    else if(req.body.angry==="angry"){
      emotionAnswer.trainingAnswers.push(req.body.angry);
    }
    else if(req.body.neutral==="neutral"){
      emotionAnswer.trainingAnswers.push(req.body.angry);
    }
    else{
      emotionAnswer.trainingAnswers.push("no answer");
    }
    console.log(nbTrainE);
    console.log(req.body.happy);
    console.log(req.body.sad);
    console.log(req.body.fearful);
    console.log(req.body.angry);
    console.log(req.body.neutral);
    pictureUrl=images[nbTrainE];
    nbTrainE=nbTrainE+1;
    setTimeout(delay, 2000);
    function delay()
      {res.redirect("emotiontraining");}
  }
  else{
    res.redirect("emotiongamestart");
  }
})




let nb4=0;
var imagesT=["test2.png", "test3.png", "test4.png", "test5.png","test6.png", "test7.png", "test8.png", "test9.png","test10.png", "test11.png", "test12.png", "test13.png","test14.png", "test15.png", "test16.png", "test17.png","test18.png", "test19.png", "test20.png", "test21.png","test22.png", "test23.png", "test24.png", "test25.png","test26.png", "test27.png", "test28.png", "test29.png","test30.png"];
app.post("/jeu4", function(req,res){
  console.log("game4");
  console.log("nb4",nb4);
  if(nb4<30){
    if(req.body.happy==="happy"){
      emotionAnswer.answers.push(req.body.happy);
    }
    else if(req.body.sad==="sad"){
      emotionAnswer.answers.push(req.body.sad);
    }
    else if(req.body.fearful==="fearful"){
      emotionAnswer.answers.push(req.body.fearful);
    }
    else if(req.body.angry==="angry"){
      emotionAnswer.answers.push(req.body.angry);
    }
    else if(req.body.neutral==="neutral"){
      emotionAnswer.answers.push(req.body.angry);
    }
    else{
      emotionAnswer.answers.push("no answer");
    }
    emotionAnswer.pictureUrl.push(req.body.photoURL);

    console.log(nbTrainE);
    console.log(req.body.happy);
    console.log(req.body.sad);
    console.log(req.body.fearful);
    console.log(req.body.angry);
    console.log(req.body.neutral);
    pictureUrlT=imagesT[nb4];
    nb4=nb4+1;
    setTimeout(delay, 2000);
    function delay()
      {res.redirect("jeu4");}
  }
  else{
    emotionAnswer.test="done";
    res.redirect("home");
  }
  emotionAnswer.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully added Emotion Recognition answers");
    }
  })
})


var numbers=["56", "93", "12"];
var numbersInv=["28","65","39","21"];
let nbTrainN=0;
let num= 0;
let message="";
app.post("/numbertraining",function(req,res){
  console.log("game5 training");
if(nbTrainN<3){
      num=numbers[nbTrainN];
      number1=num[0];
      number2=num[1];
    if(req.body.number===numbersInv[nbTrainN]){
      console.log("good job!");
      message="Correct answer! good job!";
      numberAnswer.trainingAnswers.push("true");
    }
    else{
      console.log("wrong answer!");
      message="Answer not correct!";
      numberAnswer.trainingAnswers.push("false");
    }
    console.log(req.body.number);
    console.log(nbTrainN);
    nbTrainN=nbTrainN+1;
    setTimeout(delay, 2000);
    function delay()
      {res.redirect("numbertraining");}
  }
  else{
    res.redirect("numbergamestart");
  }
})



var numbersT=["53", "475", "952", "6927","3948","75314","97852"];
var numbersInvT=["13","35","574","259","7296","8493","41357","97852"];
let nb5=0;
app.post("/jeu5",function(req,res){
  console.log("game5");
  if(nb5<7){
    if(numbersT[nb5].length===2){
      number1T=numbersT[nb5][0];
      number2T=numbersT[nb5][1];
    }
    else if(numbersT[nb5].length===3){
      number1T=numbersT[nb5][0];
      number2T=numbersT[nb5][1];
      number3T=numbersT[nb5][2];
    }
    else if(numbersT[nb5].length===4){
      number1T=numbersT[nb5][0];
      number2T=numbersT[nb5][1];
      number3T=numbersT[nb5][2];
      number4T=numbersT[nb5][3];
    }
    else if(numbersT[nb5].length===5){
      number1T=numbersT[nb5][0];
      number2T=numbersT[nb5][1];
      number3T=numbersT[nb5][2];
      number4T=numbersT[nb5][3];
      number5T=numbersT[nb5][4];
    }
    if(req.body.number===numbersInvT[nb5]){
      console.log("good job!");
      numberAnswer.answers.push("true");
    }
    else{
      console.log("wrong answer!");
      numberAnswer.answers.push("false");
    }
    numberAnswer.pictureUrl.push(req.body.photoURL);
    console.log(req.body.number);
    console.log(nb5);
    nb5=nb5+1;
    setTimeout(delay, 2000);
    function delay()
      {res.redirect("jeu5");}
  }
  else{
    numberAnswer.test="done";
    // testFlower="done";
    res.redirect("home");
  }
  numberAnswer.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully added Number answers");
    }
  })
})


app.post("/wordtraining", function(req,res){
  console.log(req.body.checkbox);
  if(req.body.checkbox===correctAnswer){
    console.log("good job");
    wordMessage="Correct Answer! Good job!";
  }
  else{
    wordMessage="Answer not correct! the correct answer is"+correctAnswer+" !";
  }
  res.redirect("wordgamestart");
})

let wordTable=["Damp","Rest","Cruel","Receive","Battle","Patch","Disturb","Blaze","Malaria","Fascinated","Liberty","Stubborn","Precise","Resemblance","Anonymous","Elevate","Task","Courteous","Prosper"];
let option1Table=["Light","Cry","Clean","Walk","Stroll","Mend","Transfer","Kitchen","Basement","Ill-treated","Freedom","Steady","Natural","Memory","Applicable","Raise","Horn","Dreadful","Imagine"];
let option2Table=["Sing","Sing","Green","Accept","Light","Watch","Skip","Coat","Fever","Modelled","Worry","Hopeful","Exact","Fondness","Magnificent","Move","Game","Proud","Propose"];
let option3Table=["Sweet","Go Away","Pretty","Believe","Snow","Hand","Lick","Glass","Theatre","Poisoned","Rich","Obstinate","Faulty","Assemble","Insulting","Revolve","Trap","Polite","Succeed"];
let option4Table=["Taste","Taste","Found","Empty","Fight","Bang","Upset","Roof","Fruit","Charmed","Serviette","Hollow","Grand","Repose","Fictitious","Work","Jail","Short","Beseech"];
let option5Table=["Wet","Run Up","Water","Money","Bowl","Switch","Doubt","Flare","Ocean","Frightened","Forest","Orderly","Stupid","Attendance","Nameless","Waver","Problem","Curtsey","Punish"];
let option6Table=["Flag","Lie Down","Unkind","Drive","Last","Cook","Fire","Side","Tune","Copied","Cheerful","Slack","Small","Likeness","Untrue","Disperse","Job","Truthful","Trespass"];
let correctAnswerTable=["Throw","Wet","Lie Down","Unkind","Accept","Fight","Mend","Upset","Flare","Fever","Charmed","Freedom","Obstinate","Exact","Likeness","Nameless","Raise","Game","Polite","Succeed"];
let nb6=0;
app.post("/jeu6",function(req,res){
if(nb6<19){
  console.log(req.body.checkbox);
  if(req.body.checkbox===correctAnswerTable[nb6]){
    wordAnswer.answers.push(req.body.checkbox);
    wordAnswer.score.push("True");
    console.log("correctAnswer");
  }
  else{
    console.log("False answer. The correct answer is ", correctAnswerTable[nb6]);
    wordAnswer.answers.push(req.body.checkbox);
    wordAnswer.score.push("False");

  }
  wordAnswer.pictureUrl.push(req.body.photoURL);

  wordT=wordTable[nb6];
  option1T=option1Table[nb6];
  option2T=option2Table[nb6];
  option3T=option3Table[nb6];
  option4T=option4Table[nb6];
  option5T=option5Table[nb6];
  option6T=option6Table[nb6];
  nb6=nb6+1;
  res.redirect("jeu6");
}
else{
  wordAnswer.test="done";
  res.redirect("home");
}
wordAnswer.save(function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfully added Vocabulary answers");
  }
})
})



app.listen(process.env.PORT, function() {
  console.log("Server has started successfully");
});
