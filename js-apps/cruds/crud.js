let productName = document.getElementById("name")
let productPrice = document.getElementById("price")
let productCat = document.getElementById("category")
let productDesc = document.getElementById("desc")

productName.addEventListener("blur",function(){validation(productName.value)})    
function validation (x){
  let regex= /^[A-Z]/  ;     
if (regex.test(x) == true){
productName.classList.add("is-valid") 
productName.classList.remove("is-invalid") 
document.getElementById("message").classList.add("d-none")

}
else{
  productName.classList.remove("is-valid") 
  productName.classList.add("is-invalid") 
  document.getElementById("message").classList.remove("d-none")
}
}




let productList = []
if (localStorage.getItem("list") != null) {
  productList=JSON.parse(localStorage.getItem("list"))
  displayProducts(productList)
}


function addProduct () {
 let  product = {name:productName.value, price:productPrice.value,  cat:productCat.value, desc:productDesc.value}
  productList.push(product)
  localStorage.setItem("list" , JSON.stringify( productList) )
  displayProducts(productList)

}

function displayProducts (array){
 let line =""
 
  for (let i = 0; i<array.length; i++) {
    line+= `
<tr>
<td>${i}</td>
<td>${array[i].name}</td>
<td>${array[i].price}</td>
<td>${array[i].cat}</td>
<td>${array[i].desc}</td>
 <td><button class='btn btn-secondary m-2' onclick="update(${i})"> update </button></td>
 <td> <button class='btn btn-danger m-2'  onclick="del(${i})"> delete </button></td>
</tr>
    `
  }
    document.getElementById("body").innerHTML = line ; 
  
 clear( ) ;
 
}

function clear ( ){
   productName.value="" ;
   productPrice.value="" ;
   productDesc.value="" ;
   productCat.value="";
}



function del (index){
   productList.splice(index,1)
   localStorage.setItem("list" , JSON.stringify( productList) )
   displayProducts(productList)
}


function search () {
  let search = document.getElementById("search").value
  let searched = []
  for (let i = 0 ; i<productList.length; i++ )
  if (productList[i].name.toUpperCase().includes(search.toUpperCase()) ) {
    searched.push(productList[i]) ;
    displayProducts(searched)
  }
     
}




