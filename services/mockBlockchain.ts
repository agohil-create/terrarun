// Simulates Web3 interaction with Base

export const connectWallet = async (): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("0x71C...9A2");
        }, 1000);
    });
};

export const mintTerritoryNFT = async (tileCount: number): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`tx_hash_${Math.random().toString(36).substring(7)}`);
        }, 1500);
    });
};

export const claimRewards = async (): Promise<number> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(50.25); // RUNZ tokens
        }, 2000);
    });
};