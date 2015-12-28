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
                html += '<td><span>' + object[i].price + '</span> EGP</td>';
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
    $('body').delegate('.edit', 'click', function(e) {
        e.stopImmediatePropagation();
        var parent = $(this).parent().parent();
        var id = parent.attr('id');
        var object = database.getRow(id);

        $(this).text('Save');
        $(this).removeClass('btn-primary');
        $(this).removeClass('edit');
        $(this).addClass('btn-success');
        $(this).addClass('save');

        var name = parent.children().eq(1);
        var image = parent.children().eq(2);
        var price = parent.children().eq(3);
        var stock = parent.children().eq(4);
        //parent.children().eq(5).find('.delete').remove();

        name.html('<input type="text" class="form-control" value="'+ object.name +'">');
        image.html('<input type="text" class="form-control" value="'+ object.image +'">');
        price.html('<input type="text" style="width: 90px;" class="form-control" value="'+ object.price + '">');
        stock.html('<input type="number" style="width: 60px;" class="form-control" value="'+ object.stock +'">');

    });

    $('body').delegate('.save', 'click', function(e) {
        e.stopImmediatePropagation();
        var parent = $(this).parent().parent();
        var id = parent.attr('id');
        var object = database.getRow(id);

        $(this).text('Edit');
        $(this).addClass('btn-primary');
        $(this).addClass('edit');
        $(this).removeClass('btn-success');
        $(this).removeClass('save');

        var name = parent.children().eq(1);
        var image = parent.children().eq(2);
        var price = parent.children().eq(3);
        var stock = parent.children().eq(4);

        object.name = name.find('input').val();
        object.image = image.find('input').val();
        object.stock = stock.find('input').val();
        object.price = price.find('input').val();

        name.text(name.find('input').val());
        image.html('<img src="'+ image.find('input').val() + '" />');
        price.html('<span>' + price.find('input').val() + '</span> EGP');
        stock.text(stock.find('input').val());
    });
};

// subclass extends superclass
Admin.prototype = Object.create(Section.prototype);
Admin.prototype.constructor = Admin;
