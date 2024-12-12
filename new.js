let items = []; // Оставьте только одно объявление

const translations = {
    ru: {
        addTitle: "Добавление товара",
        name: "Название",
        description: "Описание",
        phone: "Номер телефона",
        owner: "Имя",
        category: "Выберите категорию",
        type: "Тип товара",
        addItem: "Добавить товар",
        itemList: "Список товаров",
        allCategories: "Все категории",
        allTypes: "Все типы",
        newest: "Сначала новые",
        oldest: "Сначала старые",
        search: "Поиск по ключевой букве",
        showAll: "Показать все",
        phoneLabel: "Телефон",
        ownerLabel: "Владелец",
        categoryLabel: "Категория",
        typeLabel: "Тип",
        dateLabel: "Дата добавления",
    },
    kk: {
        addTitle: "Тауар қосу",
        name: "Атауы",
        description: "Сипаттама",
        phone: "Телефон нөмірі",
        owner: "Есімі",
        category: "Санатты таңдаңыз",
        type: "Тауар түрі",
        addItem: "Тауарды қосу",
        itemList: "Тауарлар тізімі",
        allCategories: "Барлық санаттар",
        allTypes: "Барлық түрлері",
        newest: "Алдымен жаңалары",
        oldest: "Алдымен ескілері",
        search: "Кілт сөзі бойынша іздеу",
        showAll: "Барлығын көрсету",
        phoneLabel: "Телефон",
        ownerLabel: "Иесі",
        categoryLabel: "Санат",
        typeLabel: "Түрі",
        dateLabel: "Қосу күні",
    },
};

// Далее продолжайте использовать `items` как обычно


let currentLang = "ru";

function translateInterface() {
    const texts = translations[currentLang];
    document.getElementById("addTitle").textContent = texts.addTitle;
    document.getElementById("name").placeholder = texts.name;
    document.getElementById("description").placeholder = texts.description;
    document.getElementById("phone").placeholder = texts.phone;
    document.getElementById("owner").placeholder = texts.owner;
    document.getElementById("category").options[0].textContent = texts.category;
    document.getElementById("type").options[0].textContent = texts.type;
    document.querySelector("button[type='submit']").textContent = texts.addItem;
    document.getElementById("itemListTitle").textContent = texts.itemList;
    document.getElementById("filterCategory").options[0].textContent = texts.allCategories;
    document.getElementById("filterType").options[0].textContent = texts.allTypes;
    document.getElementById("sortDate").options[0].textContent = texts.newest;
    document.getElementById("sortDate").options[1].textContent = texts.oldest;
    document.getElementById("search").placeholder = texts.search;
    document.querySelector("button[onclick='showAllItems()']").textContent = texts.showAll;
}

function addItem(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const phone = document.getElementById('phone').value;
    const owner = document.getElementById('owner').value;
    const category = document.getElementById('category').value;
    const type = document.getElementById('type').value;
    const dateAdded = new Date();
    const image = document.getElementById('image').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        items.push({ name, description, phone, owner, category, type, dateAdded, image: e.target.result });
        document.getElementById('addForm').reset();
        alert('Товар добавлен!');
        renderItems();
    };
    reader.readAsDataURL(image);
}

function renderItems(filteredItems = items) {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '';
    filteredItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p><span class="phone">${item.phone}</span></p>
                <p>${item.owner}</p>
                <p>${item.category}</p>
                <p>${item.type}</p>
                <p>${item.dateAdded.toLocaleDateString()}</p>
            </div>
        `;
        container.appendChild(itemElement);
    });
}

function filterItems() {
const category = document.getElementById('filterCategory').value;
const type = document.getElementById('filterType').value;
const sortDate = document.getElementById('sortDate').value;
const search = document.getElementById('search').value.toLowerCase();

let filteredItems = items.filter(item => {
    return (category === 'all' || item.category === category) &&
           (type === 'all' || item.type === type) &&
           (!search || item.name.toLowerCase().includes(search));
});

if (sortDate === 'newest') {
    filteredItems.sort((a, b) => b.dateAdded - a.dateAdded);
} else {
    filteredItems.sort((a, b) => a.dateAdded - b.dateAdded);
}

renderItems(filteredItems);
}

document.getElementById('filterCategory').addEventListener('change', filterItems);
document.getElementById('filterType').addEventListener('change', filterItems);
document.getElementById('sortDate').addEventListener('change', filterItems);
document.getElementById('search').addEventListener('input', filterItems);


function showAllItems() {
    renderItems();
}

function toggleLanguage() {
    currentLang = currentLang === "ru" ? "kk" : "ru";
    translateInterface();
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
}

window.onload = () => {
    translateInterface();
    renderItems();
}; 
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatContainer = document.getElementById('chatContainer');
    const recipientSelect = document.getElementById('recipientSelect');
    const message = chatInput.value.trim();
    const recipient = recipientSelect.value;

    if (message && recipient) {
        const messageElement = document.createElement('div');
        messageElement.textContent = `К ${recipient}: ${message}`;
        messageElement.classList.add('border', 'rounded', 'p-2', 'mb-2');
        chatContainer.appendChild(messageElement);

        // Отправка сообщения на сервер
        sendMessageToServer(message, recipient);

        chatInput.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;
    } else {
        alert('Введите сообщение и выберите получателя.');
    }
}

function sendMessageToServer(message, recipient) {
    // Пример отправки на сервер
    fetch('/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, recipient }),
    }).then(response => {
        if (response.ok) {
            console.log('Сообщение отправлено');
        } else {
            console.error('Ошибка отправки сообщения');
        }
    });
}
function sendMessageToServer(message, recipient) {
    console.log(`Сообщение: "${message}" отправлено ${recipient}`);
}

function fetchMessages() {
    fetch('/get-messages')
        .then(response => response.json())
        .then(data => {
            const chatContainer = document.getElementById('chatContainer');
            chatContainer.innerHTML = '';
            data.messages.forEach(msg => {
                const messageElement = document.createElement('div');
                messageElement.textContent = `От ${msg.sender}: ${msg.text}`;
                messageElement.classList.add('border', 'rounded', 'p-2', 'mb-2');
                chatContainer.appendChild(messageElement);
            });
        });
}

// Регулярное обновление чата
setInterval(fetchMessages, 5000);
