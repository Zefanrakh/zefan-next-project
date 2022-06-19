/** @jsxImportSource @emotion/react */
import { NextPage } from "next";
import { ReactElement, useEffect, useState } from "react";
import withApollo from "../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { useQuery } from "@apollo/react-hooks";
import {
  Anime,
  PageQueryRequestType,
  PageQueryResponseDataPageInfoType,
} from "anime";
import Card from "../components/card/CardAlternative";
import Service from "../apollo/queries";
import { toNumber, uniq } from "lodash";
import CollectionFormModal from "../components/collection_form/FormModal";
import Pagination from "../components/pagination/PaginationAlternative";
import { useRouter } from "next/router";

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
    <div className="container">
      <div className="row row-cols-1 mb-2">
        <div className="col-sm-12 col-md-auto text-white">
          <button
            className="btn btn-primary w-100"
            disabled={!selectedAnimes.length}
            onClick={toggleModal.bind(this, true)}
          >
            Add to collections
          </button>
        </div>
        <CollectionFormModal
          selectedAnimes={selectedAnimes}
          show={showModal}
          handleClose={handleModalClose}
        />
      </div>
      <Pagination pageInfo={paginationData} />
      <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 justify-content-center">
        {animes.map((anime) => (
          <div className="col" key={anime.id}>
            <Card
              anime={anime}
              isChecked={selectedAnimes.includes(anime.id)}
              onCheck={handleSelectAnime.bind(this, anime.id)}
              onClick={goToDetailPage}
            />
          </div>
        ))}
      </div>
      <Pagination pageInfo={paginationData} />
    </div>
  );
};

export default withApollo(Home, { getDataFromTree });
