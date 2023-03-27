import { Cartesian3 } from "cesium";
import { createContext } from "react";

const now = new Date();

//Initial State and Actions
export const initialState = {
    bookmarked: [
        {
            name: "Tokyo",
            desc: "幸福",
            pos: Cartesian3.fromDegrees(139.8148, 35.7142, 10 ),
            longitude: 139.8148,
            latitude: 35.7142,
            date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
            }:${now.getMinutes()}`,
            icon: "Yellow",
        },
        {
            name: "Los Angeles",
            desc: "City of the Angels",
            pos: Cartesian3.fromDegrees( -117.729, 34.457, 10.00 ),
            date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
            }:${now.getMinutes()}`,
            longitude: -117.729,
            latitude: 34.457,
            icon: "Yellow",
        },
        { 
            name: "Random address 01",
            desc: "",
            pos: Cartesian3.fromDegrees( -44.15768, 79.81873 ),
            date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
            }:${now.getMinutes()}`,
            longitude: -44.15768, 
            latitude: 79.81873,
            icon: "Yellow", 
        },
        { 
            name: "Random address 02",
            desc: "",
            pos: Cartesian3.fromDegrees( 113.81956, 6.95312 ),
            date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
            }:${now.getMinutes()}`,
            longitude: 113.81956, 
            latitude: 6.95312,
            icon: "Yellow",
        },
        { 
            name: "Random address 03",
            desc: "",
            pos: Cartesian3.fromDegrees( -93.22941, 18.00333 ),
            date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
            }:${now.getMinutes()}`,
            longitude: -93.22941, 
            latitude: 18.00333, 
            icon: "Red",
        },
        { 
            name: "Random address 4",
            desc: "",
            pos: Cartesian3.fromDegrees( 39.29730, -0.33400 ),
            date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
            }:${now.getMinutes()}`,
            longitude: 39.29730, 
            latitude: -0.33400, 
            icon: "Green",
        },
        { 
            name: "Random address 5",
            desc: "",
            pos: Cartesian3.fromDegrees( 166.07744, -10.22925 ),
            date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
            }:${now.getMinutes()}`,
            longitude: 166.07744, 
            latitude: -10.22925, 
            icon: "Green",
        },
        { 
            name: "Random address 6",
            desc: "",
            pos: Cartesian3.fromDegrees( 43.28109, -10.88357 ),
            date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
            }:${now.getMinutes()}`,
            longitude: 43.28109, 
            latitude: -10.88357, 
            icon: "Green",
        },
        { 
            name: "Random address 7",
            desc: "",
            pos: Cartesian3.fromDegrees( -57.31127, -24.59392 ),
            date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
            }:${now.getMinutes()}`,
            longitude: -57.31127, 
            latitude: -24.59392, 
            icon: "Green",
        },
        { 
            name: "Random address 8",
            desc: "",
            pos: Cartesian3.fromDegrees( 21.77757, -23.50661 ),
            date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
            }:${now.getMinutes()}`,
            longitude: 21.77757, 
            latitude: -23.50661, 
            icon: "Green",
        },
        { 
            name: "Random address 9",
            desc: "",
            pos: Cartesian3.fromDegrees( -98.52540, 47.31585 ),
            date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
            }:${now.getMinutes()}`,
            longitude: -98.52540, 
            latitude: 47.31585, 
            icon: "Yellow",
        }
    ],
    startBookMark: false,
    showHoverCoordinates: false,
    hoverCoordinates: {
        long: 0,
        lat: 0
    },
    showError: false,
    bookmarking: {
        name: "",
        desc: "",
        long: 0,
        lat: 0,
        alt: 0,
        icon: "Yellow",
    },
};

const actions = {
    UPDATE_BOOKMARKED: "UPDATE_BOOKMARKED",
    UPDATE_STARTBOOKMARK: "UPDATE_STARTBOOKMARK",
    UPDATE_SHOWHOVERCOORD: "UPDATE_SHOWHOVERCOORD",
    UPDATE_HOVERCOORDS: "UPDATE_HOVERCOORDS",
    UPDATE_SHOWERROR: "UPDATE_SHOWERROR",
    UPDATE_BOOKMARKING: "UPDATE_BOOKMARKING",
    CLEAR_BOOKMARKING: "CLEAR_BOOKMARKING",
};


// Reducer to handle actions
export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.UPDATE_BOOKMARKED:
            return {
                ...state,
                bookmarked: [
                    {
                        name: payload?.name,
                        desc: payload?.desc ? payload?.desc : "",
                        pos: Cartesian3.fromDegrees( parseFloat(payload?.long), parseFloat(payload?.lat), 10000.0),
                        date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
                        }:${now.getMinutes()}`,
                        longitude: payload?.long, 
                        latitude: payload?.lat, 
                        icon: payload?.icon,
                    },
                    ...state.bookmarked
                ]
            };
        case actions.UPDATE_STARTBOOKMARK:
            return {
                ...state,
                startBookMark: !(state.startBookMark)
            };
        case actions.UPDATE_SHOWHOVERCOORD:
            return {
                ...state,
                showHoverCoordinates: !(state.showHoverCoordinates)
            };
        case actions.UPDATE_HOVERCOORDS:
            return {
                ...state,
                hoverCoordinates: { long: payload?.long, lat: payload?.lat }
            };
        case actions.UPDATE_SHOWERROR:
            return {
                ...state,
                showError: payload?.value
            };
        case actions.UPDATE_BOOKMARKING: {
            switch (payload?.method) {
                case "name":
                    return {
                        ...state,
                        bookmarking: { ...state.bookmarking, name: payload?.value }
                    };
                case "desc":
                    return {
                        ...state,
                        bookmarking: { ...state.bookmarking, desc: payload?.value }
                    };
                case "long":
                    return {
                        ...state,
                        bookmarking: { ...state.bookmarking, long: payload?.value }
                    };
                case "lat":
                    return {
                        ...state,
                        bookmarking: { ...state.bookmarking, lat: payload?.value }
                    };
                case "alt":
                    return {
                        ...state,
                        bookmarking: { ...state.bookmarking, alt: payload?.value }
                    };
                case "icon":
                    return {
                        ...state,
                        bookmarking: { ...state.bookmarking, icon: payload?.value }
                    };
                default:
                    return { 
                        ...state,
                        bookmarking: {...state.bookmarking} 
                    }
            }
        }
        case actions.CLEAR_BOOKMARKING:
            return {
                ...state,
                bookmarking: {
                    name: "",
                    desc: "",
                    long: 0,
                    lat: 0,
                    alt: 0,
                    icon: "Yellow",
                }
            }
        default:
            return state;
    }
};

export const StateContext = createContext();
export const DispatchContext = createContext();