export const useGetUserInfo = () => {
    try {
      // Attempt to parse the user information from local storage
      const { name, profilePhoto, userID, isAuth } = JSON.parse(localStorage.getItem('auth')) || {};
  
      // Return the parsed user information
      return { name, profilePhoto, userID, isAuth };
    } catch (error) {
      // Handle any errors that may occur during parsing
      console.error('Error parsing user information:', error);
  
      // Return default values or handle the error in an appropriate way
      return { name: null, profilePhoto: null, userID: null, isAuth: false };
    }
  };
  