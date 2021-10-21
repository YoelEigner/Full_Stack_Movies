
const appReducer = (state = { user: [], movies: [], users: [], permissions : [], isAuthenticated: false, genres : [], subs : [], members : [] }, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, user: action.payload };
    case "MOVIES":
      return { ...state, movies: action.payload };
    case "USERS":
      return { ...state, users: action.payload };
    case "AUTH":
      return { ...state, isAuthenticated: action.payload };
    case "GENRES":
      return { ...state, genres: action.payload };
    case "MEMBERS":
      return { ...state, members: action.payload };
    case "SUBS":
      return { ...state, subs: action.payload };
    case "PERMISSIONS":
      return { ...state, permissions: action.payload };
    default:
      return state;
  }
};

export default appReducer;
