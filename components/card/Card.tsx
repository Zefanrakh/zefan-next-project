/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Anime } from "anime";
import { ReactElement } from "react";
import ReactHtmlParser from "react-html-parser";
import CardActions, { Actions } from "../card_actions/CardActions";
import CardCheck from "../card_actions/CardCheck";

const MovieAnimeTitle = styled("div")<{}>({
  fontSize: "1.6em",
  fontWeight: "300",
  marginBottom: "20px",
  "& a": {
    color: "#84878d",
    WebkitTransition: ".3s ease",
    transition: ".3s ease",
  },
});

const AnimeCard = styled("div")<{}>({
  position: "relative",
  width: "25%",
  padding: "0 15px",
  marginBottom: "30px",
  cursor: "pointer",
  "&:hover": {
    img: {
      WebkitTransform: "scale(1.2)",
      MsTransform: "scale(1.2)",
      transform: "scale(1.2)",
    },
    a: {
      color: "#ffaa3c",
    },
  },
  "@media screen and (max-width: 480px)": {
    width: "100%",
  },
  "@media screen and (max-width: 990px) and (min-width: 481px)": {
    width: "50%",
  },
});
const AnimePoster = styled("figure")<{}>({
  borderRadius: "5px",
  overflow: "hidden",
  marginBottom: "20px",
  border: "1px solid transparent",
  "& img": {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    height: "auto",
    WebkitTransition: ".3s ease",
    transition: ".3s ease",
  },
});
const AnimeDescription = styled("div")<{}>({
  WebkitLineClamp: "3",
  WebkitBoxOrient: "vertical",
  display: "-webkit-box",
  overflow: "hidden",
});

type propsType = {
  id?: any;
  anime: Anime;
  isChecked?: boolean;
  onCheck?: Function;
  onClick: Function;
  actions?: Actions[];
};

const Card = (props: propsType): ReactElement => {
  const { id, anime, isChecked, onCheck, onClick, actions } = props;

  return (
    <>
      <AnimeCard
        onClick={() => {
          props.onClick(anime.id);
        }}
        key={anime.id}
      >
        {!!onCheck && <CardCheck isChecked={!!isChecked} onCheck={onCheck} />}
        {!!actions && <CardActions id={id} actions={actions} />}
        <AnimePoster>
          <img
            src={anime.coverImage?.large || ""}
            alt={anime.title?.english || "cover image"}
          />
        </AnimePoster>

        <MovieAnimeTitle>
          <a>{anime.title?.english}</a>
        </MovieAnimeTitle>
        <AnimeDescription>
          <p>{ReactHtmlParser(anime.description || "")}</p>
        </AnimeDescription>
      </AnimeCard>
    </>
  );
};

export default Card;
