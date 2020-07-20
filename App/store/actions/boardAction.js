const baseURL = "https://sugoku.herokuapp.com";

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export const getBoard = (level = 'easy') => {
    return async (dispatch) => {
        const fetchBoard = await fetch(`${baseURL}/board?difficulty=${level}`);
        const { board } = await fetchBoard.json();
        dispatch({
            type: 'GET_BOARD',
            payload: {
                board
            }
        })
        dispatch({
            type: 'RESET_SOLUTION'
        })
    }
}

export const solveBoard = () => {
    return async (dispatch, getState) => {
        console.log(getState())
        const { board } = getState().boardReducer;
        const fetchSolution = await fetch(`${baseURL}/solve`, {
            method: 'POST',
            body: encodeParams({ board }),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        const { solution } = await fetchSolution.json()
        dispatch({
            type:'GET_SOLUTION',
            payload: {
                solution
            }
        })
    }
}