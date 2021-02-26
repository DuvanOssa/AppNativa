const iconSearch = document.querySelector('#search')

const primarySearchButton = document.querySelector('#buttonSearch');

const handleSearch = async(e)=>{
    e.preventDefault(); 
    localStorage.setItem("currentSearch", getSearchValue())
    window.location.href = "./HTML/search.html"
}
const handleSecondarySearch = async(e)=>{
    console.log(e)
    if(e.charCode === 13){
        e.preventDefault();
        localStorage.setItem("currentSearch", getSecondarySearchValue())
        window.location.reload();
    }
}


function handleClick() {
    const input = `
    <input id="secondarySearchInput" placeholder="Buscar"></input>
`
    iconSearch.remove();
    const headerRigth = document.querySelector('.header-rigth')
    headerRigth.innerHTML += input
    const secondarySearchInput = document.querySelector('#secondarySearchInput');
    console.log(secondarySearchInput)
    secondarySearchInput.addEventListener('keypress',handleSecondarySearch)
}
iconSearch.addEventListener('click', handleClick)

const getSearchData = async(search) => {
    const ress = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=8dbe9b2f66b85a085ad28e12a7c2b943&language=es-MX&page=1&include_adult=false&query=${search}`
    );
    const data = await ress.json();
    return data;
};

const getSearchValue = ()=>{
   const primaryInput = document.querySelector('#primarySearchInput');
   return primaryInput.value;

}
const getSecondarySearchValue = ()=>{
   const secondarySearchInput = document.querySelector('#secondarySearchInput');
   return secondarySearchInput.value;

}

if(primarySearchButton){
    primarySearchButton.onclick = handleSearch;
}





