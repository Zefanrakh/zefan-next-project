/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { mdiArrowRightThin } from "@mdi/js";
import Icon from "@mdi/react";
import { capitalize } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const IS_PARAM_PART_REGEX = RegExp("(^\\[).*(]$)");

const BreadCrumbs = styled("div")<{}>({
  paddingBottom: "20px",
  marginBottom: "30px",
  borderBottom: "1px solid #ebebeb",
  "& a": {
    fontWeight: "400",
    color: "#9ea1a6",
    "&:hover": {
      color: "#ffaa3c",
    },
  },
  "& span": {
    color: "#84878d",
  },
});

const BreadCrumbsComponent = (): ReactElement => {
  const router = useRouter();

  const { pathname } = router;

  let pathnameSplitted = pathname.split("/");
  if (pathnameSplitted[pathnameSplitted.length - 1] === "")
    pathnameSplitted.pop();

  return (
    <BreadCrumbs>
      {pathnameSplitted.map((part, idx) => {
        let aliases = part;
        if (IS_PARAM_PART_REGEX.test(part)) aliases = "detail";
        if (!part) aliases = "animes";
        let capitalizePart = capitalize(aliases);
        if (idx === pathnameSplitted.length - 1) {
          return <span key={part}>{capitalizePart}</span>;
        }
        return (
          <span key={part}>
            <Link href={`/${part}`}>
              <a>{capitalizePart}</a>
            </Link>
            <Icon
              css={{
                marginLeft: "2px",
                marginRight: "2px",
              }}
              path={mdiArrowRightThin}
              size={0.8}
            />
          </span>
        );
      })}
    </BreadCrumbs>
  );
};

export default BreadCrumbsComponent;
