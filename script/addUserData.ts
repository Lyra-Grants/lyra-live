import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";

const addUpdateUser = async (accounts: string[]) => {
    for (let i = 0; i < accounts.length; i++) {
        const userPositions = await getLyraPositions([accounts[i]])

        const pnl = userPositions.map(position => )


    }
}

export default addUpdateUser;