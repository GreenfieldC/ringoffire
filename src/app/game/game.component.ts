import { Component, inject, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore } from '@angular/fire/firestore';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
	firestore: Firestore = inject(Firestore);

	pickCardAnimation: boolean = false;
	game: Game | undefined;
	currentCard: string | undefined;

	constructor(public dialog: MatDialog) {}

	ngOnInit(): void {
		this.newGame();
	}

	newGame() {
		this.game = new Game();
		console.table(this.game.stack);
	}

	pickCard(): void {
		if (this.game.players.length < 1) return;
		if (!this.pickCardAnimation && this.game?.stack.length > 0) {
			this.currentCard = this.game.stack.pop();
			console.log(this.currentCard);
			this.pickCardAnimation = true;

			console.log(this.game?.playedCards);
		}

		this.game.currentPlayer++;
		this.game.currentPlayer =
			this.game.currentPlayer % this.game.players.length;

		setTimeout(() => {
			this.game?.playedCards.push(this.currentCard);
			this.pickCardAnimation = false;
		}, 1000);
		//take card
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(DialogAddPlayerComponent, {});

		dialogRef.afterClosed().subscribe((name: string) => {
			console.log('The dialog was closed', name);
			if (name && name.length > 0) this.game.players.push(name);
		});
	}
}
