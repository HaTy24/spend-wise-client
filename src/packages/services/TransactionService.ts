import { GraphQLClient, gql } from "graphql-request";
import { graphQLClient } from "../connectors/graphql-connector";

class TransactionService {
  private graphQLClient: GraphQLClient;

  constructor(graphQLClient: GraphQLClient) {
    this.graphQLClient = graphQLClient;
  }

  public getTransactions() {
    return this.graphQLClient.request(gql`
      query {
        transaction {
          amount
          date
          purpose
        }
      }
    `);
  }

  public createTransaction(amount: number, purpose: string, date: Date) {
    return this.graphQLClient.request(
      gql`
        mutation createTransactionInput ($amount: Float!, $purpose: String!, $date: DateTime!) {
          createTransaction(
            createTransactionInput: {
              amount: $amount
              purpose: $purpose
              date: $date
            }
          ) {
            amount
            purpose
            date
          }
        }
      `,
      {
        amount: Number(amount),
        purpose,
        date,
      }
    );
  }
}

export const transactionService = new TransactionService(graphQLClient);
