const DOGSURL = "http://localhost:3000/dogs"
console.log(5)
document.addEventListener('DOMContentLoaded', () => {

    const table = document.getElementById("table-body")
    const form = document.getElementById("dog-form")
    form.addEventListener("submit", function(event){
        console.log(`clicked!`)
        json = ""
        const formName = document.getElementsByName("name")[0]
        const formBreed = document.getElementsByName("breed")[0]
        const formSex = document.getElementsByName("sex")[0]
        let editID = ""

        function saveEdit(event){
            let source = `${DOGSURL}/${form.dataset.id}`
            fetch(source, {
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ 
                    "name": formName.value,
                    "sex": formSex.value,
                    "breed": formBreed.value
                })
            })
        fetchContent(DOGSURL)
    }

        event.preventDefault()
        saveEdit(event)
    })

    function fetchContent(){
        fetch(DOGSURL)
        .then(response => response.json())
        .then(json => renderTable(json))
    }

    //function editDog(event, dog){
    function editDog(dog){
        form.name.value = dog.name
        form.breed.value = dog.breed
        form.sex.value = dog.sex
        form.dataset.id = dog.id
        //editID = dog.id
    }

    function renderTable(dogs){
        table.innerHTML = ""
        for (dog of dogs){
            renderDog(dog)
        }
    }

    function renderDog(dog){
        let row = document.createElement("tr")
        row.id = dog.id

        let name = document.createElement("td")
        name.innerText = dog.name

        let breed = document.createElement("td")
        breed.innerText = dog.breed

        let sex = document.createElement("td")
        sex.innerText = dog.sex

        let edit = document.createElement("button")
        edit.innerText = "Edit"
        edit.addEventListener("click", (event) => editDog(dog))

        let editArea = document.createElement("td")
        editArea.appendChild(edit)

        row.append(name, breed, sex, editArea)
        table.prepend(row)
    }

    fetchContent()
})