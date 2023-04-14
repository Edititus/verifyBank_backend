# verifybank_backend

==> This application validates user's bank account name using Paystack account number resolution API that takes in the **account_number** and a **bank_code** and returns the **account_name**(Query). If the names match , the user is marked as verified in the DB.
The application further computes the Levenshtein Distance between the user inputed **account_name** and the **account_name** provided by the API and if the user's input is within a Levenshtein Distance of 2 from what is provided by Paystack, the user gets verified.
The application is finally tested with jest testing framework.

Technologies used:
 * GraphQL
 * Type orm
 * Typescript
 * Postman
 * Postgres
 * Paystack API

Application setup:
 * clone the repo
 * Visit this website https://www.apollographql.com/docs/ to kickstart
 * cd into "Backdrop-task"
 * run yarn
 * run yarn dev to start server
 * yarn build to compile

Testing:
 * yarn test


Connection:
* A free unverified Paystack account is required (to get test API keys)
* Download postgres via this link https://www.postgresql.org/download/macosx/ 


Server:
* http://localhost:4000/graphql

- Why the pure Levenshtein Distance algorithm is a more effective solution than the broader Damerau–Levenshtein Distance algorithm in this specific scenario.

The pure Levenshtein Distance algorithm is more effective here, due to its simplicity, faster computation, and lower risk of false positives. It's simpler and quicker to implement since it doesn't use complex transposition operations. This is important for longer strings like full names. Damerau–Levenshtein algorithm can generate false positives if many legitimate strings are close in distance due to transpositions,which is a risk we want to avoid when verifying user account names.Levenshtein Distance algorithm avoids this problem by not considering transpositions, which reduces false positives.
