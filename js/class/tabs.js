/**
 * Tabs Object to switch between layouts
 */
var Tabs = function() {
    // self variable is the same as this, just to use it inside jquery functions
    var self = this;
    this.class = 'content';
    // default page
    this.active = 'website';
    // website sections (admin, website, checkout)
    this.sections = $('.' + this.class).children('section');
    // aside tabs
    this.tabs = $('.list-group-item');

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
    /**
     * Change layout based on specified input
     * @param  {string} section 
     */
    this.switchTo = function(section) {;
        $('#' + this.active).fadeOut();
        $('#' + section).fadeIn();
        this.active = section;
    };
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
};
