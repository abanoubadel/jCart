/**
 * Section abstract object
 */
var Section = function() {
    // Section Id
    var self = this;
    this.id = 'section';
    this.selector = '#' + this.id;
    this.selection = $(this.selector);
};
/**
 * Load data from database object
 */
Section.prototype.loadData = function(database) {
    this.data = [];
    database.queryInit();
    while (database.isThereData()) {
        this.data.push(database.getData());
    };
};
/**
 * Append string to an element
 * @param  {string} selector
 * @param  {string} string
 */
Section.prototype.append = function(selector, string) {
    this.setSelector(selector);
    this.selection.append(string);
};
/**
 * Set selector inside admin section, so it can be used through 'this.selection'
 * @param {selector} string
 */
Section.prototype.setSelector = function(selector) {
    this.selector = '#' + this.id;
    this.selector += ' ' + selector;
    this.selection = $(this.selector);
};
/**
 * Generate html from object
 * @param  {object} | {array}
 * @return {string} html
 */
Section.prototype.generateHTML = function(object) {};

Section.prototype.clearHTML = function() {};

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
