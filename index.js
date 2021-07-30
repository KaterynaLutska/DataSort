const formRef = document.querySelector('.form')
const inputRef = document.querySelector('.input')
const textContainer = document.querySelector('.list-container')
const usersList = document.querySelector('.list')
const xml = document.querySelector('.xml')

// btn //
const btnAdd = document.querySelector('.btn-add')
const btnSortByName = document.querySelector('.btn-sort-name')
const btnSortByValue = document.querySelector('.btn-sort-value')
const btnDelete = document.querySelector('.btn-delete')
const btnShowXML = document.querySelector('.btn-show-xml')


formRef.addEventListener('submit', addNameAndValue)  
btnSortByName.addEventListener('click', sortByName)
btnSortByValue.addEventListener('click',sortByValue)
btnDelete.addEventListener('click', onDelete)
btnShowXML.addEventListener('click', showXML )

let state = [];

function addNameAndValue (event) {
    event.preventDefault()

    const array = inputRef.value.replace(/\s+/g, '').split('=')
    const data = {
        name: array[0],
        price: array[1]
    }  

    inputRef.value = ''
    xml.textContent = ''
    state.push(data)
  
    addList(state)
 }



function addList (state) {
       const items = (el) => {
        const itemRef = document.createElement("li");
        itemRef.textContent = el;
        return itemRef;
      };
      const list = state.map((item)=>{
        return items(item.name + "="+ item.price)  
      })
  
      usersList.textContent = ''
    usersList.append(...list);

}




function sortByName () {
    state.sort((a, b) =>  {
     return   a.name.localeCompare(b.name)
    
    })
    addList(state)
return state
}

function sortByValue () {

    state.sort((a, b) =>  {
        console.log(a);
        return   a.price - b.price
       
       })
       addList(state)
}; 


function onDelete () {
    state = []
    usersList.textContent = ''
}


function showXML () {
    usersList.textContent = ''

    let doc = document.implementation.createDocument(null, "myXML");

state.forEach(a => {
  let result = doc.createElement("result");
  Object.entries(a).forEach(b => {
    let node = doc.createElement(b[0]);
    node.append(doc.createTextNode(b[1]));
    result.append(node);
  });
  xml.append(result);
});

console.log(new Array(...xml.children).reduce((a, b) => a + new XMLSerializer().serializeToString(b), ''));

}



