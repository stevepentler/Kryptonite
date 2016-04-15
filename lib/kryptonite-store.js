import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

const KryptoniteStore = new EventEmitter();

let passages = {
  "Independence Day Speech": "Good morning. In less than an hour, aircraft from here will join others from around the world. And you will be launching the largest aerial battle in the history of mankind. Mankind; that word should have new meaning for all of us today. We can’t be consumed by our petty differences anymore. We will be united in our common interests. Perhaps it’s fate that today is the 4th of July and you will once again be fighting for our freedom. Not from tyranny, oppression, or persecution, but from annihilation. We’re fighting for our right to live, to exist. And should we win the day, the 4th of July will no longer be known as an American holiday, but as the day when the world declared in one voice: ‘We will not go quietly into the night!’ ‘We will not vanish without a fight!’ ‘We’re going to live on!’ ‘We’re going to survive!’ Today we celebrate our Independence Day!",

  "MayFlower Compact Without Signatures": "In the name of God, Amen. We, whose names are underwritten, the loyal subjects of our dread Sovereigne Lord, King James, by the grace of God, of Great Britaine, France and Ireland king, defender of the faith, etc. having undertaken, for the glory of God, and advancement of the Christian faith, and honour of our king and country, a voyage to plant the first colony in the Northerne parts of Virginia, doe by these presents solemnly and mutually in the presence of God and one of another, covenant and combine ourselves together into a civill body politick, for our better ordering and preservation, and furtherance of the ends aforesaid; and by virtue hereof to enacte, constitute, and frame such just and equall laws, ordinances, acts, constitutions and offices, from time to time, as shall be thought most meete and convenient for the generall good of the Colonie unto which we promise all due submission and obedience. In witness whereof we have hereunder subscribed our names at Cape-Codd the 11. of November, in the year of the raigne of our sovereigne lord, King James, of England, France and Ireland, the eighteenth, and of Scotland the fiftie-fourth. Anno Dom. 1620.",

"Jeff Goldblum's Creation Story from Jurassic Park": "God creates dinosaurs. God destroys dinosaurs. God creates man. Man destroys God. Man creates dinosaurs.",

"First Sentence of the Gettysburg Address": "Fourscore and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty and dedicated to the proposition that all men are created equal.",

"Viper's Top Gun Speech": "Gentlemen, you are the top 1% of all naval aviators -- the elite, the BEST of the best. We'll make you better. Fly at least two combat missions a day, attend classes in between, and evaluations of your performance. Now in each combat sequence you're going to meet a different challenge. Every encounter is going to be much more difficult. We're going to teach you to fly the F-14 right to the edge of the envelop, faster than you've ever flown before -- and more dangerous. Now, we don't make policy here, gentlemen. Elected officials, civilians, do that. We are the instruments of that policy. And although we're not at war, we must always act as though we are at war."
};

let counter = 0;

KryptoniteStore.incrementCounter = function() {
  if (counter > 3) {
    counter = 0;
  } else {
    counter += 1;
  }
};

KryptoniteStore.formatStrings = function(string) {
  let removeSymbols = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']/g,"")
  let lowerCase = removeSymbols.toLowerCase();
  return lowerCase;
}

let passageKeys = Object.keys(passages);
KryptoniteStore.passageKey = passageKeys[counter]
KryptoniteStore.passageValue = passages[KryptoniteStore.passageKey];


KryptoniteStore.compareLyrics = function(entry, key){
  let userEntry = KryptoniteStore.formatStrings(entry);
  let passageValue = KryptoniteStore.formatStrings(passages[key]);
  console.log(userEntry, passageValue)
  if (userEntry === passageValue){
    KryptoniteStore.emit('match', entry);
  }
};

KryptoniteStore.rotateQuestion = function(){
  KryptoniteStore.incrementCounter();
  KryptoniteStore.passageKey = passageKeys[counter]
  KryptoniteStore.passageValue = passages[KryptoniteStore.passageKey];
};

KryptoniteStore.leadPassage = function() {
  let lead = KryptoniteStore.passageValue.split(' ').slice(0, 5).join(' ');
  return lead + " ...";
}




export default KryptoniteStore;
