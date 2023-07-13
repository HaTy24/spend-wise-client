import { GraphQLClient, gql } from "graphql-request";
import { graphQLClient } from "../connectors/graphql-connector";
import { Transaction } from "../models/Transaction";

class TransactionService {
  private graphQLClient: GraphQLClient;

  constructor(graphQLClient: GraphQLClient) {
    this.graphQLClient = graphQLClient;
  }

  public getTransactions(pagination: {
    take: number;
    skip: number;
    sort: string;
  }): Promise<{ transaction: { result: Transaction[]; count: number } }> {
    return this.graphQLClient.request(
      gql`
        query dto($take: Int!, $skip: Int!, $sort: String!) {
          transaction(dto: { take: $take, skip: $skip, sort: $sort }) {
            result {
              amount
              date
              purpose
            }
            count
          }
        }
      `,
      pagination
    );
  }

  public createTransaction(
    amount: number,
    purpose: string,
    date: Date
  ): Promise<{ transaction: Transaction }> {
    return this.graphQLClient.request(
      gql`
        mutation createTransactionInput(
          $amount: Float!
          $purpose: String!
          $date: DateTime!
        ) {
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
