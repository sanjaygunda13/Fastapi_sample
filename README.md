# Project Setup Instructions

## Step 1: Clone the Git Repository

git clone <repository_url>
cd <repository_folder>

## Frontend Setup

### Prerequisites:
Ensure you have Node.js installed. If not, download it from the official Node.js website: https://nodejs.org/en/download


### Installation and Start-up:
1. Open a command prompt/terminal.
2. Check Node.js installation:
   node -v

3. Navigate to the frontend folder:
   cd frontend

4. Install React scripts:
   npm install react-scripts --save

5. Start the frontend server:
   npm start

6. Your Node.js server should now be up and running.

Make sure you have Google Chrome browser installed for optimal testing and running the frontend application.

## Backend Setup

### Prerequisites:
Ensure you have Python installed.

### Installation and Start-up:
1. Open another command prompt/terminal.
2. Navigate to the backend folder:
   cd backend

3. Create a virtual environment (venv):
   python -m venv first_fast_venv

   Note: This step helps to create a virtual environment for this project.

4. Activate the virtual environment:

   - On Windows:
     .\first_fast_venv\Scripts\activate

   - On macOS and Linux:
     source first_fast_venv/bin/activate

5. Install required packages for the project on the virtual environment:
   pip install -r requirements.txt

   Note: This command will install all the required packages.

6. Start the backend server using uvicorn:
   uvicorn main:app --reload

7. Note: Check on which port uvicorn is running. If it is running on port 8000, that's fine. If not, go to the package.json file in the frontend folder and set the corresponding port in the proxy field.



Now, both the frontend and backend servers should be running and ready to use.
