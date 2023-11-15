const { run } = require('googleapis/build/src/apis/run');
const db = require('./mysql')

const {client} = require('./server')

async function getuserlikes(user_id){
    const END = await client.hKeys(`user:${user_id}:likes`);
    return END
}

async function getTwentyUsers() {
    const users = await db.getTwentyUsers()
    return users
}
async function getAllProducts() {
    const products = await db.getAllProducts()
    return products
}
async function getLikedProducts(likes_array) {
    const products = await db.getProductsByIndexesArray(likes_array)
    return products
}
async function getSingleRandomProductForTest() {
    const product = await db.getSingleRandomProductForTest()
    return product
}
async function storeUsersRecommendation(id, recommendation) {
    const updated = await db.storeUsersRecommendation(id, recommendation)
 
}


async function insertratings() {

    for (let i = 1; i < 42; i++){

        for (let j = 1; j <= 9; j++) {
            const r = Math.floor(Math.random() * 5) + 1;
            await db.insertRating(j,i, r, 'This is a Fake Review!')
        }

    }
}


const main = async () => {
    const user = await getTwentyUsers()
    let likes = await getuserlikes(user.id)
    console.log(likes)
    if (likes.length > 0) {
        likes = likes.map(like => { return Number(like) })
    }

    const products = await getLikedProducts(likes)
    products.map(product => {
        runsum(product.color.toUpperCase())
        runsum2(product.taste.toUpperCase())
    })

    const userPROFILE = { ...COLORS, ...TASTES }

    const allp = await db.getAllProducts()


    let converted = []
    allp.forEach(prod => {
        converted.push({ id: prod.id, cat: CATEGORIZE_PRODUCT(prod.color, prod.taste) })
    })


    const final = converted.map(item => {

           
        const chance =
            (userPROFILE.Red * item.cat.Red) +
            (userPROFILE.Orange * item.cat.Orange) +
            (userPROFILE.Yellow * item.cat.Yellow) +
            (userPROFILE.Green * item.cat.Green) +
            (userPROFILE.Blue * item.cat.Blue) +
            (userPROFILE.Purple * item.cat.Purple) +
            (userPROFILE.Pink * item.cat.Pink) +
            (userPROFILE.Brown * item.cat.Brown) +
            (userPROFILE.White * item.cat.White) +
            (userPROFILE.Black * item.cat.Black) +
            (userPROFILE.Sweety * item.cat.Sweety) +
            (userPROFILE.Citric * item.cat.Citric) +
            (userPROFILE.Soury * item.cat.Soury) +
            (userPROFILE.Savory * item.cat.Savory) +
            (userPROFILE.Bitter * item.cat.Bitter) +
            (userPROFILE.Spicy * item.cat.Spicy) +
            (userPROFILE.Earthy * item.cat.Earthy) +
            (userPROFILE['Grassy/Leafy'] * item.cat['Grassy/Leafy']) +
            (userPROFILE.Nutty * item.cat.Nutty)
        
               
        return { id: item.id, chance: chance }
                

            
        

    })

  
    final.sort((a, b) => b.chance - a.chance);
    let i = 0
    const final2 = final.map((item) => {return item.id })
 
    const comma = final2.join(',')


    await storeUsersRecommendation(user.id, comma)
    
}

function CATEGORIZE_PRODUCT(color, taste) {
    const p = {
        "Red": 0,
    "Orange": 0,
    "Yellow": 0,
    "Green": 0,
    "Blue": 0,
    "Purple": 0,
    "Pink": 0,
    "Brown": 0,
    "White": 0,
    "Black": 0,
    "Sweety": 0,
    "Citric": 0,
    "Soury": 0,
    "Savory": 0,
    "Bitter": 0,
    "Spicy": 0,
    "Earthy": 0,
    "Grassy/Leafy": 0,
    "Nutty": 0,
    } 
    p[color] = 1;
    p[taste] = 1;
    return p;
    

}

