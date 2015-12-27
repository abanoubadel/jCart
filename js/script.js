var main = function() {
    // self variable is the same as this, just to use it inside jquery functions
    var self = this;

    var database = new Database();

    var cart = new Cart();

    this.class = 'content';
    // default page
    this.active = 'website';
    // website sections (admin, website, checkout)
    this.sections = $('.' + this.class).children('section');
    // aside tabs
    this.tabs = $('.list-group-item');
    /**
     * Change layout based on specified input
     * @param  {string} section 
     */
    this.switchTo = function(section) {
        $('#' + this.active).fadeOut();
        $('#' + section).fadeIn();
        // set current active sections
        this.active = section;
        this.makeInstance(this.active);
        // console.log(this.code);
    };
    /**
     * 
     */
    this.makeInstance = function(section) {
        // make first letter capital, because of naming convention
        section = section.capitalizeFirstLetter();
        // use the string as a variable
        // this act like var website = new Website();
        // way to make the code more abstract
        this.code = eval(section);
        this.section = new this.code(database, cart);
    };

    this.init = function() {
        this.sections.each(function() {
            if ($(this).attr('id') != self.active) {
                $(this).hide();
            }
            // console.log($(this).attr('id'));
        });

        this.tabs.each(function() {
            var href = $(this).attr('href');
            href = href.replace('#', '');
            if (href == self.active) {
                $(this).addClass('active');
            }
        });

        this.makeInstance(this.active);
    };

    this.init();
    /**
     * Tabs click listener
     */
    $('.list-group-item').click(function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        href = href.replace('#', '');
        self.switchTo(href);
        $('.list-group-item.active').removeClass('active');
        $(this).addClass('active');
    });
}();