export default function (state={name:'Before Redux'},action) {

  switch(action.type)
  {
    case'ACTION_PENGDING':return{
      ...state,
      name:'Loading...'
    }

    case 'ACTION_FULFILLED':return{
      ...state,
      name:'After Redux'
    }

    default:
      return state
  }


}