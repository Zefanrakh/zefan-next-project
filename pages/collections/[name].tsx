/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { NextPage } from "next";
import { ReactElement, useEffect, useState } from "react";
import withApollo from "../../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { useLazyQuery } from "@apollo/react-hooks";
import { Anime, PageQueryRequestType } from "anime";
import Card from "../../components/card/Card";
import Service from "../../apollo/queries";
import { useRouter } from "next/router";
import { Collection } from "collections";
import CardActionContext, { ActionType } from "../../store/card_action_context";
import { Actions } from "../../components/card_actions/CardActions";
import Swal from "sweetalert2";

const AnimeList = styled("div")<{}>({
  margin: "0 -15px",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
});

const Home: NextPage<{}> = (): ReactElement => {
  const router = useRouter();
  const service = new Service();

  const [getAnimeList, { loading, error, data }] = useLazyQuery(
    service.GET_ANIME_LIST
  );
  const [pageNotFound, setPageNotFound] = useState(false);
  const [animeIds, setAnimeIds] = useState([] as number[]);
  const [toggleActionMenuCardId, setToggleActionMenuCardId] = useState(null);
  const [animes, setAnimes] = useState([] as Anime[]);
  const selectedCollectionName = router.query.name! as string;
  const cardActions: Actions[] = [Actions.REMOVE];

  useEffect(() => {
    const collections = localStorage.getItem("collections");
    if (collections) {
      const collectionsArr = JSON.parse(collections) as Collection[];
      const selectedCollection = collectionsArr.find(
        (collection) => collection.name === selectedCollectionName
      );

      if (selectedCollection) {
        const selectedIds = selectedCollection.ids;
        setAnimeIds(selectedIds);
        getAnimeList({
          variables: {
            perPage: 100,
            id_in: selectedIds,
          } as PageQueryRequestType,
        });
      } else {
        setPageNotFound(true);
      }
    } else {
    }
  }, []);

  useEffect(() => {
    if (data && data.Page && data.Page.media) {
      setAnimes(data.Page.media);
    }
  }, [data]);

  useEffect(() => {
    getAnimeList({
      variables: {
        perPage: 100,
        id_in: animeIds,
      } as PageQueryRequestType,
    });
  }, [animeIds]);

  const goToDetailPage = (id: string) => {
    router.push(`/${id}`);
  };

  const handleActionMenuToggled = (id: any) => {
    const triggeredId = id;
    setToggleActionMenuCardId((prevId) => {
      if (prevId === triggeredId) {
        return null;
      }
      return triggeredId;
    });
  };

  const handleTriggerAction = (params: ActionType) => {
    const { id, type } = params;
    const collections = localStorage.getItem("collections");

    if (type === Actions.REMOVE) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7bd630",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (collections) {
            const collectionsArr: Collection[] = JSON.parse(collections);
            const selectedCollectionIdx = collectionsArr.findIndex(
              (collection) => collection.name === selectedCollectionName
            );

            if (selectedCollectionIdx > -1) {
              const filteredIds = animeIds.filter((dbId) => dbId !== id);
              collectionsArr[selectedCollectionIdx] = {
                ...collectionsArr[selectedCollectionIdx],
                ids: filteredIds,
              };
              localStorage.removeItem("collections");
              localStorage.setItem(
                "collections",
                JSON.stringify(collectionsArr)
              );
              setAnimeIds(filteredIds);
              Swal.fire({
                icon: "success",
                title: `Anime with id "${id}" successfully removed from collection ${selectedCollectionName}!`,
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire(
                "Something's Wrong!",
                `Collection "${selectedCollectionName}" has already been deleted`,
                "error"
              );
            }
          } else {
            Swal.fire(
              "Something's Wrong!",
              `All collections has already been deleted`,
              "error"
            );
          }
        }
      });
    }
  };

  return (
    <>
      {pageNotFound ? (
        <div>Page Not Found</div>
      ) : animes.length === 0 ? (
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
            <img src="/images/broken_movie.png" />
          </div>
          <h1>You have no anime list</h1>
        </div>
      ) : (
        <>
          <h1>{selectedCollectionName}</h1>
          <CardActionContext.Provider
            value={{
              toggledCard: toggleActionMenuCardId,
              toggleCardActionMenu: handleActionMenuToggled,
              triggerAction: handleTriggerAction,
            }}
          >
            <AnimeList>
              {animes.map((anime) => (
                <Card
                  id={anime.id}
                  key={anime.id}
                  anime={anime}
                  onClick={goToDetailPage}
                  actions={cardActions}
                />
              ))}
            </AnimeList>
          </CardActionContext.Provider>
        </>
      )}
    </>
  );
};

export default withApollo(Home, { getDataFromTree });
