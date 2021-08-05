const selectComputerElement = document.getElementById("selectComputer");
const computerFeaturesElement = document.getElementById("computerFeatures");

let computerInformationHeading = document.getElementById("computer-information-heading")
let computerInformationDescription = document.getElementById("computer-information-description")
let computerInformationImage = document.getElementById("computer-information-image")
let computerInformationPrice = document.getElementById("computer-information-price")

const url = "https://noroff-komputer-store-api.herokuapp.com";
export const getAllComputers = () => {
    fetch(`${url}/computers`)
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status)
                return
            }
            response.json().then(data => {
                addtoSelection(data);
            })
        }
        )
        .catch(function (err) {
            console.error('Fetch Error :-S', err)
        })
}

export const addtoSelection = (data) => {
    data.forEach(computer => {
        let option = document.createElement("option")
        option.setAttribute("id", computer.id)

        let text = document.createTextNode(computer.title)
        option.appendChild(text)
        selectComputerElement.appendChild(option)
    });
}


export const addToSelection = (data) => {
    selectComputer.options[0].disabled = true


    while (computerFeaturesElement.firstChild) {
        computerFeaturesElement.removeChild(computerFeaturesElement.firstChild);
    }

    data.specs.forEach(spec => {
        let p = document.createElement("p")
        p.setAttribute("class", "mb-0")
        let text = document.createTextNode(spec)
        p.appendChild(text)

        computerFeaturesElement.appendChild(p)
    })
}

export const addComputerById = (id) => {
    fetch(`${url}/computers/${id}`)
        .then(response => {
            if (response.status !== 200) {
                console.error('Looks like there was a problem. Status Code: ' +
                    response.status)
                return
            }

            response.json().then(data => {
                addToSelection(data)
                addComputerInformation(data)
            })
        }
        )
        .catch(function (err) {
            console.error('Fetch Error :-S', err)
        })
}

export const addComputerInformation = (data) => {
    computerInformationHeading.textContent = data.title
    computerInformationDescription.textContent = data.description
    computerInformationImage.setAttribute("src", `${url}/${data.image}`)
    computerInformationImage.setAttribute("alt", data.title)
    computerInformationPrice.textContent = data.price;
}

export const getComputerById = async (id) => {
    return fetch(`${url}/computers/${id}`)
        .then(response => {
            if (response.status !== 200) {
                console.error('Looks like there was a problem. Status Code: ' +
                    response.status)
                return
            }

            return response.json()
        }
        )
        .catch(err => {
            console.error('Fetch Error :-S', err)
        })
}