let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'Create';
let tmp;
/* Total Function */
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#040";
    } else {
        total.style.backgroundColor = "#860000";
    }
}



let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

/* input data function */

submit.onclick = () => {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if (mood === 'Create') {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        mood = 'Create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }


    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData()
    showData()
}

/* Clear Data */
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


/* show Data function */
showData()
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='update(${i})' id="update">update</button></td>
            <td><button onclick='deletData(${i})' id="delete">delete</button></td>
        </tr>
        `;

    }
    document.getElementById('tbody').innerHTML = table;
    btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deletAllData()">Delete All(${dataPro.length})</button>
        `
    } else {
        btnDelete.innerHTML = '';
    }
}
/* Delet All Data */
function deletAllData() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

/* delet function */
function deletData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();

}

/* Update function  */

function update(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    category.value = dataPro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update'
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

/* Search function */
let searchMood = 'tittle';
function getSearchMood(id) {
    let Search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'tittle';
        Search.placeholder = "Search By Title";
    } else {
        searchMood = 'category';
        Search.placeholder = "Search By category";
    }
    Search.focus();
    
}


/* search data */

function searchData(value) {
    var table = '';
    console.log(searchMood);
    if (searchMood == 'tittle') {
        for (var i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value)) {
                table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='update(${i})' id="update">update</button></td>
            <td><button onclick='deletData(${i})' id="delete">delete</button></td>
        </tr>
        `;
            }
        }
    } else {
        
        for (var i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value)) {
                table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='update(${i})' id="update">update</button></td>
            <td><button onclick='deletData(${i})' id="delete">delete</button></td>
        </tr>
        `;
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;


}