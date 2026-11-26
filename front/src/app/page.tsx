export default async  function HomePage () {

const data = await fetch  ("http://localhost:3002:stations");
const stations =await data.json();
console.log (stations)
return (


  <></>
)




}