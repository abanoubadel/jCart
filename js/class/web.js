var Website = function(database, cart) {
    Section.call(this); // call super constructor.
    this.id = 'website';

    this.generateHTML = function(object) {
        var html = '<div class="row">';
        for (var i = 0; i < object.length; ++i) {
            if (object[i].stock > 0) {
                html += '<div id="' + object[i].id + '" class="col-sm-6 col-md-3 product">';
                html += '<div class="thumbnail">';
                html += '<div class="image">';
                html += '<img src="' + object[i].image + '"/>';
                html += '</div>';
                html += '<div class="caption">';
                html += '<h3>' + object[i].name + '</h3>';
                html += '<p>' + object[i].price + ' EGP</p>';
                if (cart.isInCart(object[i].id)) {
                    html += '<p><a href="#" class="btn btn-success remove_from_cart" role="button">Remove from cart</a></p>';
                } else {
                    html += '<p><a href="#" class="btn btn-default add_to_cart" role="button">Add to cart</a></p>';
                }
                html += '</div>';
                html += '</div>';
                html += '</div>';
            }
        };
        html += '</div>';
        return html;
    };

    this.clearHTML = function() {
        this.setSelector('');
        this.selection.empty();
    };

    this.loadData(database);
    this.clearHTML();
    this.append('', this.generateHTML(this.data));

    $('.product').delegate('.add_to_cart', 'click', function(e) {
        e.preventDefault();
        var id = $(this).parents('.product').attr('id');
        cart.add(database.getRow(id));
        //console.log(cart.products);
        $(this).removeClass('btn-default');
        $(this).removeClass('add_to_cart');
        $(this).addClass('btn-success');
        $(this).addClass('remove_from_cart');
        $(this).text('Remove from cart');
    });

    $('.product').delegate('.remove_from_cart', 'click', function(e) {
        e.preventDefault();
        var id = $(this).parents('.product').attr('id');
        cart.remove(id);
        console.log(cart.products);
        $(this).removeClass('btn-success');
        $(this).removeClass('remove_from_cart');
        $(this).addClass('btn-default');
        $(this).addClass('add_to_cart');
        $(this).text('Add to cart');
    });
};

// subclass extends superclass
Website.prototype = Object.create(Section.prototype);
Website.prototype.constructor = Website;
