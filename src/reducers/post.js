const initialState = {
    posts: {},
  };
  
  let postReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "ALL_POSTS":
        return payload;
  
      case "NEW_POST":
        const { post } = payload;       
        return {  ...state , post };
  
      case "DELETE_POST":
        const { delePost } = payload;
        return { posts: state.posts.filter((el) => el._id !== delePost) };

      case "UPDATE_POST":
        const { updPost } = payload;
        return { posts: state.posts.map((el) => el._id == updPost) };
        
  
      default:
        return state;
    }
  };
  
  export default postReducer;
  
  export const getPost = (data) => {
    return {
      type: "ALL_POSTS",
      payload: data,
    };
  };
  
  export const newPost = (data) => {
    return {
      type: "NEW_POST",
      payload: data,
    };
  };


  export const delPost = (data) => {
    return {
      type: "DELETE_POST",
      payload: {deletepost: data._id },
    };
  };

  export const UpdatePost = (data) => {
   
    return {
      type: "UPDATE_POST",
      payload: {Updpost: data._id },
    };
  };
  