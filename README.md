<div align="center">

  <h3 align="center">Video Sharing App</h3>

   <div align="center">
     Thia is a demo video of how the <a href="https://drive.google.com/file/d/1GSmHnbb9evPbsQby43lecEfkL0ux8CTz/view?usp=sharing" target="_blank"><b>EventX</b></a> app works. I hope you enjoy it!
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Project Overview](#projectoverview)
2. 🔋 [Features](#features)
3. ⚙️ [Technologies Used](#technologies-used)
4. 🤸 [Prerequisites](#prerequisites)
5. 🕸️ [Setup Instructions](#setup-instructions)
6. 🕸️ [Snippets](#snippets)
7. 🔗 [Running the Application](#running-the-application)
8. 🚀 [API Integration](#api-integration)
9. 🚀 [Bonus Features](#bonus-features)
10. 🚀 [Links](#links)
11. 🚀 [Project Structure](#project-structure)
12. 🚀 [Future Improvements](#future-improvements)


## <a name="projectoverview">🤖 Project Overview</a>

The Event Booking App is a lightweight mobile app that:

Allows users to sign up or log in.
Displays a list of events fetched from an API.
Shows detailed information about each event, including available spots, capacity, and price.
Enables users to register for events and view registered events on a dashboard.

## <a name="features">⚙️ Features</a>


1. User Authentication:
        Sign Up and Login functionality.

2. Event Listings:
        View events with details like title, date, location, price, and an image.

3. Event Details:
        Displays additional information about the selected event.
        A "Register" button to join events.

4. User Dashboard:
        Lists all events the user has registered for.

5. Responsive Design:
        Optimized for various screen sizes.

6. Error Handling:
        Handles API errors gracefully with user-friendly feedback.

## <a name="technologies-used">🔋 Technologies Used</a>

👉 React Native: Framework for building mobile apps.

👉 Expo: For development, building, and deployment.

👉 React Navigation: Navigation between screens.

👉 Redux: State management.

👉 mockAPI: Backend API simulation.

👉 TailwindCSS: For styling.

## <a name="prerequisites">🤸 Prerequisites</a>

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- A code editor (e.g., Visual Studio Code)
- A mobile device.

## <a name="setup-instructions">🤸 Setup Instructions</a>

Follow these steps to set up the project locally on your machine.


**Cloning the Repository**

```bash
git clone https://github.com/AgHard/EventX.git
cd EventX
```
**Installation**

Install the project dependencies using npm:

```bash
npm install
```
Or, if you use Yarn:

```bash
yarn install
```

**Set up your environment variables**

Add the following content to the .env file

```bash
API_BASE_URL=https://your-mockapi-url.mockapi.io
```
Replace https://your-mockapi-url.mockapi.io with your actual mockAPI URL.

**Running the Project**

Start the Expo development server:

```bash
npx expo start --clear
```

**Expo Go**

Download the [Expo Go SDK version 52](https://expo.dev/go) app onto your device, then use it to scan the QR code from Terminal and run.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>tailwind.config.js</code></summary>

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

</details>

<details>
<summary><code>Font Loaded</code></summary>

```javascript
const [fontsLoaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }
```

</details>

<details>
<summary><code>Get Events from the API</code></summary>

```javascript
export const getAllEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch events');
  }
};
```

</details>

## <a name="running-the-application">🔗 Running the Application</a>

1. After starting the Expo development server, scan the QR code using the Expo Go app on your mobile device.

## <a name="api-integration">🔗 API Integration</a>

This app uses mockAPI to simulate backend services. Here are the endpoints utilized:

1. User Authentication:

      Sign Up: POST /users

      Login: GET /users?email=:email&password=:password

2. Event Listings:

      Get All Events: GET /events

      Get Event Details: GET /events/:id

3. User Dashboard:

      Registered Events: GET /users/:userId/registeredEvents

## <a name="bonus-features">🔗 Bonus Features</a>

1. Redux for State Management:

      Global state management for user authentication and event data.

2. Error Handling:

      Displays error messages when API requests fail.

      Errors are dismissible by users.

3. Pull-to-Refresh:

      Allows users to manually refresh event data.

## <a name="links">🔗 Links</a>

Assets and constants used in the project can be found [here](https://drive.google.com/drive/folders/1pckq7VAoqZlmsEfYaSsDltmQSESKm8h7?usp=sharing)

## <a name="project-structure">🔗 Project Structure</a>

Here's an overview of the project's folder structure:

event-booking-app/

├── components/

│   ├── FormField.js

│   ├── ImageCard.js

│   ├── SearchInput.js

│   ├── Trending.js

│   ├── CustomButton.js

│   └── EmptyState.js

├── constants/

│   ├── images.js

│   ├── icons.js

│   └── theme.js

├── lib/

│   ├── api.js

│   ├── useApi.js

│   └── validation.js

├── redux/

│   ├── slices/

│   │   ├── authSlice.js

│   │   └── userSlice.js

│   └── store.js

├── screens/

│   ├── Home.js

│   ├── SignIn.js

│   ├── SignUp.js

│   └── EventDetails.js

└── App.js


## <a name="future-improvements">🚀 Future Improvements</a>

1. Add push notifications for upcoming events.

2. Integrate with a payment gateway for paid events.

3. Add offline support using a local database.

4. Implement a search and filter functionality for events.

#
