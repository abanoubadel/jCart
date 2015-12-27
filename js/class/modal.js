/**
 * Modal Object is resposible for creating, manipulating Popup modal based on Bootstrap framework
 * for more information check : http://getbootstrap.com/javascript/#modals
 * 
 * @param {int} id
 * @param {string} title
 * @param {string} content [may be html]
 * @param {string} btn [confirm button in the popup]
 * @param {function} callback [function will be executed after pressing confirm]
 * 
 */
var Modal = function(id, title, content, btn, callback) {
    var self = this;
    this.id = id;
    this.title = title;
    this.content = content;
    // Buttons that will be at the bottom of popup
    this.btns = [
        '<button type="button" class="btn btn-default close_' + btn + '" data-dismiss="modal">Close</button>',
        '<button type="button" class="btn btn-primary confirm_' + btn + '">' + btn + '</button>'
    ];

    // Variable containes the header div of modal
    this.header = '<div class="modal-header">';
    this.header += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    this.header += '<h4 class="modal-title" id="' + this.id + 'Label">' + this.title + '</h4>';
    this.header += '</div>';
    // Variable containes the body div of modal
    this.body = '<div class="modal-body">';
    this.body += this.content;
    this.body += '</div>';
    // Variable containes the footer div of modal
    this.footer = ' <div class="modal-footer">';
    for (var i = 0; i < this.btns.length; ++i) {
        this.footer += this.btns[i];
    };
    this.footer += '</div>';
    /**
     * Genreate Modal HTML
     * @return {string}
     */
    this.generateHTML = function() {
        var html = '';
        html += '<div class="modal fade" id="' + this.id + '" tabindex="-1" role="dialog" aria-labelledby="' + this.id + 'Label">';
        html += '<div class="modal-dialog" role="document">';
        html += '<div class="modal-content">';
        html += this.header;
        html += this.body;
        html += this.footer;
        html += '</div>';
        html += '</div>';
        html += '</div>';
        return html;
    };
    /**
     * Insert Modal html string at the end of body
     * @param {string} input is html string
     */
    this.appendToDom = function(string) {
        $('body').append(string);
        // Activating Modal
        $('#' + this.id).modal();
        // Add confirm button listener ( in our case confirm is delete button)
        $('.confirm_' + btn).on('click', callback);
        $('.close_' + btn).on('click', function() {
            self.hide();
        });
        $('#' + this.id).on('hidden.bs.modal', function() {
            self.delete();
        });
    };
    /**
     * Delete Modal form body
     */
    this.delete = function() {
        $('#' + this.id).remove();
        $('.modal-backdrop').remove();
    };

    this.hide = function() {
        $('#' + this.id).modal('hide');
    };

    this.appendToDom(this.generateHTML());
};
