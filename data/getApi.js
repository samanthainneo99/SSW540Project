const axios=require("axios");

async function getBookings(){
    const tokenData = await axios.post('https://stevens.libcal.com/1.1/oauth/token', 
        {
            grant_type: 'client_credentials',
            client_id: 970,
            client_secret: 'b9b1ab1884d0f936aa0a27289cedc950'
        });
    const config = {
        headers: { Authorization: `Bearer ${tokenData.data.access_token}` }
    };
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
    return 3-mySet1.size
}

async function getRooms(){

    const { data } = await axios.get('https://stevens.libcal.com/1.1/room_groups',config)
    console.log("room data")
    return data
}
module.exports={
    getBookings,
    getRooms

}