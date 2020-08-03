const iconSearch = document.querySelector('#search')
const input = `
    <input placeholder="Buscar"></input>
`

function handleClick() {
    iconSearch.remove();
    const headerRigth = document.querySelector('.header-rigth')
    headerRigth.innerHTML += input
}
iconSearch.addEventListener('click', handleClick)