/**
 * Admin page Object
 */
var Admin = function(database) {
    // self is a workaround to use 'this' inside jquery functions
    self = this;
    Section.call(this); // call super constructor.
    // console.log(this);
    this.id = 'admin';
    /**
     * Remove table content
     */
    this.clearHTML = function() {
        this.setSelector('table tbody');
        this.selection.empty();
    };
    /**
     * Generate html table row(s) of product object
     * @param  {object} | {array}
     * @return {string} html
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

    this.loadData(database);
    this.clearHTML();
    this.append('table tbody', this.generateHTML(this.data));
    /**
     * Add new product button event
     */
    $('.add').on("click", function() {
        $('.add_product').slideDown();
    });
    /**
     * Submit new product event
     */
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
        self.append('table tbody', self.generateHTML(product));
        // Hide the add form
        $('.add_product').slideUp();
        // Scroll down to the new row
        $('html, body').animate({
            scrollTop: $('body').height()
        }, 500);
    });
    /**
     * Delete product button event
     */
    $('body').delegate('.delete', 'click', function() {
        var id = $(this).parent().parent().attr('id');
        var name = $(this).parent().parent().children('td').eq(1).text();
        var modal = new Modal(
            'deleteModal', // html id
            'Confirm delete ...', //title
            name + ' will be deleted.', // content
            'Delete', // confirm btn
            function() { // callback function
                database.delete(id);
                self.deleteRow('#' + id);
                modal.hide();
            });
    });
    /**
     * Edit product button event
     */
    $('body').delegate('.edit', 'click', function() {
        var id = $(this).parent().parent().attr('id');

    });
};

// subclass extends superclass
Admin.prototype = Object.create(Section.prototype);
Admin.prototype.constructor = Admin;
