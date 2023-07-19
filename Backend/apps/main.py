from fastapi import FastAPI,Form, HTTPException
import requests
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class baseparm(BaseModel):
    entry_id: str
    assembly_id: int
    interface_id: int

@app.post("/asa-change")
def get_asa_change(BaseParm:baseparm):

    data = calculate_asa_change(BaseParm.entry_id, BaseParm.assembly_id, BaseParm.interface_id)
    if data== 404:
        raise HTTPException(status_code=404, detail="Data not found")
    
    return data
def calculate_asa_change(entry_id,assembly_id, interface_id):
    print("------------------------------------")
    api_url =  "https://data.rcsb.org/rest/v1/core/interface/"+entry_id+"/"+str(assembly_id)+"/"+str(interface_id)
    print(api_url)
    try:
        response = requests.get(api_url)
        asa_bound=[]
        asa_unbound=[]
        if response.status_code==200:
            response=response.json()
            for j in response['rcsb_interface_partner']:
                for i in j['interface_partner_feature']:    
                    #print(i['type'])
                    if i['type']=='ASA_BOUND':
                        for k in i['feature_positions']:
                            asa_bound= asa_bound+k['values']
                    elif (i['type']=='ASA_UNBOUND'):
                        for l in i['feature_positions']:
                            asa_unbound= asa_unbound+l['values']
            difference_bound = [asa_unbound[i] - asa_bound[i] for i in range(len(asa_unbound))]
        
            return {'bound':asa_bound,'unbound':asa_unbound,'change':difference_bound}
        else:
            return response.status_code    
    except:
         return {'error':'Bad request'}      
@app.get("/api")
def sample():
    return {"message":"welcome to backend"}