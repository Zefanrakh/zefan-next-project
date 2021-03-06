/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { NextPage } from "next";
import { ReactElement, useContext, useEffect, useState } from "react";
import Icon from "@mdi/react";
import withApollo from "../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { useQuery } from "@apollo/react-hooks";
import {
  Anime,
  PageQueryRequestType,
  PageQueryResponseDataPageInfoType,
} from "anime";
import Card from "../components/card/Card";
import Service from "../apollo/queries";
import { toNumber, uniq } from "lodash";
import CollectionFormModal from "../components/collection_form/FormModal";
import { useRouter } from "next/router";
import Pagination from "../components/pagination/Pagination";
import { mdiCardsHeartOutline } from "@mdi/js";
import CardActionContext from "../store/card_action_context";

const AnimeList = styled("div")<{}>({
  margin: "0 -15px",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
});

const Home: NextPage<{}> = (): ReactElement => {
  const router = useRouter();
  const service = new Service();
  const [isMount, setIsMount] = useState(true);
  const { data, loading, error, refetch } = useQuery(service.GET_ANIME_LIST, {
    variables: {
      page: toNumber(router.query.page || 1),
      perPage: 10,
      sort: "POPULARITY_DESC",
    } as PageQueryRequestType,
  });

  useEffect(() => {
    setIsMount(false);
  }, []);

  useEffect(() => {
    if (!isMount) {
      const currentAppPage = toNumber(router.query.page || 1);

      refetch({
        page: currentAppPage,
        perPage: 10,
        sort: "POPULARITY_DESC",
      });
    }
  }, [router]);

  const [selectedAnimes, setSelectedAnimes] = useState([] as number[]);

  const [showModal, toggleModal] = useState(false);

  const animes: Anime[] = (data && data.Page && data.Page.media) || [];

  const paginationData: PageQueryResponseDataPageInfoType = (data &&
    data.Page &&
    data.Page.pageInfo) || {
    total: 1,
    currentPage: 1,
    lastPage: 1,
    hasNextPage: false,
    perPage: 1,
  };

  const handleSelectAnime = (id: number) => {
    setSelectedAnimes((previousSelectedAnimes) => {
      if (previousSelectedAnimes.includes(id)) {
        return previousSelectedAnimes.filter((selectedId) => selectedId !== id);
      }
      return uniq([...previousSelectedAnimes, id]);
    });
  };

  const handleModalClose = (emptiedValue?: boolean) => {
    if (emptiedValue) setSelectedAnimes([]);
    toggleModal(false);
  };

  const goToDetailPage = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <>
      <div className="row row-cols-1 mb-4">
        <div className="col-sm-12 col-md-auto">
          <button
            className="btn btn-warning w-100 text-white"
            disabled={!selectedAnimes.length}
            onClick={toggleModal.bind(this, true)}
          >
            <Icon path={mdiCardsHeartOutline} size={0.8} />
            {"  "}Save to collections
          </button>
        </div>
        <CollectionFormModal
          selectedAnimes={selectedAnimes}
          show={showModal}
          handleClose={handleModalClose}
        />
      </div>
      {paginationData.perPage !== 1 && <Pagination pageInfo={paginationData} />}
      <AnimeList>
        {animes.map((anime) => (
          <Card
            key={anime.id}
            anime={anime}
            isChecked={selectedAnimes.includes(anime.id)}
            onCheck={handleSelectAnime.bind(this, anime.id)}
            onClick={goToDetailPage}
          />
        ))}
      </AnimeList>
      {paginationData.perPage !== 1 && <Pagination pageInfo={paginationData} />}
    </>
  );
};

export default withApollo(Home, { getDataFromTree });
