import request  from "request";

const mySecret: string = `Bearer ${process.env.PAYSTACK_SECRET}`
export const resolveAccount = (user_account_number: string, user_bank_code: string,myCallback:any) => {
    const options = {

      url: `http://api.paystack.co/bank/resolve?account_number=${user_account_number}&bank_code=${user_bank_code}`,
      headers: {
        authorization: mySecret,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    };

    const callback = (error: any, response: any, body: any) => {
        return myCallback(error, body);
    }
    request(options, callback)
}