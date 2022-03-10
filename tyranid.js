'use strict'

let createTyranid = async () => {
    if (tyranidName.value == "") {
        noName.style.visibility = "visible"
        if (hiveFleet.value == "--Please select--") {
            noHiveFleet.style.visibility = "visible"
        } else {
            noHiveFleet.style.visibility = "hidden"
        }
        if (points.value == "") {
            noPoints.style.visibility = "visible"
        } else {
            noPoints.style.visibility = "hidden"
        }
        return
    } else {
        noName.style.visibility = "hidden"
    }

    if (hiveFleet.value == "--Please select--") {
        noHiveFleet.style.visibility = "visible"
        if (points.value == "") {
            noPoints.style.visibility = "visible"
        } else {
            noPoints.style.visibility = "hidden"
        }
        return
    } else {
        noHiveFleet.style.visibility = "hidden"
    }

    if (points.value == "") {
        noPoints.style.visibility = "visible"
        return
    } else {
        noPoints.style.visibility = "hidden"
    }

    fetch("http://localhost:8080/create", {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
                "name": tyranidName.value,
                "hiveFleet": hiveFleet.value,
                "points": points.value
            }
        )
    })
        .then(res => res.json())
        .then((data) => console.log(`Request succeeded with JSON response ${data}`))
        .then(() => { this.showTyranids() })
        .then(() => { this.resetCreate() })
        .catch((error) => console.log(`Request failed ${error}`))
}

function resetCreate() {
    noName.style.visibility = "hidden"
    noHiveFleet.style.visibility = "hidden"
    noPoints.style.visibility = "hidden"
    tyranidName.value = ""
    hiveFleet.value = "--Please select--"
    points.value = ""
}

async function getTyranids() {
    let response = await fetch('http://localhost:8080/getAll');
    if (response.status !== 200) {
        throw new Error("Request has failed!");

    }
    console.log("Request Successful");
    let jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
}

const paragraphToSelect = document.querySelector("#dataPara");

async function showTyranids() {
    let returnedData = await getTyranids();
    //Adding additional clear to remove "no data shown about output"
    paragraphToSelect.innerHTML = "";
    //Ita through the json data
    returnedData.forEach(printTyranids);
}

function printTyranids(value) {
    let div = document.createElement("div")
    div.class = "dataEntry"
    div.innerHTML = `Name: ${value.name}, HiveFleet: ${value.hiveFleet}, Points: ${value.points}, <input type="button" value="Edit" onclick="showUpdate(${value.id})"> <input type="button" value="Delete" onclick="deleteTyranid(${value.id})">`;
    paragraphToSelect.append(div);
}

let updateId = 0

function showUpdate(id) {
    updateId = id
    updateTyranidBox.style.visibility = "visible"
}

function cancelUpdate() {
    updateTyranidBox.style.visibility = "hidden"
    resetUpdate()
}

function resetUpdate() {
    noUpdateName.style.visibility = "hidden"
    noUpdateHiveFleet.style.visibility = "hidden"
    noUpdatePoints.style.visibility = "hidden"
    updateName.value = ""
    updateHiveFleet.value = "--Please select--"
    updatePoints.value = ""
}

let saveUpdate = async () => {
    if (updateName.value == "") {
        noUpdateName.style.visibility = "visible"
        if (updateHiveFleet.value == "--Please select--") {
            noUpdateHiveFleet.style.visibility = "visible"
        } else {
            noUpdateHiveFleet.style.visibility = "hidden"
        }
        if (updatePoints.value == "") {
            noUpdatePoints.style.visibility = "visible"
        } else {
            noUpdatePoints.style.visibility = "hidden"
        }
        return
    } else {
        noUpdateName.style.visibility = "hidden"
    }

    if (updateHiveFleet.value == "--Please select--") {
        noUpdateHiveFleet.style.visibility = "visible"
        if (updatePoints.value == "") {
            noUpdatePoints.style.visibility = "visible"
        } else {
            noUpdatePoints.style.visibility = "hidden"
        }
        return
    } else {
        noUpdateHiveFleet.style.visibility = "hidden"
    }

    if (updatePoints.value == "") {
        noUpdatePoints.style.visibility = "visible"
        return
    } else {
        noUpdatePoints.style.visibility = "hidden"
    }

    fetch("http://localhost:8080/replace/" + updateId, {
        method: 'put',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
                "name": updateName.value,
                "hiveFleet": updateHiveFleet.value,
                "points": updatePoints.value
            }
        )
    })
        .then(res => res.json())
        .then((data) => console.log(`Request succeeded with JSON response ${data}`))
        .then(() => { this.showTyranids() })
        .then(() => { this.cancelUpdate() })
        .catch((error) => console.log(`Request failed ${error}`))
};


let deleteTyranid = async (id) => {
    fetch("http://localhost:8080/remove/" + id, {
        method: 'delete'
    })
        .then((data) => {
            console.log(`Request succeeded with JSON response ${data}`);
            // some function to execute if successful
        })
        .then(() => { this.showTyranids() })
        .catch((error) => {
            //some function to execute if error
        });
}
