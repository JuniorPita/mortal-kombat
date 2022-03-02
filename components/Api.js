export default class Api {
  baseUrl = 'https://reactmarathon-api.herokuapp.com/api/mk';
  allPlayers = `${this.baseUrl}/players`;
  randomPlayer = `${this.baseUrl}/player/choose`;
  fightPlayer = `${this.baseUrl}/player/fight`;

  getPlayers = async () => {
    return await fetch(this.allPlayers).then(res => res.json());
  }

  getRandomPlayer = async () => {
    return await fetch(this.randomPlayer).then(res => res.json());
  }

  getFight = async (hit, defence) => {
    return await fetch(this.fightPlayer, {
      method: 'POST',
      body: JSON.stringify({ hit, defence})
    }).then(res => res.json());
  }
}
