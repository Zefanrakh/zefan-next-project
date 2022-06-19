import { gql, DocumentNode } from "apollo-boost";

class Service {
  public type: string = `
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
  `;

  public GET_ANIME_LIST: DocumentNode = gql`
     query ($page: Int, $perPage: Int, $sort: [MediaSort], $id: Int, $id_in: [Int]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: $sort, id: $id, id_in: $id_in) {
        ${this.type}
      }
    }
  }
  `;

  public GET_ANIME: DocumentNode = gql`
    query ($sort: [MediaSort], $id: Int, $id_in: [Int]) {
      Media(type: ANIME, sort: $sort, id: $id, id_in: $id_in) {
        ${this.type}
      }
    }
  `;
}

export default Service;
