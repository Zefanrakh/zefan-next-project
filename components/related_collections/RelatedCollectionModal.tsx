/** @jsxImportSource @emotion/react */
import Link from "next/link";
import { ReactElement } from "react";
import { Modal } from "react-bootstrap";

type propsType = {
  show: boolean;
  handleClose: any;
  collections: string[];
};

const RelatedCollectionModal = (props: propsType): ReactElement => {
  const { show, handleClose, collections } = props;
  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Collections Containing This Anime</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {collections.length ? (
          <ul
            css={{
              listStyle: "none",
            }}
          >
            {collections.map((name) => (
              <li>
                <Link href={`/collections/${name}`}>
                  <a css={{ textDecoration: "none", fontSize: "1.2rem" }}>
                    {name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div></div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className=" btn btn-secondary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default RelatedCollectionModal;
