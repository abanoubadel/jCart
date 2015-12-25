/**
 * Database object, resposible for storing, manipulating the data
 */
var Database = function() {
    var dataCounter = 0;
    this.data = [{
        id: 1,
        name: 'Need For Speed Reboot',
        image: 'images/nfs.jpg',
        stock: 8,
        price: 400
    }, {
        id: 2,
        name: 'Batman Arkham Knight',
        image: 'images/batman.jpg',
        stock: 20,
        price: 600
    }, {
        id: 3,
        name: 'FIFA 16',
        image: 'images/fifa.jpg',
        stock: 5,
        price: 350
    }, {
        id: 4,
        name: 'Pro Evolution Soccer 2016',
        image: 'images/pes.jpg',
        stock: 7,
        price: 350
    }, {
        id: 5,
        name: 'Assassns Creed Syndicate',
        image: 'images/ac.jpg',
        stock: 17,
        price: 550
    }, {
        id: 6,
        name: 'Call of Duty Black Ops III',
        image: 'images/cod.jpg',
        stock: 20,
        price: 490
    }];

    this.getLastId = function() {
        var id;
        if (this.data.length > 0) {
            id = this.data[this.data.length - 1].id;
        } else {
            id = 0;
        }
        return id;

    };

    this.insert = function(object) {
        var id = this.getLastId();
        object.id = ++id;
        this.data.push(object);
    };

    this.update = function(id, object) {
        for (var i = 0; i < this.data.length; ++i) {
            if (this.data[i].id == id) {
                this.data = object;
                break;
            }
        };
    };

    this.delete = function(id) {
        for (var i = 0; i < this.data.length; ++i) {
            if (this.data[i].id == id) {
                this.data.splice(i, 1);
                break;
            }
        };
    };

    this.getData = function() {
        return this.data[dataCounter++];
    };

    this.isThereData = function() {
        return dataCounter < this.data.length;
    };

    this.queryInit = function() {
        dataCounter = 0;
    };
};
