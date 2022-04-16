const axios=require("axios");

const token="e20b3f4950d76e1d880418cf0f8d9c39fdadd82b"
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
async function getBookings(){
    let currentdate = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().substring(0,16);
    let currentdateAPIformat=currentdate.split('T')[0].replaceAll('-',"")
  //  console.log(currentdateAPIformat)
    const { data } = await axios.get('https://stevens.libcal.com/1.1/space/bookings?date='+currentdateAPIformat,config)
 //   console.log("booking data")
    const mySet1 = new Set();
    for(let i=0;i<data.length;i++){
        if(data[i].cid!=3114) {
            continue
        }
        fromdatetime=data[i].fromDate.substr(0,16)
        todatetime=data[i].toDate.substr(0,16)
   //     console.log(fromdatetime +" " + todatetime +" "+ currentdate)
   //     console.log(data[i].eid)
        if(fromdatetime<=currentdate && currentdate<=todatetime){
            mySet1.add(data[i].eid)
        }
        
    }
  //  console.log(3-mySet1.size)
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