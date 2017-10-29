const link=`https://www.googleapis.com/books/v1/volumes?q=`;
const busBook=document.querySelector("#busBook");
let resultado=document.querySelector("#result");
const key="AIzaSyA7j7MlEFh0-LR0btN_w65bllOrpgfFx1Y";

busBook.addEventListener('click', function(){
		const sear=document.querySelector("#search").value;
		const leng=document.querySelector("#lenguaje").value;
		const author=document.querySelector("#autor").value;
		const search=sear.replace(/\s/g,"+");
		resultado.innerHTML=""
		console.log(search);
		if(!search==""){

			if(!author==""){

				fetchwAuthor(search, leng, author);

			}else{
				fetchSearch(search, leng);
				
			}
			
		}else{
			alert("No puede tener campos vacios");
		}

})

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

let fetchwAuthor = (search, leng, author) =>{
	fetch(`${link}"${search}"+inauthor:${author}&langRestrict=${leng}&maxResults=20&orderBy=relevance&key=${key}`)
			.then((response)=>response.json())
			.then((data)=>{
					
				crearElementos(data);
			})
			.catch((error)=>{
					console.log(error);
			})
}

let crearElementos = (data) =>{

	let book=data.items;
				let unavailable="../img/unavailable.png"
				console.log(book);
				book.map((es)=>{
					// i=0
					// if(i==0){
					// 	resultado.innerHTML+=`<div class="row text-center">`
					// }
					resultado.innerHTML +=  `<div class="col-xs-6 col-md-3 genre>
												<a href="#"><img src="${es.volumeInfo.imageLinks ? es.volumeInfo.imageLinks.thumbnail : unavailable }" class="foco image-responsive" style="width:130px; height:180px;"></a>
												<br>
												<strong>${es.volumeInfo.title}</strong>
												<p>Autores: ${es.volumeInfo.authors ? es.volumeInfo.authors : "Desconocido"}</p>
												<a href="#" class="btn btn-primary revisar" id="${es.id}">Revisar</a>
											</div>`
											// i++;
											
					// if(i==3){
					// 	resultado.innerHTML+=`</div>`
					// }
								
					console.log(resultado);

					// let revisar=document.querySelectorAll(".revisar");
					// revisar.addEventListener("click", function(e){
					// 	e.preventDefault();
					// 	let envio=revisar.value;
					// 	console.log(envio);
					// })
										
				});						

}