const COLORS = {
    "Red": 0,
    "Orange": 0,
    "Yellow": 0,
    "Green": 0,
    "Blue": 0,
    "Purple": 0,
    "Pink": 0,
    "Brown": 0,
    "White": 0,
    "Black": 0,
}
function runsum(color) {
    if (color == 'RED') COLORS.Red++
    else if (color == 'ORANGE')  COLORS.Orange++
    else if (color == 'YELLOW')  COLORS.Yellow++
    else if (color == 'GREEN')  COLORS.Green++
    else if (color == 'BLUE')  COLORS.Blue++
    else if (color == 'PURPLE')  COLORS.Purple++
    else if (color == 'PINK')  COLORS.Pink++
    else if (color == 'BROWN')  COLORS.Brown++
    else if (color == 'WHITE')  COLORS.White++
    else if (color == 'BLACK')  COLORS.Black++
}

const TASTES = {
    "Sweety": 0,
    "Citric": 0,
    "Soury": 0,
    "Savory": 0,
    "Bitter": 0,
    "Spicy": 0,
    "Earthy": 0,
    "Grassy/Leafy": 0,
    "Nutty": 0,
}
function runsum2(taste) {
    if (taste == 'SWEETY') TASTES.Sweety++
    else if (taste == 'CITRIC')  TASTES.Citric++
    else if (taste == 'SOURY')  TASTES.Soury++
    else if (taste == 'SAVORY')  TASTES.Savory++
    else if (taste == 'BITTER')  TASTES.Bitter++
    else if (taste == 'SPICY')  TASTES.Spicy++
    else if (taste == 'EARTHY')  TASTES.Earthy++
    else if (taste == 'GRASSY/LEAFY')  TASTES['Grassy/Leafy']++
    else if (taste == 'NUTTY')  TASTES.Nutty++
}




const main2 = async () => {
    const users = await getTwentyUsers()
    console.log(users);
    if (!users || users?.length < 1)return
    users.forEach(async (user) => {
        let likes = await getuserlikes(user.id)
        if (likes.length > 0) {
            likes = likes.map(like => { return Number(like) })
        }
        console.log('likes')
        console.log(likes)

        const products = await getLikedProducts(likes)
        products.map(product => {
            runsum(product.color.toUpperCase())
            runsum2(product.taste.toUpperCase())
        })
        const userPROFILE = { ...COLORS, ...TASTES }
        const allp = await db.getAllProducts()

        let converted = []
        allp.forEach(prod => {
            converted.push({ id: prod.id, cat: CATEGORIZE_PRODUCT(prod.color, prod.taste) })
        })

        const final = converted.map(item => {
        const chance =
            (userPROFILE.Red * item.cat.Red) +
            (userPROFILE.Orange * item.cat.Orange) +
            (userPROFILE.Yellow * item.cat.Yellow) +
            (userPROFILE.Green * item.cat.Green) +
            (userPROFILE.Blue * item.cat.Blue) +
            (userPROFILE.Purple * item.cat.Purple) +
            (userPROFILE.Pink * item.cat.Pink) +
            (userPROFILE.Brown * item.cat.Brown) +
            (userPROFILE.White * item.cat.White) +
            (userPROFILE.Black * item.cat.Black) +
            (userPROFILE.Sweety * item.cat.Sweety) +
            (userPROFILE.Citric * item.cat.Citric) +
            (userPROFILE.Soury * item.cat.Soury) +
            (userPROFILE.Savory * item.cat.Savory) +
            (userPROFILE.Bitter * item.cat.Bitter) +
            (userPROFILE.Spicy * item.cat.Spicy) +
            (userPROFILE.Earthy * item.cat.Earthy) +
            (userPROFILE['Grassy/Leafy'] * item.cat['Grassy/Leafy']) +
            (userPROFILE.Nutty * item.cat.Nutty)
        return { id: item.id, chance: chance }
        })

          
    final.sort((a, b) => b.chance - a.chance);
    let i = 0
    const final2 = final.map((item) => {return item.id })

    const comma = final2.join(',')


    await storeUsersRecommendation(user.id, comma)

    })







    


   
                

            
        


    
}
module.exports = { main2, insertratings }