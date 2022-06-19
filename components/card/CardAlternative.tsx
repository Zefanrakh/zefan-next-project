/** @jsxImportSource @emotion/react */
import { Anime } from "anime";
import { ReactElement } from "react";
import ReactHtmlParser from "react-html-parser";
import CardActions from "../card_actions/CardActions";
import CardCheck from "../card_actions/CardCheck";

type propsType = {
  anime: Anime;
  isChecked: boolean;
  onCheck: Function;
  onClick: Function;
};

const Card = (props: propsType): ReactElement => {
  const { anime, isChecked, onCheck, onClick } = props;
  return (
    <div
      onClick={() => {
        props.onClick(anime.id);
      }}
      className="card h-100 position-relative"
    >
      <CardCheck isChecked={isChecked} onCheck={onCheck} />
      <img
        src={anime.coverImage?.large || ""}
        className="card-img-top"
        alt={anime.title?.english || "cover image"}
      />
      <div className="card-body">
        <h5 className="card-title">{anime.title?.english}</h5>
        <div
          css={{
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
            overflow: "hidden",
          }}
        >
          <p className="card-text">
            {ReactHtmlParser(anime.description || "")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
