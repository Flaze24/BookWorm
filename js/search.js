//Se inicializan las variables globales
const link=`https://www.googleapis.com/books/v1/volumes?q=`;
const busBook=document.querySelector("#busBook");
let resultado=document.querySelector("#result");
const key="AIzaSyA7j7MlEFh0-LR0btN_w65bllOrpgfFx1Y";

//evento del buscador. Al darle click correra a traves de los siguientes siclos para ver que tipo de busqueda se realizo.
busBook.addEventListener('click', function(){
		const sear=document.querySelector("#search").value;
		const leng=document.querySelector("#lenguaje").value;
		const author=document.querySelector("#autor").value;
		const search=sear.replace(/\s/g,"+");
		resultado.innerHTML=""
		console.log(search);
		if(!search==""&& author==""){

				fetchSearch(search, leng);
			
		}else if (search=="" && !author=="") {

			fetchWithAuthor(leng,author);

		}else if (!search=="" && !author=="") {

			fetchBoth(search,leng,author);

		}else{
			alert("No puede tener campos vacios");
		}

})

//Funcion de busqueda sin especificar autor

let fetchSearch =(search, lang) => {

	fetch(`${link}"${search}"&langRestrict=${lang}&maxResults=20&orderBy=relevance&key=${key}`)
			.then((response)=>response.json())
			.then((data)=>{
				crearElementos(data);						

			})
			.catch((error)=>{
					console.log(error);
			})
}

//Funcion de busqueda con autor y sin especificar un titulo 

let fetchWithAuthor = (leng, author) =>{
	fetch(`${link}inauthor:${author}&langRestrict=${leng}&maxResults=20&orderBy=relevance&key=${key}`)
			.then((response)=>response.json())
			.then((data)=>{
					
				crearElementos(data);
			})
			.catch((error)=>{
					console.log(error);
			})
}

//Funcion de busqueda tanto con autor como con titulo.
let fetchBoth = (search, leng, author)=>{
	fetch(`${link}"${search}"+inauthor:${author}&langRestrict=${leng}&maxResults=20&orderBy=relevance&key=${key}`)
			.then((response)=>response.json())
			.then((data)=>{
					
				crearElementos(data);
			})
			.catch((error)=>{
					console.log(error);
			})
}

//Se crean los elementos que se llaman en los metodos fetch.
let crearElementos = (data) =>{

	let book=data.items;
				let unavailable="../img/unavailable.png"
				console.log(book);
				book.map((es)=>{
					resultado.innerHTML +=  `<div class="col-xs-6 col-sm-3 genre">
												<a href="#"><img src="${es.volumeInfo.imageLinks ? es.volumeInfo.imageLinks.thumbnail : unavailable }" class="foco image-responsive" style="width:130px; height:180px;"></a>
												<br>
												<strong>${cortarString(es.volumeInfo.title, 13)}</strong>
												<p>Autores: ${es.volumeInfo.authors ? cortarString(es.volumeInfo.authors[0],5) : "Desconocido"}</p>
												<button class="btn btn-primary revisar" id="${es.id}" data-toggle="modal" data-target="#libModal">Revisar</button>
											</div>`
									
					setTimeout(function(){
							document.getElementById(es.id).addEventListener("click", function(e){
								e.preventDefault();
								infoBook(es)
							})
					})
			
										
				});						

}

//Funcion para crear contenido dentro del modal

let infoBook= (arg)=>{
	let modalHeader=document.querySelector('#modalHeader');
	let modalBody=document.querySelector('#modalBody');
	let unavailable="../img/unavailable.png"
	modalHeader.innerHTML="";
	modalBody.innerHTML="";
	fetch(`${arg.selfLink}`)
	.then((response)=>response.json())
	.then((data)=>{
		console.log(data);
		modalHeader.innerHTML=`<h2>${data.volumeInfo.title}</h2>`;
		modalBody.innerHTML=`<div class="container">
								<div class="row text-center">
									<div class="col-xs-12 col-sm-4">
										<img src="${data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : unavailable }">	
																
									</div>
									<div class="col-xs-12 col-sm-4">
										<h3>${data.volumeInfo.title}</h3>
										<p>Autores: ${data.volumeInfo.authors}</p>
										<p>Fecha de Publicacion: ${data.volumeInfo.publishedDate}</p>
										<p>Publicado por: ${data.volumeInfo.publisher}</p>
										<p class="category">Categorias: <span>${data.volumeInfo.categories ? data.volumeInfo.categories: "No posee"}</span></p>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-8 summary">
									<h3>${data.volumeInfo.subtitle ? data.volumeInfo.subtitle : " "}</h3>
									<p>${data.volumeInfo.description ? data.volumeInfo.description : " "}</p>
									</div>
								</div>

							</div>`;
	})
	.catch((error)=>{
					console.log(error);
			})
}

//Funcion para recortar titulos y autores largos
let cortarString= (palabra, char) =>{

	if(palabra.length>char){
		return newTitle=palabra.substring(0,char)+"...";
	}else{
		return palabra;
	}

}