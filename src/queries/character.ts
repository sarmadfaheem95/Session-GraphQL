import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query Get_Characters($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        name
        image
      }
    }
  }
`;
