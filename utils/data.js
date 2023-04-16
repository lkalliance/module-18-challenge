const domains = [
  "yahoo.com",
  "outlook.com",
  "gmail.com",
  "icloud.com",
  "minnesota.edu",
  "facebook.com",
];

const userNames = [
  "itsme",
  "whynot",
  "example",
  "pseudonum",
  "wassup",
  "moira",
  "buttercup",
  "humperdinck",
  "captain.kirk",
  "mr.spock",
  "lt.sulu",
  "lt.uhura",
  "bones",
  "m.scott",
  "p.chekov",
  "frodo",
  "gandalf",
  "cruella",
  "donchaknow",
  "harold.hill",
  "d.harry",
  "trying_this_out",
  "samwise",
  "aragorn",
  "gimli",
  "legolas",
  "santa.clause",
  "hanukkah.harry",
  "joltin.joe",
  "try_try_again",
  "m.python",
  "benhur",
  "danny.ocean",
  "clark_kent",
  "lois_lane",
  "bruce_wayne",
  "diana_prince",
];

const thoughts = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis magni repudiandae, fugit vel sed possimus architecto nemo, maiores doloribus recusandae atque totam, velit.",
  "This is a thought. It's not much of a thought, perhaps, but it's a thought.",
  "Whan that Aprille with his shoures soote, The droghte of March hath perced to the roote, And bathed every veyne in swich licóur Of which vertú engendred is the flour.",
  "In a hole in the ground, there lived a hobbit. Not a nasty, dirty, wet hole filled with the ends of worms, nor a dry bare sandy hole with nothing on which to sit down or to eat.",
  "Do you know the way to San Jose?",
  "Eat at Joe's!",
  "Kilroy was here",
  "You can pick your friends, and you can pick your nose, but you can't pick your friend's nose.",
  "Soylent Green is people!",
  "I'll have what she's having.",
  "It's under the big W",
  "If at first you don't succeed, then complain about it over and over until you get credit for somehow succeeding so they can get you to shut up already.",
  "I don't think we're in Kansas anymore, Toto.",
  "I'm mad as hell, and I'm not going to take this any more!",
  "I'm going to make him an offer he can't refuse.",
  "May the Force be with you.",
  "[thought wanted]",
  "In the shadows, to the left!",
];

const createUser = () => {
  const domain = domains[Math.trunc(Math.random() * domains.length)];
  const userRand = Math.trunc(Math.random() * userNames.length);
  return {
    username: userNames[userRand],
    email: `${userNames[userRand]}@${domain}`,
    thoughts: [],
    friends: [],
  };
};

module.exports = { createUser, thoughts };
