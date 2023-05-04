import {
    createCampaign,
    dashboard,
    logout,
    payment,
    profile,
    withdraw,
    planet4,
    planet7,
} from "../assets";

export const navlinks = [{
        name: "Campaign Dashboard",
        imgUrl: dashboard,
        link: "/cf",
    },
    {
        name: "Music Player",
        imgUrl: payment,
        link: "/mp",
        // disabled: true,
    },
    {
        name: "Create Campaign",
        imgUrl: createCampaign,
        link: "/cf/create-campaign",
    },

    // {
    //     name: 'Withdraw',
    //     imgUrl: withdraw,
    //     link: '/',
    //     disabled: true,
    // },
    {
        name: "Profile Campaigns",
        imgUrl: profile,
        link: "/cf/profile",
    },
    {
        name: "Disconnect Wallet",
        imgUrl: logout,
        // link: '/',
        // disabled: true,
    },
];

export const musicNavlinks = [{
        name: "Discover",
        imgUrl: dashboard,
        link: "/mp",
    },
    {
        name: "Crowd Funding",
        imgUrl: payment,
        link: "/cf",
    },
    {
        name: "Profile",
        imgUrl: profile,
        link: "/mp/profile",
    },
    {
        name: "Logout",
        imgUrl: logout,
        // link: '/',
        // disabled: true,
    },
    // {
    //     name: 'Around You',
    //     imgUrl: createCampaign,
    //     link: '/mp/around-you',
    // },

    // {
    //     name: 'Top Artists',
    //     imgUrl: withdraw,
    //     link: '/mp/top-artists',
    // disabled: true,
    // },
];

export const exploreWorlds = [{
        id: "world-1",
        imgUrl: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWMlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        title: "Search your Mood",
        p: "Discover new music with our search based ai engine",
    },
    {
        id: "world-2",
        imgUrl: planet4,
        title: "Enter MetaTunes",
        p: "Enter the new age world of Music, Songs, ...",
        link: "/mp",
    },
    {
        id: "world-3",
        imgUrl: planet7,
        title: "Enter Crowd Funding",
        p: "Support your favourite artists/creators with eth in goerli testnet",
        link: "/cf",
    },
    {
        id: "world-4",
        imgUrl: "https://images.unsplash.com/photo-1637597384338-61f51fa5cb07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWV0YW1hc2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        title: "Safety of MetaMask",
        p: "Your funds are safe with Metamask, we do not track your funds",
    },
];

// export const exploreWorlds = [{
//         id: 'world-1',
//         imgUrl: '../assets/planet-01.png',
//         title: 'The Hogwarts',
//     },
//     {
//         id: 'world-2',
//         imgUrl: '../assets/planet-02.png',
//         title: 'The Upside Down',
//     },
//     {
//         id: 'world-3',
//         imgUrl: '/planet-04.png',
//         title: 'Kadirojo Permai',
//     },
//     {
//         id: 'world-4',
//         imgUrl: '/planet-07.png',
//         title: 'Paradise Island',
//     },
// ];