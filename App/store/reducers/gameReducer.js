const initialState = {
    gameDetail: {
        username: '',
        level: '',
        time: null
    },
    history: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'SET_GAME_DETAIL':
            return {...state, gameDetail: action.payload.gameDetail}
        default:
            return state;

    }
}