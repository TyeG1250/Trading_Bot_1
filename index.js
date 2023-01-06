// Bot code

// import libraries 
const Binance = require('binance-api-node').default;
const client = Binance({
    apiKey: 'ExyDjR2mA6sPDbOgckU6JtypjzVFBiisaxuB1czJ8Sqn37AnOyeabo3Ww2VwyUTiE',
    apiSecret: 'ZZoy3VbcnSVx4aXyG6wZ6cxlUYwx38x1uba4OnoDBsrvEifwBJk27UQOjBEJfY9j'
  });
  

// set up variables 
let dogePrice;
let usdtPrice;
let buyPrice;
let sellPrice;
let profitMargin = 0.00001; // 5% profit margin 

// set up interval to check prices every 0.5 seconds  
setInterval(() => {

    // get current market prices of DOGE/USDT from Binance API  
    client.prices().then(prices => {

        dogePrice = prices['DOGEUSDT'];   // DOGE price in USDT  
        usdtPrice = prices['USDTUSDT'];   // USDT price in USDT

        // calculate buy and sell prices based on profit margin  
        buyPrice = dogePrice - (dogePrice * profitMargin);   // buy at 5% lower than current market price  
        sellPrice = dogePrice + (dogePrice * profitMargin);   // sell at 5% higher than current market price

        // execute trades if conditions are met  

        if (dogePrice < buyPrice) {    // if current market price is lower than buy price, execute a buy order   

            client.order({     // place a limit order to buy DOGE with USDT at the calculated buy price    

                symbol: 'DOGEUSDT',
                side: 'BUY',
                type: 'LIMIT',
                quantity: 1,     // 1 DOGE per trade    
                price: buyPrice,

            }).then(response => {

                console.log('Buy order executed successfully!');

            }).catch(err => {

                console.log('Error executing buy order!');

            });

        } else if (dogePrice > sellPrice) {    // if current market price is higher than sell price, execute a sell order   

            client.order({     // place a limit order to sell DOGE with USDT at the calculated sell price    

                symbol: 'DOGEUSDT',
                side: 'SELL',
                type: 'LIMIT',
                quantity: 1,     // 1 DOGE per trade    
                price: sellPrice,

            }).then(response => {

                console.log('Sell order executed successfully!');

            }).catch(err => {

                console.log('Error executing sell order!');

            });

        }

    });

}, 500);


