# Checkout Next.js + FastAPI Integration

This project is to build checkout app.

The app consists of a Frontend (Next, TailwindCSS) connected to a Backend REST API (FaztAPI), which in turn is connected to a PostgreSQL database.

## Project Structure

```
checkout-next-fastapi/
├── website/          # Next.js frontend application
├── backend/          # FastAPI backend application
└── README.md
```

Each backend and frontend has its own Dockerfile, and the root project contains a Docker Compose file that builds all the necessary dependencies.

## Frontend

### Frontend Improvement Opportunities

- Use a store for summarized order data
- Use module file structure, this example was plain with checkout feature
- PAN could use better validation, it was left simplified for this code
- Inject env vars to prevent hiding dependencies
- Use env vars to hide backend url

## Backend

### Backend Improvement Opportunities

- Add JWT validation to each route
- Complete schemas to follow up a better defined contract

## Development Setup

### Prerequisites

- Node.js 16+ (for frontend)
- Python 3.9+ (for backend)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd checkout-next-fastapi
```

2. Backend Setup:

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
# or if you have trouble with the previous command
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org -r requirements.txt
```

3. Frontend Setup:

```bash
cd frontend
npm install
# or
yarn install
```

### Running the Application

1. Start the Backend:

```bash
# From the root directory
cd backend
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

2. Start the Frontend:

```bash
# In a new terminal, from the frontend directory
cd frontend
npm run dev
# or
yarn dev
```

The frontend will be available at `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
