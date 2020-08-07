var paging = angular.module("tableOptions", []);

paging.directive("sorting", ["$filter", function ($filter) {
    return {
        restrict: "A",
        replace: true,
        template: "<th ng-click=\"updateSorting(sorting)\">{{sortingText}}" +
            "<i class=\"fa pull-right text-muted\" ng-class=\"sortType ? 'fa-sort-asc':'fa-sort-desc'\" style=\"margin: 3px 0 0 10px;\"></i>" +
            "</th>",
        scope: {
            sorting: "@",
            sortingText: "@",
            sortingModel: "=",
            sortingAction: "&"
        },
        link: function (scope, element) {
            scope.sortType = false;

            element.css("cursor", "pointer");

            scope.updateSorting = function (orderByOn) {
                scope.sortType = !scope.sortType;
                var orderType = $filter("orderType")(scope.sortType);

                var orderByOnFixer = orderByOn.replace(/\b[a-z]/g, function (letter) {
                    return letter.toUpperCase();
                });

                scope.sortingModel.orderBy = [orderByOnFixer + " " + orderType];

                scope.sortingAction();
            }
        }
    }
}]);

paging.directive("paging", function () {


    /**
     * The regex expression to use for any replace methods
     * Feel free to tweak / fork values for your application
     */
    var regex = /\{page\}/g;


    /**
     * The angular return value required for the directive
     * Feel free to tweak / fork values for your application
     */
    return {

        // Restrict to elements and attributes
        restrict: 'EA',

        // Assign the angular link function
        link: fieldLink,

        // Assign the angular directive template HTML
        template: fieldTemplate,

        // Assign the angular scope attribute formatting
        scope: {
            page: '=',
            pageSize: '=',
            total: '=',
            disabled: '@',
            dots: '@',
            ulClass: '@',
            activeClass: '@',
            disabledClass: '@',
            adjacent: '@',
            pagingAction: '&',
            pgHref: '@',
            textFirst: '@',
            textLast: '@',
            textNext: '@',
            textPrev: '@',
            textFirstClass: '@',
            textLastClass: '@',
            textNextClass: '@',
            textPrevClass: '@',
            textTitlePage: '@',
            textTitleFirst: '@',
            textTitleLast: '@',
            textTitleNext: '@',
            textTitlePrev: '@'
        }

    };


    /**
     * Link the directive to enable our scope watch values
     *
     * @param {object} scope - Angular link scope
     * @param {object} el - Angular link element
     * @param {object} attrs - Angular link attribute
     */
    function fieldLink(scope, el, attrs) {

        // Hook in our watched items
        scope.$watchCollection('[page,pageSize,total,disabled]', function () {
            build(scope, attrs);
        });
    }


    /**
     * Create our template html 
     * We use a function to figure out how to handle href correctly
     * 
     * @param {object} el - Angular link element
     * @param {object} attrs - Angular link attribute
     */
    function fieldTemplate(el, attrs) {
        return '<ul data-ng-hide="Hide" data-ng-class="ulClass" ng-if="List.length > 1"> ' +
            '<li class="btn btn-info btn-sm"' +
                'title="صفحه اول"> ' +
                    '<a class="text-white"' +
                        (attrs.pgHref ? 'data-ng-href="{{List[0].pgHref}}" ' : 'href ') +
                        'data-ng-click="List[0].action()"> ' +
                        '<small>صفحه اول</small>' +
                    '</a> ' +
            '</li>' +
            '<li class="btn btn-info btn-sm"' +
                'title="{{Item.title}}" ' +
                'data-ng-class="Item.liClass" ' +
                'data-ng-repeat="Item in List"> ' +
                    '<a class="text-white"' +
                        (attrs.pgHref ? 'data-ng-href="{{Item.pgHref}}" ' : 'href ') +
                        'data-ng-class="Item.aClass" ' +
                        'data-ng-click="Item.action()" ' +
                        'data-ng-bind="Item.value">' +
                    '</a> ' +
            '</li>' +
            '<li class="btn btn-info btn-sm"' +
                'title="صفحه آخر"> ' +
                    '<a class="text-white"' +
                        (attrs.pgHref ? 'data-ng-href="{{List[List.length - 1].pgHref}}" ' : 'href ') +
                        'data-ng-click="List[List.length - 1].action()"> ' +
                        '<small>صفحه آخر</small>' +
                    '</a> ' +
            '</li>' + '</ul>'
    }


    /**
     * Assign default scope values from settings
     * Feel free to tweak / fork these for your application
     *
     * @param {Object} scope - The local directive scope object
     * @param {Object} attrs - The local directive attribute object
     */
    function setScopeValues(scope, attrs) {

        scope.List = [];
        scope.Hide = false;

        scope.page = parseInt(scope.page) || 1;
        scope.total = parseInt(scope.total) || 0;
        scope.adjacent = parseInt(scope.adjacent) || 2;

        scope.pgHref = scope.pgHref || '';
        scope.dots = scope.dots || '...';

        scope.ulClass = scope.ulClass || 'pagination';
        scope.activeClass = scope.activeClass || 'active';
        scope.disabledClass = scope.disabledClass || 'disabled';

        scope.textFirst = scope.textFirst || '<<';
        scope.textLast = scope.textLast || '>>';
        scope.textNext = scope.textNext || '>';
        scope.textPrev = scope.textPrev || '<';

        scope.textFirstClass = scope.textFirstClass || '';
        scope.textLastClass = scope.textLastClass || '';
        scope.textNextClass = scope.textNextClass || '';
        scope.textPrevClass = scope.textPrevClass || '';

        scope.textTitlePage = scope.textTitlePage || 'Page {page}';
        scope.textTitleFirst = scope.textTitleFirst || 'First Page';
        scope.textTitleLast = scope.textTitleLast || 'Last Page';
        scope.textTitleNext = scope.textTitleNext || 'Next Page';
        scope.textTitlePrev = scope.textTitlePrev || 'Previous Page';

        scope.hideIfEmpty = evalBoolAttribute(scope, attrs.hideIfEmpty);
        scope.showPrevNext = evalBoolAttribute(scope, attrs.showPrevNext);
        scope.showFirstLast = evalBoolAttribute(scope, attrs.showFirstLast);
        scope.scrollTop = evalBoolAttribute(scope, attrs.scrollTop);
        scope.isDisabled = evalBoolAttribute(scope, attrs.disabled);
    }


    /**
     * A helper to perform our boolean eval on attributes
     * This allows flexibility in the attribute for strings and variables in scope
     * 
     * @param {Object} scope - The local directive scope object
     * @param {Object} value - The attribute value of interest
     */
    function evalBoolAttribute(scope, value) {
        return angular.isDefined(value)
            ? !!scope.$parent.$eval(value)
            : false;
    }


    /**
     * Validate and clean up any scope values
     * This happens after we have set the scope values
     *
     * @param {Object} scope - The local directive scope object
     * @param {int} pageCount - The last page number or total page count
     */
    function validateScopeValues(scope, pageCount) {

        // Block where the page is larger than the pageCount
        if (scope.page > pageCount) {
            scope.page = pageCount;
        }

        // Block where the page is less than 0
        if (scope.page <= 0) {
            scope.page = 1;
        }

        // Block where adjacent value is 0 or below
        if (scope.adjacent <= 0) {
            scope.adjacent = 2;
        }

        // Hide from page if we have 1 or less pages
        // if directed to hide empty
        if (pageCount <= 1) {
            scope.Hide = scope.hideIfEmpty;
        }
    }


    /**
     * Assign the method action to take when a page is clicked
     *
     * @param {Object} scope - The local directive scope object
     * @param {int} page - The current page of interest
     */
    function internalAction(scope, page) {

        // Block clicks we try to load the active page
        if (scope.page == page) {
            return;
        }

        // Block if we are forcing disabled 
        if (scope.isDisabled) {
            return;
        }

        // Update the page in scope
        scope.page = page;

        // Pass our parameters to the paging action
        scope.pagingAction({
            page: scope.page,
            pageSize: scope.pageSize,
            total: scope.total
        });

        // If allowed scroll up to the top of the page
        if (scope.scrollTop) {
            scrollTo(0, 0);
        }
    }


    /**
     * Add the first, previous, next, and last buttons if desired
     * The logic is defined by the mode of interest
     * This method will simply return if the scope.showPrevNext is false
     * This method will simply return if there are no pages to display
     *
     * @param {Object} scope - The local directive scope object
     * @param {int} pageCount - The last page number or total page count
     * @param {string} mode - The mode of interest either prev or last
     */
    function addPrevNext(scope, pageCount, mode) {

        // Ignore if we are not showing
        // or there are no pages to display
        if ((!scope.showPrevNext && !scope.showFirstLast) || pageCount < 1) {
            return;
        }

        // Local variables to help determine logic
        var disabled, alpha, beta;

        // Determine logic based on the mode of interest
        // Calculate the previous / next page and if the click actions are allowed
        if (mode === 'prev') {

            disabled = scope.page - 1 <= 0;
            var prevPage = scope.page - 1 <= 0 ? 1 : scope.page - 1;

            if (scope.showFirstLast) {
                alpha = {
                    value: scope.textFirst,
                    title: scope.textTitleFirst,
                    aClass: scope.textFirstClass,
                    page: 1
                };
            }

            if (scope.showPrevNext) {
                beta = {
                    value: scope.textPrev,
                    title: scope.textTitlePrev,
                    aClass: scope.textPrevClass,
                    page: prevPage
                };
            }

        } else {

            disabled = scope.page + 1 > pageCount;
            var nextPage = scope.page + 1 >= pageCount ? pageCount : scope.page + 1;

            if (scope.showPrevNext) {
                alpha = {
                    value: scope.textNext,
                    title: scope.textTitleNext,
                    aClass: scope.textNextClass,
                    page: nextPage
                };
            }

            if (scope.showFirstLast) {
                beta = {
                    value: scope.textLast,
                    title: scope.textTitleLast,
                    aClass: scope.textLastClass,
                    page: pageCount
                };
            }

        }

        // Create the Add Item Function
        var buildItem = function (item, disabled) {
            return {
                title: item.title,
                aClass: item.aClass,
                value: item.aClass ? '' : item.value,
                liClass: disabled ? scope.disabledClass : '',
                pgHref: disabled ? '' : scope.pgHref.replace(regex, item.page),
                action: function () {
                    if (!disabled) {
                        internalAction(scope, item.page);
                    }
                }
            };
        };

        // Force disabled if specified
        if (scope.isDisabled) {
            disabled = true;
        }

        // Add alpha items
        if (alpha) {
            var alphaItem = buildItem(alpha, disabled);
            scope.List.push(alphaItem);
        }

        // Add beta items
        if (beta) {
            var betaItem = buildItem(beta, disabled);
            scope.List.push(betaItem);
        }
    }


    /**
     * Adds a range of numbers to our list
     * The range is dependent on the start and finish parameters
     *
     * @param {int} start - The start of the range to add to the paging list
     * @param {int} finish - The end of the range to add to the paging list
     * @param {Object} scope - The local directive scope object
     */
    function addRange(start, finish, scope) {

        // Add our items where i is the page number
        var i = 0;
        for (i = start; i <= finish; i++) {

            var pgHref = scope.pgHref.replace(regex, i);
            var liClass = scope.page == i ? scope.activeClass : '';

            // Handle items that are affected by disabled
            if (scope.isDisabled) {
                pgHref = '';
                liClass = scope.disabledClass;
            }


            scope.List.push({
                value: i,
                title: scope.textTitlePage.replace(regex, i),
                liClass: liClass,
                pgHref: pgHref,
                action: function () {
                    internalAction(scope, this.value);
                }
            });
        }
    }


    /**
     * Add Dots ie: 1 2 [...] 10 11 12 [...] 56 57
     * This is my favorite function not going to lie
     *
     * @param {Object} scope - The local directive scope object
     */
    function addDots(scope) {
        scope.List.push({
            value: scope.dots,
            liClass: scope.disabledClass
        });
    }


    /**
     * Add the first or beginning items in our paging list
     * We leverage the 'next' parameter to determine if the dots are required
     *
     * @param {Object} scope - The local directive scope object
     * @param {int} next - the next page number in the paging sequence
     */
    function addFirst(scope, next) {

        addRange(1, 2, scope);

        // We ignore dots if the next value is 3
        // ie: 1 2 [...] 3 4 5 becomes just 1 2 3 4 5
        if (next != 3) {
            addDots(scope);
        }
    }


    /**
     * Add the last or end items in our paging list
     * We leverage the 'prev' parameter to determine if the dots are required
     *
     * @param {int} pageCount - The last page number or total page count
     * @param {Object} scope - The local directive scope object
     * @param {int} prev - the previous page number in the paging sequence
     */
    // Add Last Pages
    function addLast(pageCount, scope, prev) {

        // We ignore dots if the previous value is one less that our start range
        // ie: 1 2 3 4 [...] 5 6  becomes just 1 2 3 4 5 6
        if (prev != pageCount - 2) {
            addDots(scope);
        }

        addRange(pageCount - 1, pageCount, scope);
    }



    /**
     * The main build function used to determine the paging logic
     * Feel free to tweak / fork values for your application
     *
     * @param {Object} scope - The local directive scope object
     * @param {Object} attrs - The local directive attribute object
     */
    function build(scope, attrs) {

        // Block divide by 0 and empty page size
        if (!scope.pageSize || scope.pageSize <= 0) {
            scope.pageSize = 1;
        }

        // Determine the last page or total page count
        var pageCount = Math.ceil(scope.total / scope.pageSize);

        // Set the default scope values where needed
        setScopeValues(scope, attrs);

        // Validate the scope values to protect against strange states
        validateScopeValues(scope, pageCount);

        // Create the beginning and end page values
        var start, finish;

        // Calculate the full adjacency value
        var fullAdjacentSize = (scope.adjacent * 2) + 2;


        // Add the Next and Previous buttons to our list
        addPrevNext(scope, pageCount, 'prev');

        // If the page count is less than the full adjacnet size
        // Then we simply display all the pages, Otherwise we calculate the proper paging display
        if (pageCount <= (fullAdjacentSize + 2)) {

            start = 1;
            addRange(start, pageCount, scope);

        } else {

            // Determine if we are showing the beginning of the paging list
            // We know it is the beginning if the page - adjacent is <= 2
            if (scope.page - scope.adjacent <= 2) {

                start = 1;
                finish = 1 + fullAdjacentSize;

                addRange(start, finish, scope);
                addLast(pageCount, scope, finish);
            }

                // Determine if we are showing the middle of the paging list
                // We know we are either in the middle or at the end since the beginning is ruled out above
                // So we simply check if we are not at the end
                // Again 2 is hard coded as we always display two pages after the dots
            else if (scope.page < pageCount - (scope.adjacent + 2)) {

                start = scope.page - scope.adjacent;
                finish = scope.page + scope.adjacent;

                addFirst(scope, start);
                addRange(start, finish, scope);
                addLast(pageCount, scope, finish);
            }

                // If nothing else we conclude we are at the end of the paging list
                // We know this since we have already ruled out the beginning and middle above
            else {

                start = pageCount - fullAdjacentSize;
                finish = pageCount;

                addFirst(scope, start);
                addRange(start, finish, scope);
            }
        }

        // Add the next and last buttons to our paging list
        addPrevNext(scope, pageCount, 'next');
    }

});

