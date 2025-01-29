import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';
// Base Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const userSession = await AsyncStorage.getItem('userSession');
    if (userSession) {
      const { token } = JSON.parse(userSession); 
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    const errorMessage =
      error.response?.data?.message || 'An error occurred. Please try again later.';
    return Promise.reject(new Error(errorMessage));
  }
);
// Create a user
export const createUser = async (username, email, password) => {
  try {
    const response = await api.post('/users', { username, email, password });

    const newUser = response.data;
    await AsyncStorage.setItem('userSession', JSON.stringify(newUser));

    return newUser;
  } catch (error) {
    console.error('Error fetching events by user ID:', error.message);
    throw error;
  }
};


export async function signIn(email, password) {
  try {
    const response = await api.get('/users');
    const users = response.data;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    await AsyncStorage.setItem('userSession', JSON.stringify(user));

    return user;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to sign in. Please try again.'
    );
  }
}

export async function getCurrentUser() {
  try {
    const session = await AsyncStorage.getItem('userSession');

    if (session) {
      return JSON.parse(session);
    } else {
      throw new Error('No user session found');
    }
  } catch (error) {
    console.log('Error fetching current user:', error);
    return null;
  }
}

export async function signOut() {
  try {
    await AsyncStorage.removeItem('userSession');
  } catch (error) {
    console.error('Error during sign-out:', error);
    throw new Error('Failed to sign out. Please try again.');
  }
}

export const getEventDetails = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch event details');
  }
};

//fetch latest events
export const getLatestEvents = async () => {
  try {
    const response = await api.get('/events');
    const events = response.data;

    const sortedEvents = events
      .sort((a, b) => new Date(b.date) - new Date(a.date)) 
      .slice(0, 7);

    return sortedEvents;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch latest events');
  }
};

export const getEventsByUserId = async (id) => {
  try {
    const userResponse = await api.get(`/users/${id}`);
    const user = userResponse.data;

    if (!user.registeredEvents || user.registeredEvents.length === 0) {
      return [];
    }

    const eventPromises = user.registeredEvents.map((eventId) =>
      api.get(`/events/${eventId}`)
    );
    const events = await Promise.all(eventPromises);

    return events.map((response) => response.data);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch registered events");
  }
};

export const searchEvents = async (query) => {
  try {
    const response = await api.get('/events');
    return response.data.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to search events');
  }
};

export const getAllEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch events');
  }
};
/////////////////////////////////////

// Fetch a single user by ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};

// Create an event
export const createEvent = async (title, description) => {
  try {
    const response = await api.post('/events', { title, description });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create event');
  }
};

export const getEventById = async (title) => {
  try {
    const response = await api.get(`/events/${title}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch event');
  }
};


//Case Sensitive

// export const searchEvents = async (query) => {
//   try {
//     const response = await api.get('/events', {
//       params: {
//         title_like: query, // MockAPI's _like query for substring matching
//       },
//     });

//     return response.data; // Return matching events
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to search events');
//   }
// };

//get events created by this user_Id
// export const getEventsByUserId = async (userId) => {
//   try {
//     const response = await api.get('/events', {
//       params: {
//         creatorId: userId, // Filter events by creatorId
//       },
//     });

//     return response.data; // Return matching events
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to fetch user events');
//   }
// };




export default api;
