import axios from "axios"

const baseurl = "https://public.coindcx.com";

const get = async (pair) => {
    try {
        const url = `${baseurl}/market_data/orderbook?pair=B-${pair}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

let finalInr = 0;
let currency = 0;
let inr = 0;
let temp = 0;

setInterval(async () => {
    get("USDT_INR")
    .then((data) => {
        inr = Number(Object.keys(data.bids)[0])+0.001;
        // console.log(usdt)
    });
    get("FET_USDT")
    .then((data) => {
        currency = 1/Number(Object.keys(data.bids)[0]);
        // console.log(currency);
    });
    get("FET_INR")
    .then((data) => {
        temp = Number(Object.keys(data.asks)[0])-0.001;
        finalInr = currency*temp;
    });
    console.log(`Can get ${finalInr}INR from ${inr}INR`);
    if(finalInr>inr) {
        console.log("Thats a Profit");
    } else {
        console.log("Thats a Loss");
    }
}, 5000);