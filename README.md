
# MovieReview App Setup and Deployment

This repository contains the backend API (built with .NET and Entity Framework) and the frontend (built with React and Vite) for the MovieReview app. The following steps guide you through setting up and deploying both parts of the app.


## Backend Setup (MovieReview API)

### 1. Clone the Repository
Clone the repository to your local machine:

```bash
git clone https://github.com/papmdpgwap123/Movie-Review-App.git
```

### 2. Navigate to the Backend Folder
Go to the MovieReview API folder:

```bash
cd MovieReviewApp/Movie_Review_Api
```

### 3. Restore Dependencies
Restore the NuGet dependencies for the .NET API project:

```bash
dotnet restore
```

### 4. Set up the Database
Make sure SQL Server is installed and running locally. Create a database and update the connection string in `appsettings.json` under the `ConnectionStrings` section.

### 5. Apply Migrations (Entity Framework)
Run the following command to apply the migrations and create the database schema:

```bash
dotnet ef database update
```

### 6. Run the API Locally
Start the backend API:

```bash
dotnet run
```

The API should now be running locally on `http://localhost:5000`.--check launch setting.json file

## Frontend Setup (React Vite)

### 1. Navigate to the Frontend Folder
Go to the React frontend folder:

```bash
cd ../Movie_Review_UI/movie-review-ui
```

### 2. Install Dependencies
Install the required dependencies for the frontend:

```bash
npm install
```

### 3. Start the React App
Run the frontend app locally:

```bash
npm run dev
```

The React app should now be running on `http://localhost:3000`.--check app configuration


