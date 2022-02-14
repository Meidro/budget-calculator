const model = (function () {
    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        this.percentage = totalIncome > 0 ? Math.round((this.value / totalIncome) * 100) : -1;
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    const addItem = (type, desc, val) => {
        let newItem, id;
        id = data.allItems[type].length > 0 ? data.allItems[type][data.allItems[type].length - 1].id + 1 : 0;
        if (type === 'inc') {
            newItem = new Income(id, desc, val);
        } else if (type === 'exp') {
            newItem = new Expense(id, desc, val);
        }
        data.allItems[type].push(newItem);
        return newItem;
    };

    const deleteItem = (type, id) => {
        data.allItems[type] = data.allItems[type].filter((item) => item.id !== id);
    };

    const calcBudget = (type) => {
        data.totals[type] = data.allItems[type].reduce((sum, item) => sum + item.value, 0);

        const totalInc = data.totals.inc,
            totalExp = data.totals.exp;

        data.budget = totalInc - totalExp;

        data.percentage = totalInc > 0 ? Math.round((totalExp / totalInc) * 100) : -1;
    };

    const getBudget = () => {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage,
        };
    };

    const calculatePercentage = () => {
        data.allItems.exp.forEach((item) => item.calcPercentage(data.totals.inc));
    };

    const getAllIdsAndPercentages = () => {
        return data.allItems.exp.map((item) => [item.id, item.getPercentage()]);
    };

    const data = {
        allItems: {
            inc: [],
            exp: [],
        },
        totals: {
            inc: 0,
            exp: 0,
        },
        budget: 0,
        percentage: -1,
    };

    return {
        addItem,
        calcBudget,
        getBudget,
        deleteItem,
        calculatePercentage,
        getAllIdsAndPercentages,
    };
})();
