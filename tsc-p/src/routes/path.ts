/*


All path go here

*/

export const paths = {
  Base: "/api/v1",
  user: {
    Base: "/user",
    register: {
      Post: ["/register"],
    },
    login: {
      Post: ["/login"],
    },
    dashboard:{
      Get:["/dashboard"]
    }

  },
};
