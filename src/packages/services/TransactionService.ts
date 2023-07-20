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
              id
              amount
              date
              spendingReason
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
    spendingReason: string,
    date: Date
  ): Promise<{ transaction: Transaction }> {
    return this.graphQLClient.request(
      gql`
        mutation createTransactionInput(
          $amount: Float!
          $spendingReason: String!
          $date: DateTime!
        ) {
          createTransaction(
            createTransactionInput: {
              amount: $amount
              spendingReason: $spendingReason
              date: $date
            }
          ) {
            amount
            spendingReason
            date
          }
        }
      `,
      {
        amount: Number(amount),
        spendingReason,
        date,
      }
    );
  }

  public deleteTransaction(id: string): Promise<{ success: boolean }> {
    return this.graphQLClient.request(
      gql`
        mutation {
          removeTransaction(id: "${id}") {
            success
          }
        }
      `
    );
  }
}

export const transactionService = new TransactionService(graphQLClient);
