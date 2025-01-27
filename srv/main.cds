using project from '../db/schema';

@impl: 'srv/main.js'
service bookshop {
    // entity Books as select from project.sapcap.Books where stockCount > 20;
    entity Books     as projection on project.sapcap.Books actions {
                            // bound function
                            function getStockPrice()           returns Integer;
                            action   setPrice(price : Integer) returns Books;
                        }

    entity Authors   as projection on project.sapcap.Authors;
    function totalStockCount() returns Integer;
// unbound function
}

extend project.sapcap.Orders with {
    virtual urgency : Boolean;
}

@impl: 'srv/implementation/order.js'
service orderBooks {
    entity Orders    as projection on project.sapcap.Orders;
}

// QUIZ

extend project.sapcap.Tests with {
    virtual questionsCount : Integer;
}


@impl: 'srv/implementation/quiz.js'
service quiz {
    entity Tests     as projection on project.sapcap.Tests actions {
                            action setquestionsCount(questionsCount : Integer) returns Tests
                        }

    entity Questions as projection on project.sapcap.Questions
}
