# GEMINI.md

## Project Overview

This project is an AI-powered travel agent that runs in the command line. It uses a multi-agent system based on the CrewAI framework to help users plan their trips. The core intelligence is provided by Google's Gemini models.

The system is composed of three main agents:

*   **Destination Analyst Agent:** Analyzes and recommends the best travel destination based on weather, costs, activities, and user preferences.
*   **Local Expert Agent:** Provides insider knowledge, hidden gems, and cultural insights for the chosen destination.
*   **Travel Concierge Agent:** Creates detailed, day-by-day itineraries with accommodations, dining, and budget planning.

The agent uses the Serper API for real-time web searches to gather information on flights, hotels, and other travel-related data.

## Building and Running

### 1. Prerequisites

*   Python 3.8 or higher
*   Google AI API Key
*   Serper API Key

### 2. Setup

1.  **Create a virtual environment:**
    ```bash
    python3 -m venv travel_agent_env
    ```

2.  **Activate the virtual environment:**
    ```bash
    source travel_agent_env/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the project root with the following content:
    ```
    GOOGLE_API_KEY=your_google_api_key_here
    SERPER_API_KEY=your_serper_api_key_here
    ```

### 3. Running the Application

To start the interactive travel planning agent, run the following command:

```bash
python crew.py
```

The application will guide you through a series of questions to understand your travel preferences and generate a detailed itinerary.

### 4. Testing

The project includes a diagnostic tool to verify API connections. To run it, use the following command:

```bash
python debug_api.py
```

## Development Conventions

*   **Frameworks:** The project uses the CrewAI framework for agent orchestration and `langchain_google_genai` for interacting with Gemini models.
*   **Configuration:** Environment variables are managed using `python-dotenv` and are loaded from a `.env` file. The `config.py` file is used to force CrewAI to use Gemini exclusively.
*   **Dependencies:** All Python dependencies are listed in the `requirements.txt` file.
*   **Code Style:** The code follows standard Python conventions.
*   **Contribution:** The `README.md` file provides guidelines for contributing to the project, including forking the repository, creating a feature branch, and opening a pull request.
