export const setGameDetail = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_GAME_DETAIL',
            payload: {
                gameDetail: data
            }
        })
    }
}