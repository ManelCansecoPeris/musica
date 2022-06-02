
var cansons = csv_To_Array(str_cansons, true, "|");
var cansons_originals = csv_To_Array(str_cansons, false, "|");
var nom_actual = "";
var canso_actual = "";
var canso_original = "";

function csv_To_Array(str, remplazar = true, delimiter = "|") {
	if (remplazar)
		str = str.replace(/ /g,"").toLowerCase();
	const header_cols = str.slice(0, str.indexOf("\n")).split(delimiter);
	const row_data = str.slice(str.indexOf("\n") + 1).split("\n");
	const arr = row_data.map(function (row) {
	  const values = row.split(delimiter);
	  const el = header_cols.reduce(function (object, header, index) {
		object[header] = values[index];
		return object;
	  }, {});
	  return el;
	});

	// return the array
	return arr;
  }



/*
  //Array con el listado de canciones a mostrar en el reprodutor
const canciones = [
"1.mp3",
"2.mp3",
"3.mp3",
"4.mp3"]
var indiceActual = new Array(1);
//Funcion para crear mediante javascript el listado de canciones

function crearPlayList(){
	const listado = document.createElement('ol')
	listado.setAttribute("id", 'listadoMusica')
	for (let i = 0; i<canciones.length; i++){
		const item = document.createElement('li')
		item.appendChild(document.createTextNode(canciones[i])) 
		item.setAttribute("id", canciones.indexOf(canciones[i]))
		listado.appendChild(item)
	}
	return listado;
}
document.getElementById('playList').appendChild(crearPlayList())

var listadoMusica= document.getElementById('listadoMusica')
listadoMusica.onclick = (e) =>{
	const itemClick = e.target
	removeActive()
	itemClick.classList.add("active");
    reproduccionActual("Reproduciendo: "+ itemClick.innerText)
	loadMusic(itemClick.innerText)
	player.play()
	indiceActual[0]= e.target.id
	classIconPlay();

}
*/
//Funcion para cambiar el icono del reprodutor
function classIconPlay(){
	var element = document.getElementById("iconPlay")
	element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
	element.classList.add("fa-spin");
}
//Funcion para control del volumen
const volumen= document.getElementById("volumen")
volumen.oninput= (e) =>{
	const vol = e.target.value
	player.volume =vol
}
//Funcion para actualizar la barra de progreso del reprodutor
const updateProgress = () =>{
	if (player.currentTime >0){
		const barra = document.getElementById('progress')
		barra.value = (player.currentTime / player.duration) * 100
		
		var duracionSegundos= player.duration.toFixed(0);
		dura=secondsToString(duracionSegundos);
		var actualSegundos = player.currentTime.toFixed(0)
		actual=secondsToString(actualSegundos);
		
		duracion= actual +' / '+ dura
		document.getElementById('timer').innerText=duracion 

		document.getElementById('punts_possibles').innerText = Math.trunc((1 - actualSegundos/duracionSegundos)*1000);

	}
	if (player.ended){
		rendir_se();
	} 
}
//Funcion para reproducir la proxima cancion
/*
function nextMusic(){  
	const source = document.getElementById('source');
	var musicaActual= Number(indiceActual[0]);
	if (canciones.length == (musicaActual+1)){
		var siguiente = 0
	} else {
		var siguiente = musicaActual + 1
	}
	removeActive()
	var item=document.getElementById(siguiente)
	item.classList.add("active");
	loadMusic(canciones[siguiente]);
	player.play()
	indiceActual[0]= siguiente
	reproduccionActual("Reproduciendo: "+ canciones[siguiente])
	classIconPlay()
}
//Funcion para reproducir la cancion anterior
function prevMusic(){  
	const source = document.getElementById('source');
	var musicaActual= Number(indiceActual[0]);
	if (musicaActual==0){
		var anterior= canciones.length - 1
	} else {
		var anterior = musicaActual - 1
	}
	removeActive()
	var item=document.getElementById(anterior)
	item.classList.add("active");
	loadMusic(canciones[anterior]);
	player.play()
	indiceActual[0]= anterior
	reproduccionActual("Reproduciendo: "+ canciones[anterior])
	classIconPlay()
}
*/
/*
//Funcion para remover todas las clases css activas
function removeActive(){
	var elems = document.querySelectorAll(".active");
 	 [].forEach.call(elems, function(el) {
    	el.classList.remove("active");
 	 });
 	 return elems
}
*/
/*
//Fucion para mostrar el nombre del arhivo actual en reproduccion
function reproduccionActual(texto){
	document.getElementById('currentPlay').innerText=texto
}
*/

