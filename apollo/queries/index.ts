import { gql } from "apollo-boost";

export const GET_ANIME_LIST = gql`
  query ($page: Int, $perPage: Int, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(sort: $sort) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        type
        description
        genres
        hashtag
        averageScore
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        studios {
          nodes {
            id
            name
          }
        }
        trailer {
          id
          site
          thumbnail
        }
        coverImage {
          extraLarge
          large
          medium
        }
        bannerImage
        episodes
        chapters
        volumes
      }
    }
  }
`;
