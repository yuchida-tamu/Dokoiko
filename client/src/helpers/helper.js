//Takes two objects that have data property
export const compareByDate = (a, b) => {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  if (a.date === b.date) return 0;
};

// {
//   id: 'defaultId',
//     username: 'testUsername',
//     firstName: 'test',
//     lastName: 'user',
//     email: 'test@example.com',
//     password: 'testPassword',
//     plans: [...visitingEvents],
//     favorite_places: [],
//     favorite_events: [],
// }
const planReducer = (places, events) => {
  const pArray = places.map(place => {
    return {
      ...place,
      isPlace: true,
    };
  });

  const eArray = events.map(event => {
    return {
      ...event,
      isPlace: false,
    };
  });

  return [...pArray, ...eArray];
};

export const userReducer = (user, isLogged) => {
  const data = {
    id: user._id,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    password: user.password,
    plans: [...planReducer(user.visiting_places, user.visiting_events)],
    favorite_places: [...user.favorite_places],
    favorite_events: [...user.favorite_events],
    isLogged,
  };
  return data;
};
