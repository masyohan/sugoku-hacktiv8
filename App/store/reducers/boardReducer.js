const initialState = {
    board: [],
    solution: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'GET_BOARD':
            return {...state, board: action.payload.board}
        case 'GET_SOLUTION':
            return {...state, solution: action.payload.solution}
        case 'RESET_SOLUTION':
            return {...state, solution: []}
        default:
            return state;
    }
}