let form = document.getElementById('form');
let tableBody = document.getElementById('table-body');
let data = [];
let editingIndex = -1;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let name = document.getElementById('name').value;
    let count = document.getElementById('count').value;
    let price = document.getElementById('price').value;
    
    let newItem = {
        name: name,
        count: count,
        price: price
    };
    
    data.push(newItem);
    saveData();
    renderTable();
    form.reset();
});

function renderTable() {
    tableBody.innerHTML = '';
    
    data.forEach(function(item, index) {
        let row = document.createElement('tr');
        
        if (editingIndex === index) {
            row.innerHTML = `
                <td>
                    <div class="edit-form">
                        <input type="text" id="edit-name-${index}" value="${item.name}">
                    </div>
                </td>
                <td>
                    <div class="edit-form">
                        <input type="number" id="edit-count-${index}" value="${item.count}">
                    </div>
                </td>
                <td>
                    <div class="edit-form">
                        <input type="number" id="edit-price-${index}" value="${item.price}" step="0.01">
                    </div>
                </td>
                <td>
                    <button class="edit-btn" onclick="saveItem(${index})">Сохранить</button>
                    <button class="delete-btn" onclick="cancelEdit()">Отмена</button>
                </td>
            `;
        } else {
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.count}</td>
                <td>${item.price}</td>
                <td>
                    <button class="edit-btn" onclick="editItem(${index})">Изменить</button>
                    <button class="delete-btn" onclick="deleteItem(${index})">Удалить</button>
                </td>
            `;
        }
        
        tableBody.appendChild(row);
    });
}

function editItem(index) {
    editingIndex = index;
    renderTable();
}

function saveItem(index) {
    let name = document.getElementById(`edit-name-${index}`).value;
    let count = document.getElementById(`edit-count-${index}`).value;
    let price = document.getElementById(`edit-price-${index}`).value;
    
    data[index] = {
        name: name,
        count: count,
        price: price
    };
    
    editingIndex = -1;
    saveData();
    renderTable();
}

function cancelEdit() {
    editingIndex = -1;
    renderTable();
}

function deleteItem(index) {
    data.splice(index, 1);
    saveData();
    renderTable();
}

function saveData() {
    localStorage.setItem('flowerData', JSON.stringify(data));
}

function loadData() {
    let savedData = localStorage.getItem('flowerData');
    if (savedData) {
        data = JSON.parse(savedData);
        renderTable();
    }
}

loadData();