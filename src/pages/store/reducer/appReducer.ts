export interface appReducerState{
  login: boolean
  username: string
  profile_info?: any
  profile: boolean
  task: boolean
  task_info?:any
  task_detail?:any
}

const initialState: appReducerState = {
  login:false,
  profile:false,
  username: '',
  task:false
}

export function reducer(state = initialState,action){
  switch(action.type){
    case "LOGOUT":
      return {
        ...state,
        login:false,
        username: action.payload
      }
    case "LOGIN":
      return{
        ...state,
        login:true,
        username: action.payload
      }
    case "PROFILE":
      return{
        ...state,
        profile: true,
        profile_info: action.payload
      }
    case "TASK":
      return{
        ...state,
        task:true,
        task_info: action.payload

      }
    case "TASKDETAIL":
      return{
        ...state,
        task:true,
        task_detail: action.payload
      }
    case "UpdateComplete":
      return{
        ...state,
        task_info: state.task_info.map((item)=>{
          if(action.payload.object==item.object){
            if(action.payload.complete){
              return {
                ...item,
                complete: "YES"
              }
            }
            else{
              return{
                ...item,
                complete: "NO"
              }
            }
          }
          return item;
        })

      }
      default: return state
  }
}
