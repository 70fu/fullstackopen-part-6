const initialFilter = '';

export const setFilter = (filter) => {
  return {
    type:'CHANGE_FILTER',
    payload:filter
  }
}

const filterReducer = (state=initialFilter, action) => {
  switch(action.type){
  case 'CHANGE_FILTER':{
    return action.payload;
  }
  default:
    return state;
  }
}

export default filterReducer;