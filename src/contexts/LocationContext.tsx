import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState
} from 'react'

type Location = {
    isModal: boolean,
    location: string
};

type LocationContextValue = {
    location: Location;
    setLocation: Dispatch<SetStateAction<Location>>;
};

const LocationContext = createContext<LocationContextValue>({
    location: {
        isModal: false,
        location: '/'
    },
    setLocation: () => null
})

export const LocationProvider: React.FC = ({children}) => {
    const [location, setLocation] = useState({
        isModal: false,
        location: '/'
    });

    return (
        <LocationContext.Provider value={{location, setLocation}}>
            {children}
        </LocationContext.Provider>
    )
}

export const useLocation = () => {
    const {location} = useContext(LocationContext);
    return location;
}

export const useSetLocation = () => {
    const {setLocation} = useContext(LocationContext);
    return () => 
        setLocation((location) => ({...location, isModal: !location.isModal, location: '/pokemon'}))
}