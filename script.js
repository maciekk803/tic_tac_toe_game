var my_canvas = document.createElement('canvas');
my_canvas.width = 640;
my_canvas.height = 640;

document.body.appendChild(my_canvas);

var ctx = my_canvas.getContext('2d');



								/*RYSOWANIE HUD*/
ctx.fillStyle = 'rgb(58, 30, 71)'
ctx.fillRect(210, 0, 5, 640);
ctx.fillRect(425, 0, 5, 640);
ctx.fillRect(0, 210, 640, 5);
ctx.fillRect(0, 425, 640, 5);



								/*PORZADKOWANIE TABEL*/
var plansza = [];
for (var i = 0; i < 3; i++)	plansza[i] = [0, 0, 0];

var x = 0, y = 0, count = 0;
my_canvas.addEventListener('click', onClick, false);



								/*SPRAWDZANIE PRZY KAZDYM KLIKNIECIU MYSZKA NA CANVAS*/
function onClick(event){

					/*WYBOR GRACZA*/
	x = Math.floor(event.offsetX / 220);
	y = Math.floor(event.offsetY / 220);

	if(plansza[x][y] == 0){
		plansza[x][y] = 1;
		draw(1);

		count++;

		if(check() != 0){
			endingDraw(check());
			my_canvas.removeEventListener('click', onClick);
			document.getElementById("wygrana").classList.remove("current");
			return;
		}
	}

	else return;




					/*WYBOR KOMPUTERA*/
	if(count < 9){
		// computerMove();
		do{
			x = rand(0, 3);
			y = rand(0, 3);
		}while(plansza[x][y] != 0);

		plansza[x][y] = 2;	
		draw(2);

		count++;

		if(check() != 0){
			endingDraw(check());
			my_canvas.removeEventListener('click', onClick);
			document.getElementById("przegrana").classList.remove("current");
			return;
		}
	}

	else{
		my_canvas.removeEventListener('click', onClick);
		document.getElementById("remis").classList.remove("current");
	}
}



								/*FUNKCJA LOSUJACA RAND*/
function rand(min, max){
	return Math.floor(Math.random() * max) + min;
}



								/*FUNKCJA SPRAWDZAJACA*/
function check(){
	//przekatne
	if((plansza[0][0] == plansza[1][1]) && (plansza[0][0] == plansza[2][2]) && (plansza[1][1] == plansza[2][2]) && (plansza[0][0] != 0 && plansza[1][1] != 0 && plansza[2][2] != 0)) return 1;
	if((plansza[2][0] == plansza[1][1]) && (plansza[2][0]  == plansza[0][2]) && (plansza[1][1] == plansza[0][2]) && (plansza[2][0] != 0 && plansza[1][1] != 0 && plansza[0][2] != 0)) return 2;

	//poziome
	if((plansza[0][0] == plansza[1][0]) && (plansza[0][0] == plansza[2][0]) && (plansza[1][0] == plansza[2][0]) && (plansza[0][0] != 0 && plansza[1][0] != 0 && plansza[2][0] != 0)) return 3;
	if((plansza[0][1] == plansza[1][1]) && (plansza[0][1] == plansza[2][1]) && (plansza[1][1] == plansza[2][1]) && (plansza[0][1] != 0 && plansza[1][1] != 0 && plansza[2][1] != 0)) return 3;
	if((plansza[0][2] == plansza[1][2]) && (plansza[0][2] == plansza[2][2]) && (plansza[1][2] == plansza[2][1]) && (plansza[0][2] != 0 && plansza[1][2] != 0 && plansza[2][2] != 0)) return 3;

	//pionowe
	if((plansza[0][0] == plansza[0][1]) && (plansza[0][0] == plansza[0][2]) && (plansza[0][1] == plansza[0][2]) && (plansza[0][0] != 0 && plansza[0][1] != 0 && plansza[0][2] != 0)) return 4;
	if((plansza[1][0] == plansza[1][1]) && (plansza[1][0] == plansza[1][2]) && (plansza[1][1] == plansza[1][2]) && (plansza[1][0] != 0 && plansza[1][1] != 0 && plansza[1][2] != 0)) return 4;
	if((plansza[2][0] == plansza[2][1]) && (plansza[2][0] == plansza[2][2]) && (plansza[2][1] == plansza[2 ][2]) && (plansza[2][0] != 0 && plansza[2][1] != 0 && plansza[2][2] != 0)) return 4;

	return 0;
}



								/*FUNKCJA RYSUJACA SYMBOL*/
function draw(ktory){
	ctx.strokeStyle = 'rgb(58, 30, 71)'
	ctx.lineWidth = 5;
	x = (220 * x);
	y = (220 * y);
	
	switch(ktory){
		//kolko
		case 1:
		ctx.beginPath();
		ctx.arc(100 + x, 100 + y, 60, 0, 2 * Math.PI);
		ctx.stroke(); break;

		//krzyzyk
		case 2:
		ctx.moveTo(40 + x, 40 + y);
		ctx.lineTo(160 + x, 160 + y);
		ctx.stroke();

		ctx.moveTo(160 + x, 40 + y);
		ctx.lineTo(40 + x, 160 + y);
		ctx.stroke(); break;
	}
}


								/*FUNKCJA PRZEKRESLAJACA SYMBOLE*/
function endingDraw(ktory){
	ctx.strokeStyle = 'rgb(58, 30, 71)';
	ctx.lineWidth = 5;

	switch(ktory){
		//przekatne
		case 1:
			ctx.moveTo(20, 20);
			ctx.lineTo(620, 620);
			ctx.stroke(); break;
		case 2:
			ctx.moveTo(620, 20);
			ctx.lineTo(20, 620);
			ctx.stroke(); break;

		//poziome
		case 3:
			ctx.moveTo(20, 100 + y);
			ctx.lineTo(620, 100 + y);
			ctx.stroke(); break;

		//pionowe
		case 4:
			ctx.moveTo(100 + x, 20);
			ctx.lineTo(100 + x, 620);
			ctx.stroke(); break;
	}
}


// 								/*FUNKCJA RUCHOW KOMPUTERA*/
// function computerMove(){
// 	var count = 0;

// 	for(var i = 0; i < 3; i++){
// 		if((plansza[i][0] == plansza[i][1]) || ){

// 		}
// 	}
// }