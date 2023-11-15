const { createClient }  = require("redis");

const random = Math.random().toString()
// Create a Redis client
const client = createClient({
    host: "localhost", // Redis server host
    port: 6379,        // Redis server port

  });
  
  client.connect()
  // Check if Redis connection is successful
  client.on("connect", async () => {
      console.log("Connected to Redis");
      saveUser()

      setTimeout(async() => {
          await getUser()
          await saveUser2()
      }, 2500);
      
  
      
        setTimeout(async() => {
            await getUser()
        }, 3500);

  });

  client.on("error", (err) => {
    console.error("Redis client error:", err);
  });

async function saveUser(user){
    await client.set(random, "123", {
      EX: 3,
      NX: true
    })
}

async function saveUser2(user){
    await client.set(random, "123", {
      EX: 3,
      NX: false
    })
}
    
async function getUser(){
    const value = await client.get(random)
    console.log(value)
    return value;
}


