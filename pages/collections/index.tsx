/** @jsxImportSource @emotion/react */
import { useLazyQuery } from "@apollo/react-hooks";
import { Anime, PageQueryRequestType } from "anime";
import { Collection } from "collections";
import { snakeCase, uniq } from "lodash";
import { NextPage } from "next";
import { ReactElement, useEffect, useState } from "react";
import Service from "../../apollo/queries";
import withApollo from "../../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import CollectionFormModal from "../../components/collection_form/FormModal";
import { mdiPencil, mdiPlus, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import Swal from "sweetalert2";
import Router from "next/router";

type propsType = {
  list: string;
};

const Collections: NextPage<propsType> = (props: propsType): ReactElement => {
  const service = new Service();
  const [collections, setCollections] = useState([] as Collection[]);
  const [animes, setAnimes] = useState([] as Anime[]);
  const [fetched, setFetched] = useState(false);
  const [getAnimeList, { loading, error, data }] = useLazyQuery(
    service.GET_ANIME_LIST
  );
  const [showAddModal, toggleAddModal] = useState(false);
  const [showEditModal, toggleEditModal] = useState(false);
  const [editedCollectionName, setEditedCollectionName] = useState(
    null as string | null
  );

  useEffect(() => {
    const collections = localStorage.getItem("collections");
    if (collections) {
      const collectionsArr = JSON.parse(collections) as Collection[];
      setCollections(collectionsArr);
      const ids = uniq(
        collectionsArr.flatMap((collection) => collection.ids)
      ).map((id) => Number(id));
      getAnimeList({
        variables: {
          perPage: 100,
          id_in: ids,
        } as PageQueryRequestType,
      });
    } else {
    }
  }, []);

  useEffect(() => {
    if (data) {
      const animes = data.Page.media as Anime[];
      setAnimes(animes);
      setFetched(true);
    }
  }, [data]);

  const handleCloseAddModal = (
    emptiedValue?: boolean,
    newCollectionName?: string
  ): void => {
    if (newCollectionName) {
      const collections = localStorage.getItem("collections");
      if (collections) {
        const collectionsArr = JSON.parse(collections) as Collection[];
        const newCollection = collectionsArr.find(
          (collection) => collection.name === newCollectionName
        );

        if (!newCollection) {
          setCollections((prevCollections) => {
            return [
              ...prevCollections,
              {
                name: newCollectionName,
                ids: [],
              },
            ];
          });
        } else {
          setCollections((prevCollections) => {
            return [...prevCollections, newCollection];
          });
        }
      } else {
      }
    }
    toggleAddModal(false);
  };

  const handleCloseEditModal = (
    emptiedValue?: boolean,
    newCollectionName?: string
  ): void => {
    if (newCollectionName) {
      const collections = localStorage.getItem("collections");
      if (collections) {
        const collectionsArr = JSON.parse(collections) as Collection[];

        setCollections(collectionsArr);
      } else {
      }
    }
    toggleEditModal(false);
  };

  const removeCollection = (name: string): void => {
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
        const collections = localStorage.getItem("collections");
        if (collections) {
          const collectionsArr = JSON.parse(collections) as Collection[];
          const filterredCollections = collectionsArr.filter(
            (collection) => collection.name !== name
          );
          localStorage.removeItem("collections");
          localStorage.setItem(
            "collections",
            JSON.stringify(filterredCollections)
          );
          setCollections(filterredCollections);
          Swal.fire({
            icon: "success",
            title: `Collection "${name}" successfully removed!`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire(
            "Something's Wrong!",
            `Failed to delete collection "${name}"`,
            "question"
          );
        }
      }
    });
  };

  const editCollection = (name: string): void => {
    setEditedCollectionName(name);
    toggleEditModal(true);
  };

  const goToDetailPage = (name: string) => {
    Router.push(`/collections/${name}`);
  };

  return (
    <>
      <div className="row row-cols-1 mb-4">
        <div className="col-sm-12 col-md-auto">
          <button
            className="btn btn-warning w-100 text-white"
            onClick={toggleAddModal.bind(this, true)}
          >
            <Icon path={mdiPlus} size={0.8} />
            {"  "}Add New Collection
          </button>
        </div>
        <CollectionFormModal
          noSelectedAnimes
          selectedAnimes={[]}
          show={showAddModal}
          handleClose={handleCloseAddModal}
        />
        <CollectionFormModal
          noSelectedAnimes
          selectedAnimes={[]}
          show={showEditModal}
          handleClose={handleCloseEditModal}
          editedName={editedCollectionName}
        />
      </div>

      {!collections.length || (collections.length && !fetched) ? (
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
            <img src="/images/empty_box.png" />
          </div>
          <h1>You have no collections</h1>
        </div>
      ) : (
        <>
          {collections.map((collection) => (
            <div
              css={{
                cursor: "pointer",
              }}
              key={snakeCase(collection.name)}
              className="card mb-4"
              onClick={goToDetailPage.bind(this, collection.name)}
            >
              <div
                className="card-header fs-3 bg-warning text-white d-flex justify-content-between flex-wrap align-items-center"
                css={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <p className="m-0" css={{ height: "fit-content" }}>
                  {collection.name}
                </p>
                <div className="m-0">
                  <p
                    css={{
                      height: "fit-content",
                      display: "inline",
                      marginRight: "0.6rem",
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      editCollection(collection.name);
                    }}
                  >
                    <Icon
                      css={{
                        cursor: "pointer",
                        "&:hover": {
                          color: "#e5e5e5",
                        },
                      }}
                      size={1.2}
                      path={mdiPencil}
                    />
                  </p>
                  <p
                    className="m-0"
                    css={{ height: "fit-content", display: "inline" }}
                    onClick={(event) => {
                      event.stopPropagation();
                      removeCollection(collection.name);
                    }}
                  >
                    <Icon
                      css={{
                        cursor: "pointer",
                        "&:hover": {
                          color: "#e5e5e5",
                        },
                      }}
                      size={1.2}
                      path={mdiTrashCan}
                    />
                  </p>
                </div>
              </div>
              <div className="card-body p-0">
                <div
                  id={`animeCarousels${snakeCase(collection.name)}`}
                  className="carousel slide"
                  data-bs-ride="false"
                >
                  <div className="carousel-indicators">
                    {collection.ids.map((id, idx) => (
                      <button
                        key={idx}
                        type="button"
                        data-bs-target={`#animeCarousels${snakeCase(
                          collection.name
                        )}`}
                        data-bs-slide-to={`${idx}`}
                        className={idx === 0 ? "active" : ""}
                      ></button>
                    ))}
                  </div>
                  <div className="carousel-inner">
                    {!!collection.ids.length ? (
                      collection.ids.map((id, idx) => {
                        const anime = animes.find((a) => a.id === id)!;
                        return (
                          <div
                            key={anime.id}
                            data-bs-interval="4000"
                            className={`carousel-item ${
                              idx === 0 ? "active" : ""
                            }`}
                            css={{
                              height: "300px",
                              "@media screen and (max-width: 424px)": {
                                height: "100px",
                              },
                              "@media screen and (min-width: 425px) and (max-width: 767px)":
                                {
                                  height: "200px",
                                },
                            }}
                          >
                            <img
                              src={anime.bannerImage || "..."}
                              className="d-block w-100"
                              alt={
                                anime.title?.english ||
                                anime.title?.romaji ||
                                "cover image"
                              }
                              css={{
                                objectFit: "cover",
                                height: "100%",
                              }}
                            />
                            <div className="carousel-caption d-none d-md-block">
                              <h2 className="mb-2">
                                {anime.title?.english || anime.title?.native}
                              </h2>
                              <p>
                                {!anime.title?.english
                                  ? anime.title?.romaji
                                  : anime.title.native}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div
                        className="carousel-item active"
                        css={{
                          height: "300px",
                          "@media screen and (max-width: 424px)": {
                            height: "100px",
                          },
                          "@media screen and (min-width: 425px) and (max-width: 767px)":
                            {
                              height: "200px",
                            },
                        }}
                      >
                        <div
                          css={{
                            backgroundColor: "grey",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <h1
                            css={{
                              color: "#a5a5a5",
                            }}
                          >
                            No Added Anime
                          </h1>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    className="carousel-control-prev"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    type="button"
                    data-bs-target={`#animeCarousels${snakeCase(
                      collection.name
                    )}`}
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    type="button"
                    data-bs-target={`#animeCarousels${snakeCase(
                      collection.name
                    )}`}
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default withApollo(Collections, { getDataFromTree });
