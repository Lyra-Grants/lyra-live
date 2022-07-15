import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";

/** @dev */
/* The code inside of getLyraPositions works, but have to confirm 
 that the aruguments are passed in correctly with more testing */

const addUpdateUser = async (accounts: string[]) => {
    let userData: any = []
    for (let i = 0; i < accounts.length; i++) {
        const userPositions = await getLyraPositions([accounts[i]])
        console.log("account =", accounts[i])

        // const pnl = userPositions.map(position => )
        userData.push({
            account: accounts[i], 
            positions: userPositions
        })
    }
    console.log("user Data =", await userData)
    return userData;
  } 

export default addUpdateUser;