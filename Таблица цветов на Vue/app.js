const { createApp } = Vue;

createApp({
    data() {
        return {
            items: [],
            newItem: {
                name: '',
                count: '',
                price: ''
            },
            editingIndex: -1,
            editItem: {
                name: '',
                count: '',
                price: ''
            }
        }
    },
    methods: {
        addItem() {
            this.items.push({...this.newItem});
            this.saveData();
            this.resetForm();
        },
        resetForm() {
            this.newItem = {
                name: '',
                count: '',
                price: ''
            };
        },
        startEdit(index) {
            this.editingIndex = index;
            this.editItem = {...this.items[index]};
        },
        saveEdit() {
            this.items[this.editingIndex] = {...this.editItem};
            this.editingIndex = -1;
            this.saveData();
        },
        cancelEdit() {
            this.editingIndex = -1;
        },
        deleteItem(index) {
            this.items.splice(index, 1);
            this.saveData();
        },
        saveData() {
            localStorage.setItem('flowerData', JSON.stringify(this.items));
        },
        loadData() {
            const savedData = localStorage.getItem('flowerData');
            if (savedData) {
                this.items = JSON.parse(savedData);
            }
        }
    },
    mounted() {
        this.loadData();
    }
}).mount('#app');