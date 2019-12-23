import React from 'react';

let body = {
    location: 95050,
    animal: "DOG",
    breed: "LABRADOR" ,
    age: 5
};

const PetAppContext = React.createContext(body);

export default PetAppContext;