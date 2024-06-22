interface AuthState {
  expire: string;
  id: number;
  roleId: number;
  token: string;
  username: string;
}
let initUser:AuthState = {
  expire: '',
  id: 0,
  roleId: 0,
  token: '',
  username: ''
}
// 数据持久化
const localValue = localStorage.getItem("user")
if (localValue == null) {
  initUser =  {
    expire: '',
    id: 0,
    roleId: 2, // 用户
    token: '',
    username: ''
  }
} else {
  initUser = JSON.parse(localValue)
}

export const authReducer = (state = initUser, action: any) => {
  switch (action.type) {
    case 'setUser':
      // console.log(action.payload);
      localStorage.setItem("user",JSON.stringify(action.payload))
      return {
        ...state,
        ...action.payload
      }

    case 'clearUser':
      return initUser;
    default:
      return state
  }
}
