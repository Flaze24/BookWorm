const link=`https://www.googleapis.com/books/v1/volumes?q=`;
const busBook=document.querySelector("#busBook");
let resultado=document.querySelector("#result");
const key="AIzaSyA7j7MlEFh0-LR0btN_w65bllOrpgfFx1Y";

busBook.addEventListener('click', function(){
		const sear=document.querySelector("#search").value;
		const leng=document.querySelector("#lenguaje").value;
		const search=sear.replace(/\s/g,"+");
		resultado.innerHTML=""
		console.log(search);
		if(!search==""){
			fetch(`${link}"${search}"&langRestrict=${leng}&maxResults=20&orderBy=relevance&key=${key}`)
			.then((response)=>response.json())
			.then((data)=>{
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
												<a href="#" class="btn btn-primary revisar">Revisar</a>
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

			})
			.catch((error)=>{
					console.log(error);
			})
			
		}else{
			alert("No puede tener campos vacios");
		}

})