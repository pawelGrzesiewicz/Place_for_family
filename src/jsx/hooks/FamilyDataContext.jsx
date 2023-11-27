import React, { createContext, useContext, useState } from 'react';

const FamilyDataContext = createContext(null);

export const FamilyDataProvider = ({ children }) => {
    const [familyData, setFamilyData] = useState(null);

    const updateFamilyData = (newData) => {
        setFamilyData(newData);
    };

    return (
        <FamilyDataContext.Provider value={{ familyData, updateFamilyData }}>
            {children}
        </FamilyDataContext.Provider>
    );
};

export const useFamilyData = () => {
    const context = useContext(FamilyDataContext);
    if (!context) {
        throw new Error('useFamilyData must be used within a FamilyDataProvider');
    }
    return context;
};