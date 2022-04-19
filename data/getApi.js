const axios=require("axios");

async function getBookings(){
    // This sets up a connection to the LibCal API using our authorizations granted by the library
    const tokenData = await axios.post('https://stevens.libcal.com/1.1/oauth/token', 
        {
            grant_type: 'client_credentials',
            client_id: 970,
            client_secret: 'b9b1ab1884d0f936aa0a27289cedc950'
        });
    const config = {
        headers: { Authorization: `Bearer ${tokenData.data.access_token}` }
    };
    // These next few lines manipulate the date so it can be properly passed in to the API call
    let currentdate = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().substring(0,16);
    let currentdateAPIformat=currentdate.split('T')[0].replaceAll('-',"")
    const { data } = await axios.get('https://stevens.libcal.com/1.1/space/bookings?date='+currentdateAPIformat,config)
    const mySet1 = new Set();
    for(let i=0;i<data.length;i++){
        if(data[i].cid!=3114) {
            continue
        }
        fromdatetime=data[i].fromDate.substr(0,16)
        todatetime=data[i].toDate.substr(0,16)
        if(fromdatetime<=currentdate && currentdate<=todatetime){
            mySet1.add(data[i].eid)
        }
        
    }
    // We return 3 - the amount of current bookings because there are 3 total rooms, so 3-bookings = available rooms
    return 3-mySet1.size 
}
// This function calls the LibCal API to receive booking information
async function getRooms(){

    const { data } = await axios.get('https://stevens.libcal.com/1.1/room_groups',config)
    console.log("room data")
    return data
}
module.exports={
    getBookings,
    getRooms

}