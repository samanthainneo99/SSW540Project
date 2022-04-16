const array= require('./getApi');
 async function main(){  
    try{
        let data=await array.getBookings()
        console.log("Number of Available rooms" +" "+data);     
    }
    catch(e){
        console.log(e)
    }

}
main();