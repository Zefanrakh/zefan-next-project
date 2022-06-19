/** @jsxImportSource @emotion/react */
import { useQuery } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";
import styled from "@emotion/styled";
import {
  mdiCardsHeartOutline,
  mdiClipboardListOutline,
  mdiStar,
  mdiStarHalfFull,
  mdiStarOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Anime, PageQueryRequestType } from "anime";
import { Collection } from "collections";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import Swal from "sweetalert2";
import Service from "../apollo/queries";
import CollectionFormModal from "../components/collection_form/FormModal";
import RelatedCollectionModal from "../components/related_collections/RelatedCollectionModal";
import withApollo from "../hoc/withApollo";
import { getDateObj } from "../utils/date";

const MoviePoster = styled("div")<{}>({
  position: "relative",
  "&:after": {
    content: '" "',
    display: "block",
    paddingBottom: "100%",
  },
  "& img": {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const MovieTitle = styled("h2")<{}>({
  fontSize: "2.4em",
  fontWeight: 300,
});

const MovieMeta = styled("ul")<{}>({
  marginBottom: "30px",
  listStyle: "none",
  "& li": {
    marginBottom: "10px",
    fontSize: "1rem",
    "@media screen and (min-width: 1024px)": {
      fontSize: "1.2rem",
    },
  },
});

const MovieGenreTag = styled("div")<{}>({
  display: "inline-block",
  backgroundColor: "#f3aa3b",
  margin: "0px 3px 3px",
  padding: "0.2rem 0.4rem",
  borderRadius: "5px",
  fontSize: "0.9rem",
  color: "white",
});

const AnimeDetailPage = (): ReactElement => {
  const router = useRouter();
  const service = new Service();
  const pageId = router.query.id! as string;

  const [showFormModal, toggleFormModal] = useState(false);
  const [showRelatedCollectionsModal, toggleRelatedCollectionsModal] =
    useState(false);
  const [relatedCollectionNames, setRelatedCollectionNames] = useState(
    [] as string[]
  );
  const [dataUpdateTrigger, setDataUpdateTrigger] = useState(false);

  const { data, loading, error } = useQuery(service.GET_ANIME, {
    variables: {
      id: Number(pageId),
    } as PageQueryRequestType,
  });

  useEffect(() => {
    const collections = localStorage.getItem("collections");

    if (collections) {
      try {
        const collectionsArr = JSON.parse(collections) as Collection[];
        const relateds = collectionsArr
          .filter((collection) => collection.ids.includes(Number(pageId)))
          .map((collection) => collection.name);

        setRelatedCollectionNames(relateds);
      } catch (err) {
        Swal.fire("Something's Wrong!", "Please reload the page!", "question");
      }
    }
  }, [pageId, dataUpdateTrigger]);

  const transitionElement = (image: string): ReactElement => {
    return (
      <div
        css={{
          textAlign: "center",
        }}
      >
        <div
          css={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <img src={`/images/${image}.png`} />
        </div>
        <h1>No Details Here !</h1>
      </div>
    );
  };

  if (!data) {
    if (loading) {
      return transitionElement("loading");
    }
    return transitionElement("error");
  }

  const anime: Anime = data.Media;

  if (!anime) {
    if (loading) {
      return transitionElement("loading");
    }
    return transitionElement("error");
  }

  let startDate: any = anime.startDate;
  startDate = startDate
    ? getDateObj(new Date(startDate.year, startDate.month, startDate.day))
    : null;
  let stars: ReactElement[] = [];
  let starIcon = (icon: string, color: string, key: any): ReactElement => {
    return (
      <Icon
        size={1}
        key={key}
        path={icon}
        css={{
          color,
        }}
      />
    );
  };
  let ratings = anime.averageScore || 0;
  for (let i = 1; i <= 10; i++) {
    let ratingsInTenFloor = Math.floor(ratings / 10);
    if (i <= ratingsInTenFloor) {
      stars.push(starIcon(mdiStar, "#ffaa3c", i));
    } else if (i > ratingsInTenFloor + 1) {
      stars.push(starIcon(mdiStarOutline, "#ffaa3c", i));
    } else {
      const decimals = ratings / 10 - ratingsInTenFloor;
      const decimalsMultipliedBy10 = decimals * 10;
      if (decimalsMultipliedBy10 < 5) {
        stars.push(starIcon(mdiStarOutline, "#ffaa3c", i));
      } else {
        stars.push(starIcon(mdiStarHalfFull, "#ffaa3c", i));
      }
    }
  }

  const handleFormModalClosed = (): void => {
    setDataUpdateTrigger((state) => {
      return !state;
    });
    toggleFormModal(false);
  };

  return (
    <>
      <div className="row row-cols-1 mb-4">
        <div className="col-sm-12 col-md-auto">
          <button
            className="btn btn-warning w-100 text-white"
            onClick={toggleFormModal.bind(this, true)}
          >
            <Icon path={mdiCardsHeartOutline} size={0.8} />
            {"  "}Save to collections
          </button>
        </div>
        {!!relatedCollectionNames.length && (
          <div className="col-sm-12 col-md-auto mt-3">
            <button
              className="btn btn-warning w-100 text-white"
              onClick={toggleRelatedCollectionsModal.bind(this, true)}
            >
              <Icon path={mdiClipboardListOutline} size={0.8} />
              {"  "}Related Collections
            </button>
          </div>
        )}
        <CollectionFormModal
          selectedAnimes={[anime.id]}
          show={showFormModal}
          handleClose={handleFormModalClosed}
        />
        <RelatedCollectionModal
          show={showRelatedCollectionsModal}
          handleClose={toggleRelatedCollectionsModal.bind(this, false)}
          collections={relatedCollectionNames}
        />
      </div>
      <div className="content">
        {anime.trailer?.site && anime.trailer.site === "youtube" && (
          <div className="row mb-4">
            <iframe
              height="315"
              src={`https://www.youtube.com/embed/${anime.trailer.id}`}
              frameBorder="0"
            ></iframe>
          </div>
        )}
        <div className="row mb-4">
          <div className="col-md-5">
            <MoviePoster>
              <img src={anime.coverImage?.extraLarge || ""} alt="#" />
            </MoviePoster>
          </div>
          <div className="col-md-7">
            <MovieTitle>{anime.title?.english}</MovieTitle>
            {anime.title?.native && anime.title.romaji && (
              <h2>
                Original: {anime.title?.native} | ({anime.title?.romaji})
              </h2>
            )}
            <div className="movie-summary"></div>
            <MovieMeta>
              <li>
                <div>
                  <strong>Rating:</strong>
                  {stars.map((star) => star)}
                </div>
                <div>
                  (<strong>{anime.averageScore}</strong> of 100)
                </div>
              </li>
              <li>
                <strong>Volumes:</strong> {anime.volumes || "-"}
              </li>
              <li>
                <strong>Episodes:</strong> {anime.episodes || "-"}
              </li>
              <li>
                <strong>Chapters:</strong> {anime.chapters || "-"}
              </li>
              <li>
                <strong>Premiere:</strong>{" "}
                {startDate
                  ? `${startDate.dateNum} ${startDate.monthName} ${startDate.year}`
                  : "-"}
              </li>
              <li>
                <div>
                  <strong>Genres:</strong>
                </div>
                <div>
                  {anime.genres.map((genre) => (
                    <MovieGenreTag key={genre}>{genre}</MovieGenreTag>
                  ))}
                </div>
              </li>
            </MovieMeta>
          </div>
        </div>
        <div className=" fs-5">{ReactHtmlParser(anime.description || "")}</div>
      </div>
    </>
  );
};

export default withApollo(AnimeDetailPage, { getDataFromTree });
