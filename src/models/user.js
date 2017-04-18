
export default {
  namespace: 'user',
  state: {
    id:'id',
    username:'username',
    nickname:'nickname',
    password:'password',
    phone:'phone',
    email:'email',
    location:'location',
    age:'age',
    sex:'sex',
    addTime:'addTime',
  },
  reducers: {
    login(state,username,password ){
     const  newUsername = state.username;
      const newPassword = state.password;
      console.log(state.username);
      return{...state,
        username:newUsername+'a',
        password:newPassword,
      };
    },
  },
  effects: {},
  subscriptions: {},
};
