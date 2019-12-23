import PetAppContext  from "./appContext";
import DetailsPage from "./js/components/container/DetailsPage";
import React from 'react';

function App() {
    return (
        <PetAppContext.Provider value={colors}>
            <DetailsPage />
        </PetAppContext.Provider>
    );
}