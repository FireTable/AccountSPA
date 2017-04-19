
export default {
  namespace: 'information',
  state: {
    id:'id',
    title:'账',
    message:'message',
    logo:'logo',
    tip:'tip',
    version:'version',
  },
  reducers: {
    save(state,{payload:newData}){
      return{...state,
        ...newData
      };
    },
  },
  effects: {},
  subscriptions: {},
};
