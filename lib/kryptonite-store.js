import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

const KryptoniteStore = new EventEmitter();

let passages = {
  "The Independence Day Speech": "Good morning. In less than an hour, aircraft from here will join others from around the world. And you will be launching the largest aerial battle in the history of mankind. Mankind; that word should have new meaning for all of us today. We can’t be consumed by our petty differences anymore. We will be united in our common interests. Perhaps it’s fate that today is the 4th of July and you will once again be fighting for our freedom. Not from tyranny, oppression, or persecution, but from annihilation. We’re fighting for our right to live, to exist. And should we win the day, the 4th of July will no longer be known as an American holiday, but as the day when the world declared in one voice: ‘We will not go quietly into the night!’ ‘We will not vanish without a fight!’ ‘We’re going to live on!’ ‘We’re going to survive!’ Today we celebrate our Independence Day!",

  "The Final sentence of Washington's Inagural Speech": "Having thus imparted to you my sentiments as they have been awakened by the occasion which brings us together, I shall take my present leave; but not without resorting once more to the benign Parent of the Human Race in humble supplication that, since He has been pleased to favor the American people with opportunities for deliberating in perfect tranquillity, and dispositions for deciding with unparalleled unanimity on a form of government for the security of their union and the advancement of their happiness, so His divine blessing may be equally conspicuous in the enlarged views, the temperate consultations, and the wise measures on which the success of this Government must depend.",

  "Jeff Goldblum's Creation Story from Jurassic Park": "God creates dinosaurs. God destroys dinosaurs. God creates man. Man destroys God. Man creates dinosaurs.",

  "The First Sentence of the Gettysburg Address": "Fourscore and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty and dedicated to the proposition that all men are created equal.",

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
  let removeSymbols = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']/g,"");
  let lowerCase = removeSymbols.toLowerCase();
  return lowerCase;
};

let passageKeys = Object.keys(passages);
KryptoniteStore.passageKey = passageKeys[counter];
KryptoniteStore.passageValue = passages[KryptoniteStore.passageKey];


KryptoniteStore.compareLyrics = function(entry, key){
  let userEntry = KryptoniteStore.formatStrings(entry);
  let passageValue = KryptoniteStore.formatStrings(passages[key]);
  console.log(userEntry, passageValue);
  if (userEntry === passageValue){
    KryptoniteStore.emit('match', entry);
  } else {
    KryptoniteStore.emit('mis-match', entry);
  }
};

KryptoniteStore.rotateQuestion = function(){
  KryptoniteStore.incrementCounter();
  KryptoniteStore.passageKey = passageKeys[counter];
  KryptoniteStore.passageValue = passages[KryptoniteStore.passageKey];
};

KryptoniteStore.leadPassage = function() {
  let lead = KryptoniteStore.passageValue.split(' ').slice(0, 7).join(' ');
  return lead + " ...";
};


export default KryptoniteStore;
