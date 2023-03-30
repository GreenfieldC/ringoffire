import { Component, inject, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
	collection,
	collectionData,
	docData,
	Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, setDoc } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
	firestore: Firestore = inject(Firestore);

	games$: Observable<any[]>;

	pickCardAnimation: boolean = false;
	game: Game | undefined;
	currentCard: string | undefined;

	constructor(private route: ActivatedRoute, public dialog: MatDialog) {
		/* 	const aCollection = collection(this.firestore, 'games');
		this.games$ = collectionData(aCollection);
		this.games$.subscribe((game) => {
			console.log('new games are:', game);
		}); */
	}

	ngOnInit(): void {
		this.newGame();
		this.route.params.subscribe((params) => {
			console.log(params['id']);

			const aCollection = collection(this.firestore, 'games');
			const aDoc = doc(aCollection, params['id']);

			docData(aDoc, { idField: 'customIdName' }).subscribe(
				(game: any) => {
					console.log('new games are:', game);
					this.game.currentPlayer = game.currentPlayer;
					this.game.playedCards = game.playedCards;
					this.game.players = game.players;
					this.game.stack = game.stack;
				}
			);

			/* this.games$ = collectionData(aCollection);
			this.games$.subscribe((game) => {
				console.log('new games are:', game);
			}); */
		});
	}

	newGame() {
		this.game = new Game();
	}

	pickCard(): void {
		if (this.game.players.length < 1) return; //no players
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
