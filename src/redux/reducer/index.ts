// 创建reducer
const initState = {
    count: 0
}

export const reducer = (state= initState,action:any) => {
    switch(action.type){
        case 'ADD':
            return {
                count: state.count + 1
            }
        default:
            return state
    }
}
