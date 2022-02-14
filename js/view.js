const view = (function () {
    const DOMstrings = {
        form: '#budget-form',
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        incContainer: '#income__list',
        expContainer: '#expenses__list',
        budgetLabel: '#budget-value',
        incLabel: '#inc-label',
        expLabel: '#exp-label',
        expPercentLabel: '#exp-perc-label',
        budgetTable: '#budget-table',
        monthLabel: '#month',
        yearLabel: '#year',
    };

    const getFormData = () => {
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
        };
    };

    const formatNumber = (num, type) => {
        num = Math.abs(num);
        num = num.toFixed(2);
        const numSplit = num.split('.');
        const int = numSplit[0];
        const dec = numSplit[1];

        let newInt = '';
        let count = 0;

        if (int.length > 3) {
            for (let i = 0; i < Math.floor(int.length / 3); i++) {
                newInt = `,${int.slice(int.length - 3 * (i + 1), int.length - 3 * i)}${newInt}`;
                count++;
            }

            if ((int.length / 3) % 1 !== 0) {
                newInt = int.slice(0, int.length - 3 * count) + newInt + '.' + dec;
            } else {
                newInt = newInt.slice(1) + '.' + dec;
            }
        } else {
            newInt = num;
        }

        newInt = type === 'exp' ? '- ' + newInt : '+ ' + newInt;
        return newInt;
    };

    const renderListItem = ({id, description, value}, type) => {
        let containerEl, html;
        if (type === 'inc') {
            containerEl = DOMstrings.incContainer;
            html = `<li id="inc-${id}" class="budget-list__item item item--income">
            <div class="item__title">${description}</div>
            <div class="item__right">
                <div class="item__amount">${formatNumber(value, type)}</div>
                <button class="item__remove">
                    <img
                        src="./img/circle-green.svg"
                        alt="delete"
                    />
                </button>
            </div>
        </li>`;
        } else if (type === 'exp') {
            containerEl = DOMstrings.expContainer;
            html = `<li id="exp-${id}" class="budget-list__item item item--expense">
            <div class="item__title">${description}</div>
            <div class="item__right">
                <div class="item__amount">
                ${formatNumber(value, type)}
                    <div class="item__badge">
                        <div class="item__percent badge badge--dark">
                            15%
                        </div>
                    </div>
                </div>
                <button class="item__remove">
                    <img src="./img/circle-red.svg" alt="delete" />
                </button>
            </div>
        </li>`;
        }

        document.querySelector(containerEl).insertAdjacentHTML('beforeend', html);
    };

    const deleteListItem = (id) => {
        document.getElementById(id).remove();
    };

    const clearFields = () => {
        const inputDesc = document.querySelector(DOMstrings.inputDescription);
        const inputVal = document.querySelector(DOMstrings.inputValue);
        inputDesc.value = '';
        inputVal.value = '';
        inputDesc.focus();
    };

    const updateBudget = ({budget, totalInc, totalExp, percentage}) => {
        let type = budget > 0 ? 'inc' : 'exp';

        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(budget, type);
        document.querySelector(DOMstrings.incLabel).textContent = formatNumber(totalInc, 'inc');
        document.querySelector(DOMstrings.expLabel).textContent = formatNumber(totalExp, 'exp');

        document.querySelector(DOMstrings.expPercentLabel).textContent = percentage > 0 ? `${percentage}%` : '--';
    };

    const updateItemsPercentages = (items) => {
        items.forEach((item) => {
            const el = document.querySelector(`#exp-${item[0]}`).querySelector('.item__percent');

            if (item[1] >= 0) {
                el.parentElement.style.display = 'block';
                el.textContent = item[1] + '%';
            } else {
                el.parentElement.style.display = 'none';
            }
        });
    };

    const displayMonth = () => {
        const now = new Date();
        const year = now.getFullYear();
        let month = now.getMonth();

        const monthArr = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ];

        month = monthArr[month];

        document.querySelector(DOMstrings.monthLabel).textContent = month;
        document.querySelector(DOMstrings.yearLabel).textContent = year;
    };

    return {
        getDomStrings() {
            return DOMstrings;
        },
        getFormData,
        renderListItem,
        clearFields,
        updateBudget,
        deleteListItem,
        updateItemsPercentages,
        displayMonth,
    };
})();
