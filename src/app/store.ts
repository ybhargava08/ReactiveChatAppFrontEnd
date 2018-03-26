import { MessageBean } from './messagebean';
import { UPDATE_CHAT_MSG_LIST, UPDATE_JOINED_LIST, UPDATE_LEFT_LIST, ADD_TYPED_LIST, REMOVE_TYPED_LIST, ONLINE_USER_LIST } from './actions';

export interface IAppState {
   listchatmsgbeans: MessageBean[];
   listjoined: MessageBean[];
   listLeft: MessageBean[];
   typedList: MessageBean[];
   onlineUserList: MessageBean[];
}

export const INITIAL_STATE = {
     listchatmsgbeans: [],
     listjoined: [],
     listLeft: [],
     typedList: [],
     onlineUserList: [],
};

export function rootReducer(state , action) {
    switch (action.type) {
         
         case UPDATE_CHAT_MSG_LIST: 
             return Object.assign({}, state, {
                listchatmsgbeans : state.listchatmsgbeans.concat(Object.assign({}, action.msgbeanpayload))
            });
        case UPDATE_JOINED_LIST: 
             return Object.assign({}, state, {
                listjoined : state.listjoined.concat(Object.assign({}, action.msgbeanpayload))
            });
        case UPDATE_LEFT_LIST: 
             return Object.assign({}, state, {
                listLeft : state.listLeft.concat(Object.assign({}, action.msgbeanpayload))
            });
        case ADD_TYPED_LIST:
            const foundBeanIndex = state.typedList.findIndex(msgbean => msgbean.uniqueId === action.msgbeanpayload.uniqueId);
            if (foundBeanIndex >= 0) {
                 const foundBean = state.typedList[foundBeanIndex];
                return Object.assign({}, state, {
                   typedList: [
                     ...state.typedList.slice(0, foundBeanIndex),
                     Object.assign({}, foundBean, {
                          typedTime: action.msgbeanpayload.typedTime               
                     }),
                     ...state.typedList.slice(foundBeanIndex + 1)
                    ],
                });
            } 
            return Object.assign({}, state, {
                     typedList: state.typedList.concat(Object.assign({}, action.msgbeanpayload))       
            });
        
        case REMOVE_TYPED_LIST:
           return Object.assign({}, state, {
              typedList: state.typedList.filter(msgbean => (Date.now() - msgbean.typedTime < action.keepAliveTime))
           });
        case ONLINE_USER_LIST: 
          return Object.assign({}, state, {
             onlineUserList: action.msgbeanpayload.userstats.sort()
          });
    }
    return state;
}
