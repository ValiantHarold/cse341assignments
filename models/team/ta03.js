function getTagsList(list) {
    return [...new Set(list.map(item => item.tags).flat());];
}

function renderTagSelect(tags, selectTag) {
    const selectElement = document.querySelector('#'+selectTag);
    const itemHtml = tags.map(tags => `<option value="${tags}">${tags}</option>`);
    selectElement.innerHTML = itemHtml.json('');
}

module.exports = class tagGetter {
    constructor(selectTag) {
        this.outputTag = outputTag;
        this.items = [];
        this.tags = [];
    }

    async init() {
        await this.getTags();
        this.tags = getTagsList(this.items);
        renderTagSelect(this.tags, 'tags');
    }

    async getItems() {
        const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json"
        fetch(url).then((response) => response.json()).then(items => this.items = items);
    }
    
    getFilteredItems(filter) {
        const filteredItems = this.items.filter(items => filter == items.tags);
    }
};