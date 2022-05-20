// vi du vee promise
let hero = [
  {
    hero_id: 3,
    name: "involker",
  },
  {
    id: 2,
    name: "shadowfiend",
  },
  {
    id: 3,
    name: "antimage",
  },
];
let winRates = [
  {
    hero_id: 1,
    wiRate: "80%",
  },
  {
    hero_id: 3,
    wiRate: "70%",
  },
  {
    hero_id: 3,
    wiRate: "95%",
  },
];
function getWinrate() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(winRates);
    }, 1000);
  });
}
function getHeroName() {
  return new Promise(function (resolve) {
    let retult = hero.filter((obj) => hero_id.includes(obj.id));
    setTimeout(function () {
      resolve(retult);
    }, 1000);
  });
}
getWinrate().then(function (winRates) {
  let heros_ids = winRates.map((obj) => obj.hero_id);
  return getHeroName().then(function (name) {
    return {
      name: name,
      winRates: winRates,
    };
  });
});
