import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query filterRepositories($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $after: String, $first: Int){
    repositories(searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection, after: $after, first: $first) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          id
        }
      }
    }
  }
`;

export const CHECK_USER = gql`
  {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ownerAvatarUrl
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      id
      url
      reviews(after: $after, first: $first) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      }
    }
  }
`;

export const GET_USER_REVIEWS = gql`
  query {
    authorizedUser {
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              username
            }
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`;