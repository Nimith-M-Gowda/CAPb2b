namespace project.sapcap;

using from '@sap/cds-common-content';
using {
    cuid,
    managed,
    Country
} from '@sap/cds/common';

entity Books : cuid, managed {
    title               : String;
    authorId_foreignKey : type of Authors : ID;
    author              : Association to Authors
                              on author.ID = authorId_foreignKey;
    stockCount          : Integer;
    price               : Integer
}

entity Authors : cuid {
    name         : String;
    placeOfBirth : Country;
    books        : Association to many Books
                       on books.author = $self
}

entity Orders : cuid {
    comment : String;
    Items   : Composition of many OrderItems
                  on Items.parent = $self;
}

@cds.autoexpose
entity OrderItems {
    key parent            : Association to Orders;
    key pos               : Integer;
        quantity          : Integer;
        bookId_foreignKey : type of Books : ID;
        book              : Association to Books
                                on book.ID = bookId_foreignKey
}


// QUIZ SERIVCE (Assignment Starts here)

entity Tests : cuid, managed {
    title       : String;
    description : String;
    questions   : Association to many Questions
                      on questions.test = $self
}


entity Questions : cuid {
    text    : String;
    test    : Association to one Tests;
    answers : Composition of one Answers

}

aspect Answers : cuid {
    text : String;
}
