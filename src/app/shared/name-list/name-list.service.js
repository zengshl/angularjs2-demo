/**
 * This class provides the NameList service with methods to
 * read names and add names.
 */
var NameListService = (function () {
    function NameListService() {
        /**
         * The array of initial names provided by the service.
         * @type {Array}
         */
        this.names = [
            'Edsger Dijkstra',
            'Donald Knuth',
            'Alan Turing',
            'Grace Hopper'
        ];
    }
    /**
     * Returns the array of names.
     * @return {string[]} the array of names
     */
    NameListService.prototype.get = function () {
        return this.names;
    };
    /**
     * Adds the given name to the array of names.
     * @param {string} value the name to add
     */
    NameListService.prototype.add = function (value) {
        this.names.push(value);
    };
    return NameListService;
})();
exports.NameListService = NameListService;
//# sourceMappingURL=name-list.service.js.map