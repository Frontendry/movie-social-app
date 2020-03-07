class MoviesAnalyzer {
  constructor(movies, users) {
    this.movies = movies;
    this.users = users;
  }

  topRatedMoviesAmongFriends(userId) {
    // TODO: Implement
    let users = this.users;
    let movies = this.movies;

    // Same Rating Check
    const sameRatingCheck = arr => {
      let sortFn = (a, b) => {
        if (a.movierating == b.movierating) {
          return 1;
        }

        return 0;
      };

      return arr.sort(sortFn);
    };

    // Get friends for the user id
    let friends = users.filter(user => user.userId === userId)[0].friends;

    // Get the movies that friends have rated
    let friendsRatedMovies = movies

      // Filtering movies that have been rated by friends
      .filter(movie =>
        movie.ratings.find(rating => friends.includes(rating.userId))
      )

      // Getting titles and ratings only using object destructuring
      .map(({ title, ratings }) => ({
        ratings,
        title
      }));

    // Get movie ratings for friends only
    let friendsOnlyRatings = friendsRatedMovies.map(friendsRatedMovie => {
      let title = friendsRatedMovie.title;
      let ratings = friendsRatedMovie.ratings.filter(rating =>
        friends.includes(rating.userId)
      );

      return { title, ratings };
    });

    // Get Average Ratings for the friends
    let averageMovieRatings = friendsOnlyRatings.map(averageMovieRating => {
      let title = averageMovieRating.title;
      let movieratingFriends = averageMovieRating.ratings.length;
      let movierating =
        averageMovieRating.ratings.reduce((prev, curr, index, array) => {
          return prev + curr.rating;
        }, 0) / movieratingFriends;

      return { title, movierating };
    });

    // Sort average ratings in descending order
    let sortAverageRatings = [...averageMovieRatings].sort(
      (a, b) => b.movierating - a.movierating
    );

    // Get the first 3 movies
    let topThreeMovies = sortAverageRatings.slice(0, 3);

    // Get the first 3 movies by their titles only
    let topThreeMovieTitles = sameRatingCheck(topThreeMovies).map(
      movie => movie.title
    );

    return topThreeMovieTitles;
  }
}

const jsonfile = {
  movies: [
    {
      title: "The Shawshank Redemption",
      duration: "PT142M",
      actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      ratings: [
        { userId: 7001, rating: 8 },
        { userId: 9250, rating: 9 },
        { userId: 34139, rating: 8 }
      ],
      favorites: [66380, 7001, 9250, 34139],
      watchlist: [15291, 51417, 62289, 6146, 71389, 93707]
    },
    {
      title: "The Godfather",
      duration: "PT175M",
      actors: ["Marlon Brando", "Al Pacino", "James Caan"],
      ratings: [
        { userId: 15291, rating: 9 },
        { userId: 51417, rating: 9 },
        { userId: 7001, rating: 9 },
        { userId: 9250, rating: 7 },
        { userId: 71389, rating: 9 }
      ],
      favorites: [15291, 51417, 7001, 9250, 71389, 93707],
      watchlist: [62289, 66380, 34139, 6146]
    },
    {
      title: "The Dark Knight",
      duration: "PT152M",
      actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      ratings: [
        { userId: 15291, rating: 8 },
        { userId: 7001, rating: 9 },
        { userId: 9250, rating: 6 },
        { userId: 34139, rating: 7 },
        { userId: 93707, rating: 7 }
      ],
      favorites: [15291, 7001, 9250, 34139, 93707],
      watchlist: [51417, 62289, 6146, 71389]
    },
    {
      title: "Schindler's List",
      duration: "PT195M",
      actors: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
      ratings: [
        { userId: 62289, rating: 8 },
        { userId: 66380, rating: 5 },
        { userId: 6146, rating: 6 },
        { userId: 71389, rating: 7 }
      ],
      favorites: [62289, 66380, 6146, 71389],
      watchlist: [15291, 51417, 7001, 9250, 93707]
    },
    {
      title: "Pulp Fiction",
      duration: "PT154M",
      actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
      ratings: [
        { userId: 15291, rating: 10 },
        { userId: 51417, rating: 9 },
        { userId: 62289, rating: 9 },
        { userId: 66380, rating: 9 },
        { userId: 71389, rating: 8 },
        { userId: 93707, rating: 10 }
      ],
      favorites: [15291, 51417, 62289, 66380, 71389, 93707],
      watchlist: [7001, 9250, 34139, 6146]
    },
    {
      title: "The Lord of the Rings: The Return of the King",
      duration: "PT201M",
      actors: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
      ratings: [
        { userId: 62289, rating: 3 },
        { userId: 66380, rating: 5 },
        { userId: 34139, rating: 6 },
        { userId: 6146, rating: 7 },
        { userId: 71389, rating: 7 }
      ],
      favorites: [62289, 66380, 34139, 6146, 71389, 93707],
      watchlist: [15291, 51417, 7001, 9250, 34139, 6146, 71389, 93707]
    }
  ],
  users: [
    {
      userId: 15291,
      email: "Constantin_Kuhlman15@yahoo.com",
      friends: [7001, 51417, 62289]
    },
    {
      userId: 7001,
      email: "Keven6@gmail.com",
      friends: [15291, 51417, 62289, 66380]
    },
    {
      userId: 51417,
      email: "Margaretta82@gmail.com",
      friends: [15291, 7001, 9250]
    },
    {
      userId: 62289,
      email: "Marquise.Borer@hotmail.com",
      friends: [15291, 7001]
    },
    {
      userId: 9250,
      email: "Brant16@gmail.com",
      friends: [66380, 51417]
    },
    {
      userId: 66380,
      email: "Douglas_Lubowitz61@hotmail.com",
      friends: [7001, 9250]
    },
    {
      userId: 34139,
      email: "Norwood52@gmail.com",
      friends: [6146, 93707]
    },
    {
      userId: 6146,
      email: "Van_Schiller@hotmail.com",
      friends: [93707, 71389, 34139]
    },
    {
      userId: 71389,
      email: "Jonas_Russel88@yahoo.com",
      friends: [6146, 93707]
    },
    {
      userId: 93707,
      email: "Orion_Mertz@hotmail.com",
      friends: [6146, 34139, 71389]
    }
  ],
  testSuiteIDs: [15291, 7001, 51417, 62289]
};

const { movies, users } = jsonfile;

const analyzer = new MoviesAnalyzer(movies, users);

console.log(analyzer.topRatedMoviesAmongFriends(7001));
