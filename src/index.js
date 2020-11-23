document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById("table-body")
    let url = "http://localhost:3000/dogs"
    jsonObj = ""
    const form = document.getElementById("dog-form")
    const formName = document.getElementsByName("name")[0]
    const formBreed = document.getElementsByName("breed")[0]
    const formSex = document.getElementsByName("sex")[0]
    let editID = ""

    function saveEdit(event){
        let source = `${url}/${editID}`
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
        fetchContent(url)
    }

    form.addEventListener("submit", function(event){
        event.preventDefault()
        saveEdit(event)
    })

    function fetchContent(url){
        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            jsonObj = response
            createTable()
        })
    }

    function editDog(event, dog){
        formName.value = dog.name
        formBreed.value = dog.breed
        formSex.value = dog.sex
        editID = dog.id
    }

    function createTable(){
        table.innerHTML = ""
        let dogs = jsonObj
        for (const dog of dogs){
            let row = document.createElement("tr")
            let name = document.createElement("td")
            let breed = document.createElement("td")
            let sex = document.createElement("td")
            let edit = document.createElement("button")
            
            name.innerText = dog.name
            breed.innerText = dog.breed
            sex.innerText = dog.sex
            edit.innerText = "Edit"

            edit.addEventListener("click", (event) => editDog(event, dog))

            row.appendChild(name)
            row.appendChild(breed)
            row.appendChild(sex)
            row.appendChild(edit)
            table.appendChild(row)
        }
    }

    fetchContent(url)
})