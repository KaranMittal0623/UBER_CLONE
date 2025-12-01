import React, { createContext, useState } from 'react'


export const UserDataContext = createContext()

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        password:'',
        fullname: {
            firstname: '',
            lastname: ''
        }
    })

    return (
        <>
            {/* To provide the data globally */}
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </>
    )
}

export default UserContext