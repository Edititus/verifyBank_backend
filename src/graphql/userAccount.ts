import { resolveAccount } from './../utils/paystack';
import { UserAccount } from './../entities/UserAccount';
import { booleanArg, extendType, nonNull, objectType, stringArg } from "nexus";
import { Context } from '../types/Context';
import { query } from 'express';
import { compare } from '../utils/leven';
import { DataSource } from 'typeorm';


export const UserAccountType = objectType({
  name: "UserAccount",
  definition(t) {
    t.nonNull.string("user_account_name");
    t.nonNull.string("user_account_number");
   t.nonNull.string("user_bank_code");
   t.nonNull.boolean("is_Verified");
  },
});


export const UserAccountQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("useraccount", {
      type: "UserAccount",
      args: {
        user_account_number: nonNull(stringArg()),
        user_bank_code: nonNull(stringArg()),
       
      },
      resolve(_parent, args, context: Context, _info): Promise<UserAccount[]> {
        const { user_account_number, user_bank_code } = args;
        const { connection } = context;
        const accountDetails = resolveAccount(
          user_account_number,
          user_bank_code,
          async (error: any, body: any) => {
            if (error) {
              console.log(error);
              return error;
            }
            const response = JSON.parse(body);
            const paystack_account_name = response.data.account_name;
           
            const user = await UserAccount.findOne({
              where: { user_account_number },
            });
            if (!user) {
              throw new Error("Account not found.");
            }
            const check = compare(
              user.user_account_name.toLowerCase(),
              paystack_account_name.toLowerCase()
            );
            
            if (check) {
              UserAccount.createQueryBuilder("user_account")
                .update()
                .set({ is_Verified: true })
                .where(
                  "user_account.user_account_number = :user_account_number",
                  { user_account_number: `${user_account_number}` }
                )
                .execute();
            }
            return check
          }
        );
        return connection.query(`select * from user_account`);
      },
    });
  }
})

export const UserAccountMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUserAccount", {
      type: "UserAccount",
      args: {
        user_account_name: nonNull(stringArg()),
        user_account_number: nonNull(stringArg()),
        user_bank_code: nonNull(stringArg()),
        is_Verified: nonNull(booleanArg()),
      },
      resolve(_parent, args, context: Context, _info): Promise<UserAccount> {
        const {
          user_account_name,
          user_account_number,
          user_bank_code,
          is_Verified,
        } = args;
      
        return UserAccount.create({
          user_account_name,
          user_account_number,
          user_bank_code,
          is_Verified,
        }).save();
      },
    });
  }
})