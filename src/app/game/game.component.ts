import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
	pickCardAnimation: boolean = false;
	game: Game | undefined;
	currentCard: string | undefined;

	constructor() {}

	ngOnInit(): void {
		this.newGame();
	}

	newGame() {
		this.game = new Game();
		console.table(this.game.stack);
	}

	pickCard(): void {
		if (!this.pickCardAnimation && this.game?.stack.length > 0) {
			this.currentCard = this.game.stack.pop();
			console.log(this.currentCard);
			this.pickCardAnimation = true;

			console.log(this.game?.playedCards);
		}
		setTimeout(() => {
			this.game?.playedCards.push(this.currentCard);
			this.pickCardAnimation = false;
		}, 1000);
		//take card
	}
}
