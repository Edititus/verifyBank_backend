import { gql } from "apollo-server-express";
import { boot } from "../src/app";



// const server = boot();
   const server = boot();

beforeEach(async() => {

  jest.setTimeout(10000);
   
 
});



it("creating a user account successfully", async() => {
  const result = (await server).executeOperation({
    query: gql`
          mutation {
            createUserAccount(user_account_name:"", user_account_number:"3015506189", user_bank_code:"011",  is_Verified:true)
          }
        `,
  });

  expect(result).toBeTruthy();
  expect((await result).errors).toBeTruthy();
});

it("spelling check with user account name", async() => {
  const result = (await server).executeOperation({
    query: gql`
          query {
            useraccount( user_account_number:"3015506189",  user_bank_code:"011")
          }
        `,
  });

  expect(result).toBeTruthy();
  // expect(result).toHaveProperty()
  // expect((await result).errors).toBeTruthy();
});
