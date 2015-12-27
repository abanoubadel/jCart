/**
 * Checkout page Object
 */
var Checkout = function(database, cart) {
    Section.call(this); // call super constructor.
    this.id = 'checkout';
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
                html += '<td><img src="' + object[i].image + '"/></td>';
                html += '<td>' + object[i].name + '</td>';
                html += '<td>';
                html += '<button class="btn btn-default btn-xs minus"><i class="fa fa-minus"></i></button>';
                html += '<span class="quantity">' + object[i].quantity + '</span>';
                html += '<button class="btn btn-default btn-xs plus"><i class="fa fa-plus"></i></button>';
                html += '</td>';
                html += '<td>' + object[i].price + ' EGP</td>';
                html += '<td><button class="btn btn-danger delete" type="submit">Delete</button></td>';
                html += '</tr>';
            };
        }
        return html;
    };
    /**
     * Remove table content
     */
    this.clearHTML = function() {
        this.setSelector('table tbody');
        this.selection.empty();
    };
    /**
     * Delete specific table row from table
     * @param  {string} selector
     */
    this.deleteRow = function(selector) {
        this.setSelector(selector);
        this.selection.remove();
    };

    this.clearHTML();
    this.append('table tbody', this.generateHTML(cart.products));
    /**
     * Click event for plus button, using delegate event handler from jquery
     * to apply it for future created elements
     * What I'm doing here is :
     *     1- Get row id form html
     *     2- Get object matching that id form cart.products
     *     3- Get current quantity value then increase it
     *     4- Update html with new value
     *     5- Update object in cart.products
     * Updating cart.products is very important, to save values when switching to 
     * another page 
     */
    $('#' + this.id).delegate('.plus', 'click', function() {
        // Get element id
        var id = $(this).parent().parent().attr('id');
        // Get equivalent cart object
        var cart_object = cart.getObject(id);
        // Get html element
        var quantity_element = $(this).parent().find('span');

        if (cart_object.stock > cart_object.quantity) {
            quantity_element.text(++cart_object.quantity);
        }
        // console.log(cart.products);
    });

    $('#' + this.id).delegate('.minus', 'click', function() {
        var id = $(this).parent().parent().attr('id');
        // Get equivalent cart object
        var cart_object = cart.getObject(id);
        // Get html element
        var quantity_element = $(this).parent().find('span');

        if (cart_object.quantity > 0) {
            quantity_element.text(--cart_object.quantity);
        }
    });

};

// subclass extends superclass
Checkout.prototype = Object.create(Section.prototype);
Checkout.prototype.constructor = Checkout;
