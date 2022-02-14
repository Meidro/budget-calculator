const controller = (function (state, ui) {
    const setupEventListeners = () => {
        const DOM = ui.getDomStrings();
        document.querySelector(DOM.form).addEventListener('submit', addItem);
        document.querySelector(DOM.budgetTable).addEventListener('click', deleteItem);
    };

    const updatePercentages = () => {
        state.calculatePercentage();
        const idAndPercents = state.getAllIdsAndPercentages();
        ui.updateItemsPercentages(idAndPercents);
    };

    const addItem = (e) => {
        e.preventDefault();
        const input = ui.getFormData();
        let {type, description, value} = input;
        value = +value;

        if (description !== '' && !isNaN(value) && value > 0) {
            const newItem = state.addItem(type, description, value);
            ui.renderListItem(newItem, type);
            ui.clearFields();
            generateTestData.insertInUi();

            updateBudget(type);
            updatePercentages();
        }
    };

    const deleteItem = (e) => {
        if (e.target.closest('.item__remove')) {
            const itemId = e.target.closest('li').id;
            const splitId = itemId.split('-');
            const type = splitId[0];
            const id = +splitId[1];

            state.deleteItem(type, id);
            ui.deleteListItem(itemId);

            updateBudget(type);
            updatePercentages();
        }
    };

    const updateBudget = (type) => {
        state.calcBudget(type);
        const budgetObj = state.getBudget();
        ui.updateBudget(budgetObj);
    };

    return {
        init() {
            console.log('App started!');
            ui.displayMonth();
            setupEventListeners();
        },
    };
})(model, view);

controller.init();
