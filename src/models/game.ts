export class Game {
	public players: string[] = [];
	public stack: string[] = [];
	public playedCards: string[] = [];
	public currentPlayer: number = 0;
	public pickCardAnimation: boolean = false;
	/* public currentCard: string | undefined; */
	public currentCard: string = '';

	constructor() {
		for (let index = 1; index < 14; index++) {
			this.stack.push(`hearts_${index}`);
			this.stack.push(`diamonds_${index}`);
			this.stack.push(`aces_${index}`);
			this.stack.push(`clubs_${index}`);
		}
		shuffle(this.stack);
	}

	public toJson() {
		return {
			players: this.players,
			stack: this.stack,
			playedCards: this.playedCards,
			currentPlayer: this.currentPlayer,
			pickCardAnimation: this.pickCardAnimation,
			currentCard: this.currentCard,
		};
	}
}

const shuffle = (array: string[]) => {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};
