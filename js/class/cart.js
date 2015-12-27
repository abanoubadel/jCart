/**
 * Cart object
 */
var Cart = function() {
    var self = this;
    this.products = [];
    this.number = 0;
    /**
     * Add object to cart
     * @param {object} product object
     */
    this.add = function(object) {
        object.quantity = 1;
        this.products.push(object);
        this.updateCartCounter();
    };
    /**
     * Remove object from cart
     * @param  {int} id
     */
    this.remove = function(id) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                this.products.splice(i, 1);
                break;
            }
        };
        this.updateCartCounter();
    };

    this.update = function(id, object) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                this.products[i] = object;
                break;
            }
        };
    };

    this.getObject = function(id) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                return this.products[i];
            }
        };
    };

    this.getNumber = function() {
        return this.products.length;
    };

    this.updateCartCounter = function() {
        $('.cart .number').text(self.products.length);
    };

    this.isInCart = function(id) {
        var found = false;
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                found = true;
                break;
            }
        };
        return found;
    };

    this.clearCart = function(){
        this.products = [];
    };
};
