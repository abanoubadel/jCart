/**
 * Admin page Object
 */
var Admin = function(database) {
    // Section Id
    this.id = 'admin';
    this.selector = '#' + this.id;
    this.selection = $(this.selector);
    /**
     * Load data from database object
     */
    this.loadData = function() {
        this.data = [];
        database.queryInit();
        while (database.isThereData()) {
            this.data.push(database.getData());
        };
    };
    /**
     * Append string to an element
     * @param  {string} selector
     * @param  {string}	string
     */
    this.append = function(selector, string) {
        this.setSelector('table tbody');
        this.selection.append(string);
    };
    /**
     * Set selector name so it can be used through 'this.selection'
     * @param {selector} string
     */
    this.setSelector = function(selector) {
        this.selector = '#' + this.id;
        this.selector += ' ' + selector;
        this.selection = $(this.selector);
    };
    /**
     * Remove table content
     */
    this.emptyTable = function() {
        this.setSelector('table tbody');
        this.selection.empty();
    };
    /**
     * Generate table row(s) of product object
     * @param  {object} | {array}
     * @return {string}
     */
    this.generateHTML = function(object) {
        var html = '';
        if (object instanceof Array) {
            for (var i = 0; i < object.length; ++i) {
                html += '<tr id="' + object[i].id + '">';
                html += '<td>' + object[i].id + '</td>';
                html += '<td>' + object[i].name + '</td>';
                html += '<td><img src="' + object[i].image + '"/></td>';
                html += '<td>' + object[i].price + ' EGP</td>';
                html += '<td>' + object[i].stock + '</td>';
                html += '<td> <button class="btn btn-primary edit" type="submit">Edit</button> <button class="btn btn-danger delete" type="submit">Delete</button></td>';
                html += '</tr>';
            };
        } else {
            html += '<tr id="' + object.id + '">';
            html += '<td>' + object.id + '</td>';
            html += '<td>' + object.name + '</td>';
            html += '<td><img src="' + object.image + '"/></td>';
            html += '<td>' + object.price + ' EGP</td>';
            html += '<td>' + object.stock + '</td>';
            html += '<td> <button class="btn btn-primary edit" type="submit">Edit</button> <button class="btn btn-danger delete" type="submit">Delete</button></td>';
            html += '</tr>';
        }
        return html;
    };
    /**
     * Delete specific table row from table
     * @param  {string} selector
     */
    this.deleteRow = function(selector) {
        this.setSelector(selector);
        this.selection.remove();
    };
    /**
     * @param  {[type]}
     * @return {[type]}
     */
    this.editRow = function(selector) {
        this.setSelector(selector);
        // this.selection.
    };

    this.loadData();
    this.append('table tbody', this.generateHTML(this.data));

    $('.add').on("click", function() {
        $('.add_product').slideDown();
    });
    $('.add_product form').on("submit", function(e) {
        // To stop button
        e.preventDefault();
        // Get product name
        var name = $('#product_name').val();
        // Get product image path
        var image = $('#product_image').val();
        // Get product price
        var price = $('#product_price').val();
        // Get product quntity
        var stock = $('#product_quantity').val();
        // Generate product object
        var product = {
            name: name,
            image: image,
            stock: stock,
            price: price
        };
        // Insert object to database object
        database.insert(product);
        // Generate HTML format of product object, then append it to page
        admin.append('table tbody', admin.generateHTML(product));
        // Hide the add form
        $('.add_product').slideUp();
        // Scroll down to the new row
        $('html, body').animate({
            scrollTop: $('body').height()
        }, 500);
    });
    $('body').delegate('.delete', 'click', function() {
        var id = $(this).parent().parent().attr('id');
        var modal = new Modal(
            'deleteModal',
            'Are you sure ?',
            '#' + id + ' will be deleted.',
            function() {
                database.delete(id);
                admin.deleteRow('#' + id);
                modal.delete();
            });
        modal.appendToDom(modal.generateHTML());
    });
    $('body').delegate('.edit', 'click', function() {
        var id = $(this).parent().parent().attr('id');
    });
};
