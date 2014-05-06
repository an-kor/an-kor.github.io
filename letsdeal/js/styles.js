var Styles = {
    defaultFontSize: 25,
    footer: {
        bgColor: '#4abad3',
        bgColorHover: '#3aa2bc',
        borderTop: '#5bcce9',
        borderColor1: '#389ab4',
        borderColor2: '#5bcce9',
        fontSize: 20,
        height: 85
    },
    topMenu: {
        bgColor: 'rgba(62,172,200,0.95)',
        backButtonWith: 240,
        shareButtonWith: 80,
        borderBottom: '2px solid #e1e1e1',
        height: 85,
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white'
    },
    hScroller: {
        bgColor: '#edebe6',
        numberOfPages: 0,
        numberOfImages: (T.isIPad?6:10)
    },
    searchItem: {
        bgColor: '#edebe6',
        bgColorHover: '#f8f5f0'
    },
    dealInfo: {
        bottomHeight: 166,
        content: {
            title: {
                fontSize: 40,
                fontFamily: "source-sans-pro, 'avenir', sans-serif",
                fontWeight: 'normal',
                color: '#333333',
                lineHeight: 1.3,
                paddingTop: 12,
                paddingBottom: 25
            }
        },
        bottom: {
            height: 185,
            firstLineBgColor: 'white',
            secondLineBgColor: '#6e6d6c',
            firstLineHeight: 125,
            oldPrice: {
                padding: 20,
                fontSize: 32,
                fontFamily: 'source-sans-pro',
                color: '#8e8e8e'
            },
            newPrice: {
                padding: 18,
                fontFamily: 'source-sans-pro',
                fontSize: 54,
                fontWeight: 'bold',
                color: '#e14427'
            },
            countdown: {
                fontSize: 28,
                color: 'white'
            },
            bought: {
                fontSize: 28,
                color: 'white'
            },
            buyBtn: {
                height: 85,
                width: 270,
                fontSize: 52,
                fontWeight: 'bold',
                borderRadius: 5,
                bgColor: '#48c55c',
                bgColorLight: '#57d86b',
                bgColorHover: '#38aa43',
                color: 'white'
            }
        }
    },
    transitionTime: 700
};
