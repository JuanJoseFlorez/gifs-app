# GIF Search App (React + TypeScript)

A beginner-friendly React project built to practice core React concepts, hooks, clean component structure, and automated testing.

This app connects to the Giphy API, lets users search for GIFs, and keeps the latest search terms. It also uses an in-memory cache to avoid duplicate requests when a term was already searched.

## Demo

- https://juanflorez-gif-app.netlify.app/

## Features

- Search GIFs from Giphy in real time.
- Debounced search input (700 ms).
- Search by pressing `Enter` or clicking the **Search** button.
- Previous searches list (up to 8 terms, newest first).
- Click a previous term to search again.
- In-memory cache to reuse prior results and reduce repeated API calls.
- Data mapping from Giphy response into a local `Gif` interface.

## Tech Stack

- React 19
- TypeScript
- Vite
- Axios
- Vitest + Testing Library
- ESLint

## Project Structure

```text
src/
	GifsApp.tsx
	gifs/
		actions/
			get-gifs-by-query.action.ts
		api/
			giphy.api.ts
		components/
			GifList.tsx
			PreviousSearches.tsx
		hooks/
			useGifs.tsx
		interfaces/
			gif.interfaces.ts
			giphy.response.ts
	shared/
		components/
			CustomHeader.tsx
			SearchBar.tsx
	...tests
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```env
VITE_GIPHY_API_KEY=your_giphy_api_key_here
```

> You can create an API key at https://developers.giphy.com/

### 3) Run the app

```bash
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` → start development server.
- `npm run build` → run tests (`test:only`), type-check, and build for production.
- `npm run preview` → preview production build locally.
- `npm run lint` → run ESLint.
- `npm run test` → run tests in watch mode.
- `npm run test:ui` → run tests with Vitest UI.
- `npm run test:only` → run tests once.
- `npm run coverage` → generate test coverage report.

## Testing

The project includes unit and component tests for key functionality:

- `useGifs` hook behavior (search, previous terms, cache).
- API action and error handling (`getGifsByQuery`).
- UI components (`SearchBar`, `GifList`, `PreviousSearches`, `CustomHeader`).
- Snapshot tests for rendering stability.

## Learning Goals

This project was built as early React practice with focus on:

- Functional components and reusable UI.
- Custom hooks for state and business logic.
- Separation of concerns (`api`, `actions`, `hooks`, `components`).
- Good testing practices.
