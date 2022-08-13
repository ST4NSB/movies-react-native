import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MoviesMain from "../screens/moviesMain";
import MovieDetails from "../screens/movieDetails";
import MovieComments from "../screens/movieComments";
import Login from "../screens/login";

const screens = {
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Log In",
    },
  },
  MoviesMain: {
    screen: MoviesMain,
    navigationOptions: {
      title: "Movies",
      headerLeft: () => null,
      gestureEnabled: false,
    },
  },
  MovieDetails: {
    screen: MovieDetails,
    navigationOptions: {
      title: "Movie",
    },
  },
  MovieComments: {
    screen: MovieComments,
    navigationOptions: {
      title: "Movie Comments",
    },
  },
};

const MovieStack = createStackNavigator(screens);
export default createAppContainer(MovieStack);
