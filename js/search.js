const link=`https://www.googleapis.com/books/v1/volumes?q=`;
const busBook=document.querySelector("#busBook");
let resultado=document.querySelector("#result");

busBook.addEventListener('click', function(){
		const sear=document.querySelector("#search").value;
		const leng=document.querySelector("#lenguaje").value;
		const search=sear.replace(/\s/g,"+");
		resultado.innerHTML=""
		console.log(search);
		if(!search==""){
			fetch(`${link}"${search}"&langRestrict=${leng}&maxResults=20&orderBy=newest`)
			.then((response)=>response.json())
			.then((data)=>{
				let book=data.items;
				console.log(book);
				book.map((es)=>{
					resultado.innerHTML += `<div class="col-xs-6 col-md-3>
												<a href="#" class="thumbnail"><img src="${es.volumeInfo.imageLinks.thumbnail}" class="inmage foco image-responsive"></a>
												<br>
												<strong>${es.volumeInfo.title}</strong>
												<p>Autores: ${es.volumeInfo.authors}</p>
												<a href="#" class="btn btn-primary">Revisar</a>
											</div>`
					
				});
			})
			.catch((error)=>{
					console.log(error);
			})
			
		}else{
			alert("No puede tener campos vacios");
		}

})