//Funcion para cargar las canciones en el reproductor
function loadMusic(ruta){
//	console.log("Entro en Loadmusic")
//	console.log("Rura es: " + ruta)
	var source = document.getElementById('source')
	var folder ="audio";//Carpeta donde tenemos almancenada la musica
	source.src= folder+"/"+ruta
//	var index= indiceActual[0]= canciones.indexOf(ruta)
//	removeActive()
//	var item=document.getElementById(index)
//	item.classList.add("active");
	//reproduccionActual("Reproduciendo: "+ ruta)
	player.load()
}
//Funcion para pausar o darle play 
function togglePlay() {
	if (player.paused){
		toggleIcon();
		return player.play();
	} else {
		toggleIcon();
		return player.pause();
	}
}
//Funcion para cambiar el icono play o pause
function toggleIcon() {
   var element = document.getElementById("iconPlay");
   element.classList.toggle("fa-play-circle");
   element.classList.toggle("fa-spin");
}
//Funcion para que al dar click sobre la barra de progeso se permita adelantar
/*progress.addEventListener('click', adelantar);
function adelantar(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
	player.currentTime = scrubTime;
	sonsole.log(e);
}
*/
//Funcion para convertir segundos a minutos y horas
function secondsToString(seconds) {
	var hour="";
	if (seconds>3600){
		hour = Math.floor(seconds / 3600);
		hour = (hour < 10)? '0' + hour : hour;
		hour+=":"
	}
   var minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10)? '0' + minute : minute;
  var second = seconds % 60;
  second = (second < 10)? '0' + second : second;
  return hour  + minute + ':' + second;
}

function nova_ronda() {
	var ronda = document.getElementById('ronda_actual');
	ronda.innerHTML = parseInt(ronda.innerHTML)+1;
//	console.log("Ronda: '" + ronda.innerHTML + "'")
	if (parseInt(ronda.innerHTML) > 5) {
		document.getElementById("comunicacio").innerHTML = "FI DEL JOC !! <br>La teua puntuació és de " + document.getElementById("puntuacio_actual").innerHTML + " punts";
	} else {
		var atzar = Math.floor(Math.random()*(cansons.length-1));
//		console.log("El azar es: " + atzar);
		canso_actual = cansons[atzar]["arxiu"];
		canso_original = cansons_originals[atzar]["Nom"];
//		console.log(canso_original);
//		console.log(canso_actual);
		nom_actual = cansons[atzar]["nom"];
//		console.log(nom_actual);
		document.getElementById('punts_possibles').innerHTML = 1000;
		loadMusic(canso_actual);
	}
}

function comprova() {
	var resposta = document.getElementById("resposta").value;
	resposta = resposta.replace(/ /g,"").toLowerCase();
//	console.log("Ha dit: '" + resposta + "'")
//	console.log("La resposta es: '" + nom_actual + "'")

	if (resposta==nom_actual) {
		var punts = parseInt(document.getElementById("punts_possibles").innerHTML);
		document.getElementById("comunicacio").innerHTML = "Genial!! L'has encertada!!!<br>Has guanyat " + punts + " punts";
		document.getElementById("puntuacio_actual").innerHTML = parseInt(document.getElementById("puntuacio_actual").innerHTML) + punts;
		if (!(player.paused))
			togglePlay();
		nova_ronda();
	} else {
		document.getElementById("comunicacio").innerHTML = "<b>Noooo</b> :-( <br>Torna a intentar-ho!!!";
	}
}

function rendir_se() {
	document.getElementById("comunicacio").innerHTML = "<b>Oooohhh</b> :'-( <br>La cançó era " + canso_original;
	if (!(player.paused))
		togglePlay();
	nova_ronda();
}

// Programa Principal
nova_ronda();


