import { Component, inject, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { collection, collectionData, docData, Firestore } from '@angular/fire/firestore';
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

	/* pickCardAnimation: boolean = false;
	currentCard: string | undefined; */
	game: Game | undefined;
	gameId: string | undefined;

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
			this.gameId = params['id'];

			const aCollection = collection(this.firestore, 'games');
			const aDoc = doc(aCollection, this.gameId);

			docData(aDoc /* , { idField: 'customIdName' } */).subscribe((game: any) => {
				console.log('new games are:', game);
				this.game.currentPlayer = game.currentPlayer;
				this.game.playedCards = game.playedCards;
				this.game.players = game.players;
				this.game.stack = game.stack;
				this.game.pickCardAnimation = game.pickCardAnimation;
				this.game.currentCard = game.currentCard;
			});

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
		if (!this.game.pickCardAnimation && this.game?.stack.length > 0) {
			this.game.currentCard = this.game.stack.pop();
			this.game.pickCardAnimation = true;
			this.game.currentPlayer++;
			this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

			this.saveGame();

			setTimeout(() => {
				this.game?.playedCards.push(this.game.currentCard);
				this.game.pickCardAnimation = false;
				this.saveGame();
			}, 1000);
		}

		//take card
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(DialogAddPlayerComponent, {});

		dialogRef.afterClosed().subscribe((name: string) => {
			console.log('The dialog was closed', name);
			if (name && name.length > 0) {
				this.game.players.push(name);
				this.saveGame();
			}
		});
	}

	saveGame() {
		const aCollection = collection(this.firestore, 'games');
		const aDoc = doc(aCollection, this.gameId);
		setDoc(aDoc, this.game.toJson());
	}
}
