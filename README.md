# step 1:- clone the git repo
## Frontkend 
### for react install node from official nodejs website https://nodejs.org/en/download
## open command prompt and run following
### node -v to check node installation.
### go to frontend folder and execute following.
### npm install react-scripts --save
### npm start
## your node server should be up and running	

## Backend
## open one more comand prompt 
##  cd backend 
### python -m venv first_fast_venv Note:- "This helps to create virtual enviorment"
### .\first_fast_venv\Scripts\activate Note:- Activate python 
### pip install -r requirments.txt Note:- "Installs all packages required for this project on virtual env"
### uvicorn main:app --reload Note:- "This will start the server"
## Note:- check on which port unicorn is running. if it is 8000 port that fine. if not go to package.json in frontend folder and give corresponding port in proxy(key)