paging.directive("searching", function () {
    return {
        restrict: "A",
        template: "<div class=\"search-filters\" click-off=\"filterOn = false\">" +
            "<button id=\"doFilter\" ng-click=\"filterOn = !filterOn\" class=\"btn btn-default pull-right main-btn\"><i class=\"fa fa-filter\"></i></button>" +
            "<label for=\"doFilter\" class=\"pull-right\">جستجو در جدول</label>" +
            "<form name=\"form\">" +
            "<div class=\"panel panel-default\" ng-if=\"filterOn\">" +
                "<div class=\"panel-heading\">" +
                    "<div class=\"panel-title\">" +
                      "<div class=\"row\">" +
                        "<div class=\"col-md-8\"><h4>جستجو</h4></div>" +
                        "<div class=\"col-md-4\">" +
                            "<button class=\"btn btn-sm pull-left\" ng-click=\"reset()\" uib-tooltip=\"حذف فیلتر\" tooltip-placement=\"right\" tooltip-append-body=\"true\">" +
                                "<i class=\"fa fa-retweet\"></i>" +
                            "</button>" +
                            "</div>" +
                        "</div>" +
                   "</div>" +
                "</div>" +
                "<div class=\"panel-body\">" +
                    "<ul class=\"list-group\">" +
                        "<li class=\"list-group-item\" ng-repeat=\"filter in searching\">" +
                            "<input type=\"text\" class=\"form-control\" ng-if=\"filter.type == 'text'\" ng-model=\"filtering[filter.name]\" placeholder=\"{{filter.title}}\">" +
                            "<label ng-if=\"filter.type == 'select'\" for=\"select_{{$index}}_option\">{{filter.title}}</label>" +
                            "<select id=\"select_{{$index}}_option\" class=\"form-control\" ng-if=\"filter.type == 'select'\" ng-model=\"filtering[filter.name]\" ng-options=\"option.value as option.name for option in filter.options\"></select>" +
                        "</li>" +
                        "<li class=\"list-group-item btns\">" +
                            "<button class=\"btn btn-info\" ng-click=\"filterModel.condition = 'OR'\">یا</button>" +
                            "<button class=\"btn btn-info\" ng-click=\"filterModel.condition = 'AND'\">و</button>" +
                        "</li>" +
                    "</ul>" +

                "</div>" +
                "<div class=\"panel-footer\">" +
                    "<button class=\"btn btn-primary btn-block\" ng-click=\"search()\">جستجو کن</button>" +
                "</div>" +
                "</form>" +
            "</div>" +
            "</div>",
        scope: {
            searching: "=",
            filterModel: "=",
            searchAction: "&"
        },
        link: function (scope, element) {
            element.append("<style type=\"text/css\">.search-filters {position: relative;}.search-filters .main-btn {margin: 15px 0 15px 15px;}.search-filters label {margin-top: 20px;cursor: pointer;}.search-filters .panel {position: absolute;width: 100%;margin-top: 50px;z-index: 50;}.search-filters .panel .panel-body {padding: 0;}.search-filters .panel .panel-body ul {padding: 0;margin: 0;}.search-filters .panel .panel-body ul li {border-radius: 0;border-left-width: 0;border-right-width: 0;padding: 0;}.search-filters .panel .panel-body ul li:first-child {border-top-width: 0;}.search-filters .panel .panel-body ul li:last-child {border-bottom-width: 0;}.search-filters .panel .panel-body ul li input.form-control {border-radius: 0;border: none;padding: 25px 15px;box-shadow: none;}.search-filters .panel .panel-body ul li input.form-control:focus {box-shadow: none;}.search-filters .panel .panel-body ul li label {padding: 0 15px 0 0;margin: 0;font-weight: normal;color: #888;}.search-filters .panel .panel-body ul li select.form-control {border-radius: 0;box-shadow: none;border: none;}.search-filters .panel .panel-footer {padding: 0;overflow: hidden;}.search-filters .panel .panel-footer button.btn {border-radius: 0;padding: 15px 0;}.search-filters .panel ul li.list-group-item.btns button.btn{border-radius: 0;width: 50%!important;}</style>");

            scope.filtering = {};

            scope.search = function () {
                scope.filterModel.where = "";
                angular.forEach(scope.searching, function (field, index) {
                    var fieldName = field.name;
                    var fieldNameFixer = fieldName.replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });

                    var value = scope.filtering[field.name];
                    var condition = "";
                    var setWhere = "";

                    if (angular.isUndefinedOrNull(value)) {
                        value = "";
                    }

                    if (index + 1 === scope.searching.length) {
                        condition = "";
                    } else {
                        condition = scope.filterModel.condition;
                    }

                    if (angular.isNumber(value)) {
                        setWhere = fieldNameFixer + "==" + value;
                    } else {
                        setWhere = fieldNameFixer + '.Contains("' + value + '") ';
                    }

                    scope.filterModel.where += setWhere + condition + ' ';
                });

                scope.filterOn = false;

                scope.searchAction();
            }

            scope.reset = function () {
                scope.filtering = {};
                scope.filterModel.where = "";
                scope.searchAction();
                scope.filterOn = false;
            }
        }
    }
});

paging.directive("clickOff", function ($parse, $document) {
    var dir = {
        compile: function ($element, attr) {
            // Parse the expression to be executed
            // whenever someone clicks _off_ this element.
            var fn = $parse(attr["clickOff"]);
            return function (scope, element, attr) {
                // add a click handler to the element that
                // stops the event propagation.
                element.bind("click", function (event) {
                    event.stopPropagation();
                });
                angular.element($document[0].body).bind("click", function (event) {
                    scope.$apply(function () {
                        fn(scope, { $event: event });
                    });
                });
            };
        }
    };
    return dir;
});

paging.filter("orderType", function () {
    return function (type) {
        switch (type) {
            case true:
                return "Asc";
            case false:
                return "Desc";
        }
    }
});

angular.isUndefinedOrNull = function (val) {
    return angular.isUndefined(val) || val === "" || val === null;
}
