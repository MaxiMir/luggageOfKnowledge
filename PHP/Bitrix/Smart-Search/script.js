$(() => {
    // #@ SMART SEARCH Variables:
    const searchContainer = $('.search');
    const responseBlock = $('.tips-list');
    const searchInput = initSearchInput();

    // #@ SMART SEARCH:
    /**
     * #@ Search handler
     */
    $('.input-search').keyup(e => {
        const currElem = $(e.currentTarget);

        searchInput.delaySearch(currElem);
    });

    /**
     * #@ Close search
     */
    $('.popup_search .close').on('click', () => {
        searchInput.cleanSearchListAndHide();
    });

    /**
     * #@ Close search
     */
    $(document).on('click', e => {
        const isActiveResponseBlock = responseBlock.hasClass('active');

        if (isActiveResponseBlock) {
            const elemClicked = e.target;

            if (!searchContainer.is(elemClicked) && searchContainer.has(elemClicked).length === 0) {
                searchInput.cleanSearchListAndHide();
            }
        }
    });

    function initSearchInput() {
        let intervalID = null;
        const requestURL = '/ajax/search.php';
        const intervalTime = 1000;

        return {
            getOldValue: function () {
                return this.lastPhrase;
            },
            getNewValue: function () {
                return this.inputBlock.val()
            },
            isNeedUpdate: function () {
                return this.getOldValue() === this.getNewValue();
            },
            updateValue: function () {
                this.lastPhrase = this.getNewValue();
            },
            delaySearch: function (currElem) {
                this.inputBlock = currElem;

                if (intervalID && this.isNeedUpdate()) {
                    this.updateValue();
                }

                if (intervalID) {
                    return;
                }

                intervalID = setInterval(() => {
                    if (this.isNeedUpdate()) {
                        this.updateValue();
                        return;
                    }

                    clearInterval(intervalID);
                    intervalID = null;
                    const newValue = this.getNewValue();
                    this.generateResponseList(newValue);
                }, intervalTime);
            },
            generateResponseList: word => {
                if (!word.length) {
                    this.cleanSearchListAndHide();
                    return;
                }

                $.ajax({
                    url: requestURL,
                    data: {
                        q: word,
                        action: 'AJAX_SEARCH'
                    },
                    success: response => {
                        if (!response) {
                            this.cleanSearchListAndHide();
                            return;
                        }

                        responseBlock
                            .html(response)
                            .addClass('active')
                            .show();
                    }
                });
            },
            cleanSearchListAndHide: function () {
                if (!this.inputBlock) {
                    return;
                }

                responseBlock
                    .empty()
                    .removeClass('active')
                    .hide();
            }
        };
    }
});